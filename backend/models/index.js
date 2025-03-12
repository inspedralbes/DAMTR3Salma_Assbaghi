// models/index.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Creem la instància de Sequelize
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST || 'mysql',
    dialect: 'mysql',
    logging: false,
  }
);

// Importem les definicions dels models (exportades com a funcions)
import defineJugador from './partida.js';
import definePartida from './jugador.js';
import definePersonatge from './personatges.js';
// Inicialitzem els models passant la instància de Sequelize
const Jugador = defineJugador(sequelize);
const Partida = definePartida(sequelize);
const Personatge = definePersonatge(sequelize);
// Definim les associacions
// Una Jugador pot tenir moltes Motocicletes (1-N)
Jugador.hasMany(Partida, { foreignKey: 'jugadorId', onDelete: 'CASCADE' });
Partida.belongsTo(Jugador, { foreignKey: 'jugadorId' });
Jugador.hasMany(Personatge, { foreignKey: 'id_personatge', onDelete: 'CASCADE' });
Personatge.belongsTo(Jugador, { foreignKey: 'id_personatge' });


// Exportem la instància de Sequelize i els models
export { sequelize, Jugador, Partida, Personatge };
export default sequelize;
