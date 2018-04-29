'use strict';
module.exports = (sequelize, DataTypes) => {
  var Room = sequelize.define('Room', {
    id: {type: DataTypes.STRING, primaryKey: true },
    title: DataTypes.STRING,
    host: DataTypes.STRING,
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};
