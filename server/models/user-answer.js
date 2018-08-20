module.exports = (sequelize, DataTypes) => {
  const UserAnswer = sequelize.define('userAnswer', {
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'user_answer',
    timestamps: false,
    underscored: true
  });
  UserAnswer.associate = (models) => {
    UserAnswer.belongsTo(models.user, {
      foreignKey: {
        field: 'user_id',
        name: 'userId'
      }
    });
    UserAnswer.belongsTo(models.quizAttempt, {
      foreignKey: {
        field: 'quizAttempt_id',
        name: 'quizAttemptId'
      }
    });
    UserAnswer.belongsTo(models.question, {
      foreignKey: {
        field: 'question_id',
        name: 'questionId'
      }
    });
    UserAnswer.belongsTo(models.answer, {
      foreignKey: {
        field: 'answer_id',
        name: 'answerId'
      }
    });
  };

  return UserAnswer;
};
