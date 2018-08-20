module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: 'question',
    timestamps: false,
    underscored: true
  });
  Question.associate = (models) => {
    Question.hasMany(models.answer, {
      foreignKey: {
        field: 'question_id',
        name: 'questionId'
      }
    });
    Question.hasMany(models.userAnswer, {
      foreignKey: {
        field: 'question_id',
        name: 'questionId'
      }
    });
    Question.belongsTo(models.lesson, {
      foreignKey: {
        field: 'lesson_id',
        name: 'lessonId'
      }
    });
  };

  return Question;
};
