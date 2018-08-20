module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('lesson', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'lesson',
    timestamps: false,
    underscored: true
  });
  Lesson.associate = (models) => {
    Lesson.hasMany(models.question, {
      foreignKey: {
        field: 'lesson_id',
        name: 'lessonId'
      }
    });
    Lesson.hasMany(models.quizAttempt, {
      foreignKey: {
        field: 'lesson_id',
        name: 'lessonId'
      }
    });
    Lesson.belongsTo(models.course, {
      foreignKey: {
        field: 'course_id',
        name: 'courseId'
      }
    });
  };

  return Lesson;
};
