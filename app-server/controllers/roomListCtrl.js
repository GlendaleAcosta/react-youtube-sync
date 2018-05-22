const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const Room = require('../models/Room')(sequelize, DataTypes);

exports.postRoomList = (req, res) => {
  Room
    .findAll({ limit: 10 })
    .then((rooms) => {
      if (rooms) {
        return res.json({
          rooms
        });
      }
      else {
        return res.json({
          rooms: []
        })
      }
    });
};
