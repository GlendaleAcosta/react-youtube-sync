module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('currentVideos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomId: {
        type: Sequelize.STRING        
      },
      videoId: {
        type: Sequelize.STRING
      },
      channelId: {
        type: Sequelize.STRING
      },
      channelTitle: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      liveBroadcastContent: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      // publishedAt: {
      //   type: Sequelize.DATETIME
      // },
      mediumThumbnail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('currentVideos');
  }
};
