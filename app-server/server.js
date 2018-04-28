const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const PORT = process.env.PORT || 3001;
// const app = express();
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')))


// Controllers
const userCtrl = require('./controllers/userCtrl');

// Routes
app.post('/sign-up', userCtrl.postSignUp);
app.post('/login', userCtrl.postLogin);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Socket.io
io.on('connection', function(socket){
  const roomId = socket.handshake.query.roomId;
  socket.join(roomId);
  console.log(`${socket.id} joined room ${roomId}`);

  socket.on('chat message', function(chatLine){
    io.to(roomId).emit('chat', chatLine);
  });

  socket.on('youtube_onPlay', function(time){
    socket.to(roomId).emit('youtube_playVideo', time);
  });

  socket.on('youtube_onPause', function(time){
    socket.to(roomId).emit('youtube_pauseVideo', time)
  });

  socket.on('youtube_currentVideo', function(videoId){
    socket.to(roomId).emit('current_video', videoId)
  });

  socket.on('disconnect', function(){
    socket.leave(roomId);
  });
});

// when someone pauses. it must pause everyone's videos at the same time

// Server
http.listen(PORT, () => {
  console.log(`App is up on port ${PORT}`);
});
