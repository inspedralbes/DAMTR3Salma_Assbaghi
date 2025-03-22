import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import defineJugador from './models/jugador.js';
import definePartida from './models/partida.js';
import definePersonatge from './models/personatges.js';
import defineNivell from './models/nivell.js';

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

const Jugador = defineJugador(sequelize);
const Partida = definePartida(sequelize);
const Personatge = definePersonatge(sequelize);
const Nivell = defineNivell(sequelize);
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
export { sequelize, Jugador, Partida, Personatge, Nivell };
export default sequelize;
