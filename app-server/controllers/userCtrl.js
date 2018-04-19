const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const User = require('../models/User')(sequelize, DataTypes);

exports.postSignUp = (req, res) => {
  User
  .findOrCreate({ where: { email: req.body.email }, defaults: {
    password: req.body.password,
    username: req.body.username
  }})
  .spread((user, created) => {
    if (created) {
      return res.json({
        user,
        // token
      });
    }
    return res.json({
      user
    });
  });
};
