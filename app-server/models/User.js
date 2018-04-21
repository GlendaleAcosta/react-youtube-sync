const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (model) => {
        model.password = model.generateHash(model.password);
      },
    }
  });

  // Instance Methods
  User.prototype.generateHash = function generateHash(pw) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pw, salt);
    return hash;
  }

  User.prototype.verifyPassword = function verifyPassword(pw) {
    return bcrypt.compareSync(pw, this.password);
  };

  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

  return User;
};
