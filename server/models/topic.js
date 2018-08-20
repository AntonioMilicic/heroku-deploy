module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('topic', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'topic',
    timestamps: false,
    underscored: true
  });
  Topic.associate = (models) => {
    Topic.hasMany(models.course, {
      foreignKey: {
        field: 'topic_id',
        name: 'topicId'
      }
    });
  };

  return Topic;
};
