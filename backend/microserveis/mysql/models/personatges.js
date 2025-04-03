import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Personatge', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    força: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    moveSpeed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    enemic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    coinMultiplier: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    preu : {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  }, {
    tableName: 'personatges',
    timestamps: false,
  });
};
