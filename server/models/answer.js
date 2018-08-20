module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('answer', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    correctIndex: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'correct_index'
    }
  },
  {
    tableName: 'answer',
    timestamps: false,
    underscored: true
  });
  Answer.associate = (models) => {
    Answer.hasMany(models.userAnswer, {
      foreignKey: {
        field: 'answer_id',
        name: 'answerId'
      }
    });
    Answer.belongsTo(models.question, {
      foreignKey: {
        field: 'question_id',
        name: 'questionId'
      }
    });
  };

  return Answer;
};
