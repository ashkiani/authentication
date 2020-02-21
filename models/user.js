module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    });
    return User;
  };