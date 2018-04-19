const sequelize = require('../Sequelize');
const DataTypes = require('sequelize/lib/data-types');
const User = require('../models/User')(sequelize, DataTypes);

exports.postSignUp = (req, res) => {
  console.log(req.body);
  User
  .findOrCreate({ where: { email: req.body.email }, defaults: {
    password: req.body.password,
    username: req.body.username
  }})
  .spread((user, created) => {
    console.log(user);
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


// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     email: DataTypes.STRING,
//     username: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });
//   return User;
// };
