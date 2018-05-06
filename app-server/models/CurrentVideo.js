module.exports = (sequelize, DataTypes) => {
  var currentVideo = sequelize.define('currentVideo', {
    videoId: DataTypes.STRING,
    roomId: DataTypes.STRING,
    channelId: DataTypes.STRING,
    channelTitle: DataTypes.STRING,
    description: DataTypes.STRING,
    liveBroadcastContent: DataTypes.STRING,
    title: DataTypes.STRING,
    mediumThumbnail: DataTypes.STRING
  }, {});
  currentVideo.associate = function(models) {
    // associations can be defined here
  };
  return currentVideo;
};
