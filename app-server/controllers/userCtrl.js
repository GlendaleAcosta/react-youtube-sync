const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const User = require('../models/User')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');

exports.postSignUp = (req, res) => {
  User
  .findOrCreate({ where: { email: req.body.email }, defaults: {
    password: req.body.password,
    username: req.body.username
  }})
  .spread((user, created) => {
    const modifiedUser = user.dataValues;
    delete modifiedUser.password;
    if (created) {
      jwt.sign({ user: modifiedUser}, 'token_secret', function(err, token) {
        return res.json({
          user: modifiedUser,
          token
        });
      });
    } else {
      return res.status(401).json({
        error: 'failed'
      });
    }
  });
};

exports.postLogin = (req, res) => {
  console.log(req.body);
  const { token } = req.body;
  if (token) {
    jwt.verify(token, 'token_secret', (err, decoded) => {
      return res.json({
        user: decoded.user
      });
    });
  } else if (req.body.user) {
    User
    .findOne({ where: { email: req.body.user.email }})
    .then(user => {
      if (!user)
        return res.status(401).json({error: 'failed'});

      const modifiedUser = user.dataValues;
      delete modifiedUser.password;
      jwt.sign({ user: modifiedUser}, 'token_secret', function(err, token) {
        return res.json({
          user: modifiedUser,
          token
        });
      });
    });
  }
};
