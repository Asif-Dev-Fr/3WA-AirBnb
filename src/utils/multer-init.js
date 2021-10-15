const multer  = require("multer");

const storage = multer.diskStorage({


  destination: (req, file, cb) => {
    console.log('MULTER----------------------',req);

    if(file.fieldname === 'avatar') {
      cb(null, 'public/upload/avatar')
    } else if(file.fieldname === 'photos') {
      cb(null, 'public/upload/estate-photos')
    } else {
      cb(null, 'public/upload/others')
    }
  },
  // filename: (req, file, cb) => {
  //   cb(null, new Date().toISOString() + "-" + file.originalname)
  // }


  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;




// const multer  = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log('---------------------MULTER-----------------');
//     cb(null, 'public/upload')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

// module.exports = upload;
