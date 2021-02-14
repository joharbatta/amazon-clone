import express from 'express';
import multer from 'multer';
import { isAuth, isAdmin } from '../utils';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null,'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFileFilter });
const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
  res.status(201).send({ image: `/${req.file.path}` });
});
export default uploadRouter;