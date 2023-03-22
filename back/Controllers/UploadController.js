import multer from 'multer';

const imgStorage = multer.diskStorage({
  destination: (_, __, cb) => {
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
