const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const CurrentVideo = require('../models/CurrentVideo')(sequelize, DataTypes);

exports.postCurrentVideo = (req, res) => {
  CurrentVideo.findOne({where: {roomId: req.body.roomId}})
    .then((videoRecord) => {
      if (videoRecord) {
        const video = videoRecord.toJSON();
        const youtubeStyleVideo = {
          id: video.videoId,
          snippet: {
            description: video.description,
            title: video.title,
            channelTitle: video.channelTitle,
          }
        }
        return res.json(youtubeStyleVideo);
      }
    });
}

exports.putCurrentVideo = (req, res) => {
  const video = req.body.video;
  CurrentVideo.update({
    videoId: video.id,
    channelId: video.snippet.channelId,
    channelTitle: video.snippet.channelTitle,
    description: video.snippet.description,
    liveBroadcastContent: video.snippet.liveBroadcastContent,
    title: video.snippet.title,
    mediumThumbnail: video.snippet.thumbnails.medium.url
  },
  {where: {roomId: req.body.roomId}}
)
  .then((updated) => {
    if (updated)
      return res.json({ success: true});
  })
}
