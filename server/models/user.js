
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    googleID: {
      type: DataTypes.STRING,
      unique: true
    },
    facebookID: {
      type: DataTypes.STRING,
      unique: true
    },
    twitterID: {
      type: DataTypes.STRING,
      unique: true
    },
    totalScore: {
      type: DataTypes.INTEGER,
      field: 'total_score'
    }
  },
  {
    tableName: 'user',
    timestamps: false,
    underscored: true
  });
  User.associate = (models) => {
    User.hasMany(models.quizAttempt, {
      foreignKey: {
        field: 'user_id',
        name: 'userId'
      }
    });
    User.hasMany(models.comment, {
      foreignKey: {
        field: 'user_id',
        name: 'userId'
      }
    });
    User.hasMany(models.userAnswer, {
      foreignKey: {
        field: 'user_id',
        name: 'userId'
      }
    });
  };

  return User;
};
