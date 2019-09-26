if (process.env.NODE_ENV === 'development') require('dotenv').config();
const database_name = process.env.DATABASE_NAME;
const database_username = process.env.DATABASE_USERNAME;
const database_password = process.env.DATABASE_PASSWORD;
const database_dialect = process.env.DATABASE_DIALECT;
const database_host = process.env.DATABASE_HOST;

import Sequelize from 'sequelize';
const sequelize = new Sequelize(database_name, database_username, database_password, {
	host: database_host,
	dialect: database_dialect
});
export default sequelize;
