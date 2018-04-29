'use strict';
module.exports = (sequelize, DataTypes) => {
  var Room = sequelize.define('Room', {
    id: {type: DataTypes.STRING, primaryKey: true }
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};
