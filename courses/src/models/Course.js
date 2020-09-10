const { Model, DataTypes } = require('sequelize');

class Course extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.FLOAT,
        is_active: DataTypes.BOOLEAN,
      },
      {
        sequelize: connection,
        tableName: 'courses',
      }
    );
  }
}

module.exports = Course;
