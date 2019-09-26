import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function (req, file, cb) {
		const fileName = `${new Date().getTime()}-${file.originalname}`;
		cb(null, fileName);
	}
});

const limits = { fileSize: 10485760 };

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	}
	else cb(null, false);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
