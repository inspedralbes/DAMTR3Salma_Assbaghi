import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

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

import defineJugador from './jugador.js';
import definePartida from './partida.js';
import definePersonatge from './personatges.js';
const Jugador = defineJugador(sequelize);
const Partida = definePartida(sequelize);
const Personatge = definePersonatge(sequelize);
Jugador.hasMany(Partida, { foreignKey: 'jugadorId', onDelete: 'CASCADE' });
Partida.belongsTo(Jugador, { foreignKey: 'jugadorId' });
Jugador.belongsTo(Personatge, { foreignKey: 'id_personatge' });
Personatge.hasMany(Jugador, { foreignKey: 'id_personatge' });

sequelize.sync({ alter: true }).then(() => {
  console.log("BBDD sincronizada");
});
const connectWithRetry = async () => {
  let connected = false;
  while (!connected) {
    try {
      await sequelize.authenticate();
      connected = true;
    } catch (error) {
      console.error('Error connecting to the database: ', error);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

connectWithRetry();
export { sequelize, Jugador, Partida, Personatge };
export default sequelize;
