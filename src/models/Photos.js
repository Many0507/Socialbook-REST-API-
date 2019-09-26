import Sequelize from 'sequelize';
import sequelize from '../database/connection';

const Photo = sequelize.define('photos', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	imageurl: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	title: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});
export default Photo;
