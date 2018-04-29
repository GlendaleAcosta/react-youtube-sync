const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const Room = require('../models/Room')(sequelize, DataTypes);
const shortid = require('shortid');

exports.postRoom = (req, res) => {
  const id = shortid.generate();
  Room
    .upsert({id})
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
};
