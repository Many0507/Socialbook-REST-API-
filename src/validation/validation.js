import Joi from '@hapi/joi';

export const registerValidation = data => {
	const schema = {
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().max(30).email().required(),
		password: Joi.string().min(6).required()
	};
	return Joi.validate(data, schema);
};

export const loginValidation = data => {
	const schema = {
		email: Joi.string().max(30).email().required(),
		password: Joi.string().min(6).required()
	};
	return Joi.validate(data, schema);
};

export const photosValidation = data => {
	const schema = {
		title: Joi.string().alphanum().min(2).max(100).required()
	};
	return Joi.validate(data, schema);
};
