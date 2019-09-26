import { findAllPhotos, findOnePhoto, createPhoto, updatePhoto, deletePhoto } from '../controllers/photos.controller';
import { verifyToken } from '../middlewares/verifyToken';
import upload from '../config/multer';
import { Router } from 'express';
const router = Router();

router.get('/', verifyToken, findAllPhotos);
router.get('/:id', verifyToken, findOnePhoto);
router.post('/', verifyToken, upload.single('image'), createPhoto);
router.put('/:id', verifyToken, updatePhoto);
router.delete('/:id', verifyToken, deletePhoto);

export default router;
