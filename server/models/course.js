module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('course', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'course',
    timestamps: false,
    underscored: true
  });
  Course.associate = (models) => {
    Course.hasMany(models.lesson, {
      foreignKey: {
        field: 'course_id',
        name: 'courseId'
      }
    });
    Course.belongsTo(models.topic, {
      foreignKey: {
        field: 'topic_id',
        name: 'topicId'
      }
    });
  };

  return Course;
};
