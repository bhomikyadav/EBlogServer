const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
         cb(null,'uploads');
    },
    filename : (req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);


    }
})
const filefilter =(req,file,cb)=>{
    if (file.mimetype==='image/png'||file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg') {
        cb(null,true);
        
    }else{
        cb(null,false);
    }
}

module.exports= multer({storage:storage,fileFilter:filefilter});
 