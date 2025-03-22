import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Jugador', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
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
      defaultValue: '',
    },
    id_personatge: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }

  }, {
    tableName: 'jugadors',
    timestamps: false,
  });
};
