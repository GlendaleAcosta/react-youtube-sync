// const sequelize = require('../Sequelize');
// const DataTypes = require('sequelize/lib/data-types');
// const User = require('../models/User')(sequelize, DataTypes);

exports.postSignUp = (req, res) => {
  console.log('we are here');
  console.log(req.body);
  // User
  // .findOrCreate({ where: { email: req.body.email }, defaults: { password: req.body.password } })
  // .spread((user, created) => {
  //   if (created) {
  //     return res.json({
  //       user,
  //     });
  //   }
    return res.json({
      user: {
        id: 'ihgrQz99',
        email: 'gglendale17@gmail.com',
        username: 'JaxParrow'
      }
    });
  // });
};
