const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
require('dotenv').config()

// Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET
});
//End cloudinary

module.exports.upload = (req, res, next) => { // hàm để up load ảnh lên database cop từ docs
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.secure_url //secure_url là link ảnh online được tự tạo ra, 
            //req.file.fieldname trả về tên của input. ví dụ req.file.thumbnail do [req.file.fieldname] = 'thumbnail'
            next()
        }
    upload(req);

    }else{ 
        next()}
}