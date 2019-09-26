import { registerValidation, loginValidation } from '../validation/validation';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/Users';
import Photos from '../models/Photos';

Users.hasMany(Photos, { as: 'Photos', foreignKey: 'userId' });

export const findAllUsers = async (req, res) => {
	try {
		const users = await Users.findAll({ attributes: [ 'id', 'name', 'email' ] });
		users.length > 0
			? res.status(200).json({ data: users })
			: res.status(204).json({ message: 'No se han encontrado usuarios' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error, error: 'Error en el servidor, intente mas tarde' });
	}
};

export const findOneUser = async (req, res) => {
	const { id } = req.params;
	try {
		const userPhotos = await Users.findOne({
			where: { id },
			attributes: [ 'id', 'name', 'email' ],
			include: [ { model: Photos, as: 'Photos' } ]
		});
		userPhotos ? res.status(200).json({ data: userPhotos }) : res.status(204).json({ message: 'no hay usuario' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error, error: 'Error en el servidor, intente mas tarde' });
	}
};

export const createUser = async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.send({ Error: error.details[0].message });

	try {
		const { name, email } = req.body;
		const emailExist = await Users.findOne({ where: { email }, attributes: [ 'email' ] });
		if (emailExist) return res.json({ Error: 'Email Exist' });

		let { password } = req.body;
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);

		const user = await Users.create(
			{ name, email, password },
			{
				fields: [ 'name', 'email', 'password' ]
			}
		);
		res.status(201).json({ data: user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error, error: 'Error en el servidor, intente mas tarde' });
	}
};

export const loginUser = async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.json({ Error: error.details[0].message });

	try {
		const { email, password } = req.body;
		const user = await Users.findOne({ where: { email } });
		if (!user) return res.json({ Error: 'email or password is wrong' });

		const validatePasword = await bcrypt.compare(password, user.password);
		if (!validatePasword) return res.json({ Error: 'email or password is wrong' });

		const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
		res.header('authToken', token).send(token);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error, error: 'Error en el servidor, intente mas tarde' });
	}
};

export const updateUser = async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.send(error.details[0].message);

	const { name, email } = req.body;
	const { id } = req.params;
	const emailExist = await Users.findOne({ where: { email }, attributes: [ 'email' ] });
	const userEmail = await Users.findOne({ where: { id }, attributes: [ 'email' ] });
	if (emailExist && emailExist.email != userEmail.email) return res.send('Email Exist');

	let { password } = req.body;
	const salt = await bcrypt.genSalt(10);
	password = await bcrypt.hash(password, salt);
	try {
		await Users.update(
			{
				name,
				email,
				password
			},
			{ where: { id } }
		);
		const user = await Users.findOne({ where: { id } });
		user ? res.status(200).json({ data: user }) : res.json({ message: 'no hay usuario' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error, error: 'Error en el servidor, intente mas tarde' });
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		await Users.destroy({ where: { id } });
		res.json({ message: 'user deleted' });
	} catch (error) {
		res.json({ message: 'usuario no encontrado' });
	}
};
