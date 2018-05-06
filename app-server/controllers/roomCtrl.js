const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const Room = require('../models/Room')(sequelize, DataTypes);
const CurrentVideo = require('../models/CurrentVideo')(sequelize, DataTypes);

const shortid = require('shortid');

exports.postRoom = (req, res) => {
  if (!req.body.roomId) {
  const id = shortid.generate();
    Room
      .upsert({
        id,
        title: req.body.roomTitle,
        host: req.body.username
      })
      .then((created) => {
        if (created) {
          CurrentVideo
            .upsert({
              roomId: id,
              videoId: '6ZfuNTqbHE8',
              channelId: 'UCvC4D8onUfXzvjTOM-dBfEA',
              channelTitle: 'Marvel Entertainment',
              description: 'In theaters April 27. Get your tickets now: http://www.fandango.com/infinitywar Find out more on Marvel.com - http://bit.ly/2Iv6ouB Follow Marvel on Twitter: ...',
              liveBroadcastContent: 'none',
              mediumThumbnail: 'https://i.ytimg.com/vi/QwievZ1Tx-8/mqdefault.jpg',
              title: "Marvel Studios' Avengers: Infinity War - Official Trailer"
            })
            .then((created) => {
              return res.json({
                roomId: id,
              })
            });
        } else {
          return res.json({
            error: 'dang'
          });
        }
      });
  } else if (req.body.roomId) {
    Room.findOne({where: {id: req.body.roomId}})
      .then((room) => {
        if (room) {
          return res.json({ room });
        } else {
          return res.json({
            error: 'invalid url'
          })
        }

      })
    // Room.find({where: })
  }
};
