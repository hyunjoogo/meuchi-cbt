module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // 이메일, 이름, 비밀번호 // id
    email : {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    name : {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    password : {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수
    },
  }, {
    charset:'utf8',
    collate:'utf8_general_ci'
  });
  User.associate = (db) => {
    db.User.hasMany(db.Diet);
  };
  return User;
}
