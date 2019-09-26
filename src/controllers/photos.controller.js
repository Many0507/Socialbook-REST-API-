import { photosValidation } from '../validation/validation';
import Photos from '../models/Photos';
import Users from '../models/Users';

Photos.belongsTo(Users, { as: 'User', foreignKey: 'userId' });

export const findAllPhotos = async (req, res) => {
	try {
		const photos = await Photos.findAll({ include: [ { model: Users, as: 'User' } ] });
		photos.length > 0 ? res.json({ data: photos }) : res.json({ message: 'No se han encontrado fotos' });
	} catch (error) {
		console.log(error);
		res.json({ message: error, data: {} });
	}
};

export const findOnePhoto = async (req, res) => {
	const { id } = req.params;
	try {
		const photo = await Photos.findOne({
			where: { id },
			include: [ { model: Users, as: 'User' } ]
		});
		photo ? res.json({ data: photo }) : res.json({ message: 'no hay foto' });
	} catch (error) {
		console.log(error);
		res.json({ message: error, data: {} });
	}
};

export const createPhoto = async (req, res) => {
	if (!req.file) return res.json({ message: 'imagen no valida' });

	const { error } = photosValidation(req.body);
	if (error) return res.send(error.details[0].message);

	const { title, userId } = req.body;
	const imageurl = req.file.path.replace(/\\/g, '/');
	try {
		const photo = await Photos.create(
			{ imageurl, title, userId },
			{
				fields: [ 'imageurl', 'title', 'userId' ]
			}
		);
		res.json({ data: photo });
	} catch (error) {
		console.log(error);
		res.json({ message: error, data: {} });
	}
};

export const updatePhoto = async (req, res) => {
	const { error } = photosValidation(req.body);
	if (error) return res.send(error.details[0].message);

	const { id } = req.params;
	const { title } = req.body;
	try {
		await Photos.update(
			{
				title
			},
			{ where: { id } }
		);
		const photo = await Photos.findOne({ where: { id } });
		photo ? res.json({ data: photo }) : res.json({ message: 'no hay photo' });
	} catch (error) {
		console.log(error);
		res.json({ message: error, data: {} });
	}
};

export const deletePhoto = async (req, res) => {
	const { id } = req.params;
	try {
		await Photos.destroy({ where: { id } });
		res.json({ message: 'Photo deleted' });
	} catch (error) {
		res.json({ message: 'Fotografia no encontrada' });
	}
};
