import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import defineUsuari from './models/usuari.js';
import definePartida from './models/partida.js';
import definePersonatge from './models/personatges.js';

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

const Usuari = defineUsuari(sequelize);
const Partida = definePartida(sequelize);
const Personatge = definePersonatge(sequelize);
Usuari.hasMany(Partida, { foreignKey: 'JugadorId', onDelete: 'CASCADE' });
Partida.belongsTo(Usuari, { foreignKey: 'JugadorId' });
Usuari.belongsTo(Personatge, { foreignKey: 'id_personatge' });
Personatge.hasMany(Usuari, { foreignKey: 'id_personatge' });

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
export { sequelize, Usuari, Partida, Personatge };
export default sequelize;
