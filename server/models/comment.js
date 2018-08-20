module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'comment',
    timestamps: true,
    underscored: true
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.user, {
      foreignKey: {
        field: 'user_id',
        name: 'userId'
      }
    });
  };

  return Comment;
};
