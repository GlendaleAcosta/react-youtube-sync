const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const User = require('../models/User')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.postSignUp = (req, res) => {
  User.findOrCreate({
    where: {
      [Op.or]: [{email: req.body.email}, {username: req.body.username}]
  }, defaults: {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  }})
  .spread((userModel, created) => {
    const user = userModel.toJSON();
    if (created) {
      jwt.sign({ user: user}, 'token_secret', function(err, token) {
        return res.json({
          user,
          token
        });
      });
    } else {
      const error = {};
      if (req.body.email === user.email)
        error.email = true;
      if (req.body.username === user.username)
        error.username = true;

      return res.json({error});
    }
  });
};

exports.postLogin = (req, res) => {
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
    .then(userModel => {
      if (!userModel)
        return res.json({ error: { message: 'Incorrect email or password' }});
      const validPassword = userModel.verifyPassword(req.body.user.password);
      if (validPassword) {
        const user = userModel.toJSON();
        jwt.sign({ user: user}, 'token_secret', function(err, token) {
          return res.json({
            user: user,
            token
          });
        });
      } else {
        return res.json({ error: { message: 'Incorrect email or password' }});
      }
    });
  }
};
