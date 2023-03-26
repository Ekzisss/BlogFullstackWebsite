import multer from 'multer';
import fs from 'fs';

const imgStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: imgStorage });

const uploadUrl = (req, res) => {
  res.json({
    url: '/uploads/' + req.file.originalname,
  });
};

export { upload, uploadUrl };
