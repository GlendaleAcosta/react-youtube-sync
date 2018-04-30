const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const Room = require('../models/Room')(sequelize, DataTypes);
const shortid = require('shortid');

exports.postRoom = (req, res) => {
  console.log(req.body);
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
          return res.json({
            roomId: id,
          })
        } else {
          return res.json({
            error: 'shit'
          })
        }
      });
  } else if (req.body.roomId) {
    Room.findOne({where: {id: req.body.roomId}})
      .then((room, idk) => {
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
