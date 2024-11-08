const { DataSource } = require('typeorm');

module.exports = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/src/db/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migration/*.js'],
  synchronize: false,
  logging: true,
});
