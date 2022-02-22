module.exports = (sequelize, DataTypes) => {
  const Diet = sequelize.define('Diet', {
    // 날짜, 섭취칼로리, 오늘체중 // id
    date : {
      type: DataTypes.STRING(10),
    },
    calorie : {
      type: DataTypes.FLOAT(5,2),
    },
    weight : {
      type: DataTypes.FLOAT(5,2),
    },
    // UserId :
  }, {
    charset:'utf8',
    collate:'utf8_general_ci'
  });
  Diet.associate = (db) => {
    db.Diet.belongsTo(db.User);
  };
  return Diet;
}
