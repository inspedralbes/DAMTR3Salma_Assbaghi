import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define("Partida", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    temps: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  
    puntuacio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'partides',
    timestamps: true,
  });
};
