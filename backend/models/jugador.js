import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Jugador', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuari: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    puntuacio: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    contrassenya: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    }

  }, {
    tableName: 'jugadors',
    timestamps: false,
  });
};
