import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'video/mp4',
    'application/zip',
    'application/x-zip-compressed',
    'multipart/x-zip',
    'application/x-compressed',
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMiddleware = multer({ storage, fileFilter }).fields([
  { name: 'dpImg', maxCount: 1 },
  { name: 'dpFile', maxCount: 1 },
]);

export default uploadMiddleware;
