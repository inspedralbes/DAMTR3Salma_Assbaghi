import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Usuari', {
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
    },
    admin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    timeStamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

  }, {
    tableName: 'usuaris',
    timestamps: false,
  });
};
