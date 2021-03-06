module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  });
};