module.exports = (sequelize, DataTypes) => {
  const QuizAttempt = sequelize.define('quizAttempt', {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'quiz_attempt',
    timestamps: true,
    underscored: true
  });
  QuizAttempt.associate = (models) => {
    QuizAttempt.hasMany(models.userAnswer, {
      foreignKey: {
        field: 'quizAttempt_id',
        name: 'quizAttemptId'
      }
    });
    QuizAttempt.belongsTo(models.lesson, {
      foreignKey: {
        field: 'lesson_id',
        name: 'lessonId'
      }
    });
    QuizAttempt.belongsTo(models.user, {
      foreignKey: {
        field: 'user_id',
        name: 'userId'
      }
    });
  };

  return QuizAttempt;
};
