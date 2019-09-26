import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
	const token = req.header('authtoken');
	if (!token) return res.status(403).json({ private: 'Contenido privado' });

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (error) {
		res.status(403).json({ private: 'Contenido privado' });
	}
};
