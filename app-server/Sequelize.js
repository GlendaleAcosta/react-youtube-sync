const Sequelize = require('sequelize');

// const sequelize = new Sequelize('youtube_sync_db', 'glendaleacosta', null, {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });
const sequelize = new Sequelize('23khdps6gdcrn host=ec2-50-19-224-165.compute-1.amazonaws.com', 'atugtkezijifrl', '02cbd4b91746016d3e2fe865abc8d2909f8def9df791a7463f182918ac60bd71', {
  host: 'ec2-50-19-224-165.compute-1.amazonaws.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
