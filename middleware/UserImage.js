// // import multer from 'multer';
// // import path from 'path';

// // // Set storage
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads/profileImages'); // Folder path
// //   },
// //   filename: function (req, file, cb) {
// //     cb(
// //       null,
// //       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
// //     );
// //   }
// // });

// // // File type validation
// // function checkFileType(file, cb) {
// //   const filetypes = /jpeg|jpg|png|webp/;
// //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// //   const mimetype = filetypes.test(file.mimetype);
// //   if (extname && mimetype) {
// //     return cb(null, true);
// //   } else {
// //     cb('Images only!');
// //   }
// // }

// // const user = multer({
// //   storage,
// //   fileFilter: function (req, file, cb) {
// //     checkFileType(file, cb);
// //   }
// // });

// // export default user;
// import multer from 'multer';
// import path from 'path';

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: './uploads/profileImages',
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   }
// });

// // Check file type
// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images only!');
//   }
// }

// // Initialize upload
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }, // 1MB limit
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   }
// });

// export default upload;
import multer from "multer"
import path from "path"
import fs from "fs"

// Ensure upload directory exists
const uploadDir = "./uploads/profileImages"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
  },
})

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error("Error: Images only! (jpeg, jpg, png, gif, webp)"))
  }
}

// Initialize upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

export default upload
