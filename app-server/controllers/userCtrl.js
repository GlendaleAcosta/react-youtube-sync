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
  .spread((userModel, created) => {
    if (created) {
      const user = userModel.toJSON();
      jwt.sign({ user: user}, 'token_secret', function(err, token) {
        return res.json({
          user,
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
  const { token } = req.body;
  console.log(req.body);
  if (token) {
    jwt.verify(token, 'token_secret', (err, decoded) => {
      return res.json({
        user: decoded.user
      });
    });
  } else if (req.body.user) {
    User
    .findOne({ where: { email: req.body.user.email }})
    .then(userModel => {
      if (!userModel)
        return res.status(401).json({error: 'failed'});
      const validPassword = userModel.verifyPassword(req.body.user.password);
      if (validPassword) {
        const user = userModel.toJSON();
        jwt.sign({ user: user}, 'token_secret', function(err, token) {
          return res.json({
            user: user,
            token
          });
        });
      }
    });
  }
};
