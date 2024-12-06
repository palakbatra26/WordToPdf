const express = require('express');
const dotenv=require('dotenv')
const multer  = require('multer');
const cors=require('cors');
const docxConverter = require('docx-pdf');
// const fs = require('fs');
const  path=require('path');

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3000;

const uploadDir = path.join(__dirname, 'uploads');
const filesDir = path.join(__dirname, 'files');

// Create 'uploads' directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }
// // Create 'files' directory if it doesn't exist
// if (!fs.existsSync(filesDir)) {
//     fs.mkdirSync(filesDir);
// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
app.post('/convertor', upload.single('file'), function (req, res, next) {
    try {
         if(!req.file)
            return res.status(400).json({ message: 'No file uploaded' });
        const outputPath = path.join(__dirname, 'upload', `${req.file.originalname}.pdf`);
        docxConverter(req.file.path,outputPath,function(err,result){
            if(err){
              console.log(err);
              res.status(500).json({ message: 'Error converting document' });
            }
            res.download(outputPath,()=>{
                 console.log("file downloaded");
            })
            console.log('result'+result);
          });
    } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Internal Server Error' });
   
    }

  })
  

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
