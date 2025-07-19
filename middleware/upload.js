import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads/images directory exists
const dir = 'uploads/images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `banner-${uniqueSuffix}${ext}`);
  }
});

// ✅ Allow all image types using mimetype pattern
const fileFilter = (req, file, cb) => {
  const mimetype = file.mimetype.toLowerCase();
  if (mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError(
        'LIMIT_UNEXPECTED_FILE',
        'Invalid file type. Only image files are allowed.'
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

export const uploadBannerImage = upload.single('image');
