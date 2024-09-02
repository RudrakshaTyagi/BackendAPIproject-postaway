import multer from "multer";
// file upload middleware using multer

const storage = multer.diskStorage({ // configure it to store files in uploads folder
      destination:(req, file, cb)=> {
      cb(null, './uploads');
},
      filename:(req, file, cb)=> { // name of the file
            cb(null, Date.now() + "_" + file.originalname);
      }
      
});

export const upload = multer({ storage: storage }); // export it to use as a middleware

