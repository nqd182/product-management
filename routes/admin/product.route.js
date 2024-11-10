const express = require('express')
const router = express.Router()
const multer = require('multer') // thu vien de upload file
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
//const storageMulter = require("../../helper/storageMulter") // import ham dinh nghia cach file duoc luu
//const upload = multer({ dest: './public/uploads/' }) // dest: đường dẫn lưu ảnh, dest sẽ đứng từ thư mục gốc


const upload = multer() //{storage: storageMulter()}tùy chọn storage để tùy chỉnh cách multer lưu trữ tệp như đổi tên file và nơi lưu
// Cloudinary
cloudinary.config({ 
    cloud_name: 'dlfj1mhdc', 
    api_key: '178377237317347', 
    api_secret: '741-vPnJS4Ij4e7v4aC7Briyl90' // Click 'View API Keys' above to copy your API secret
});
//End cloudinary

const controller = require("../../controller/admin/product.controller")
const validate = require("../../validates/admin/product.validate")

 router.get('/', controller.index)
 router.patch('/change-status/:status/:id', controller.changeStatus) // :router dong
 router.patch('/change-multi', controller.changeMulti) // :router dong
 router.delete('/delete/:id', controller.deleteItem)
 router.get('/create', controller.create) // lay trang them san pham
 router.post(
    '/create',
    upload.single('thumbnail'),
    function (req, res, next) { // hàm để up load ảnh lên database
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
                req.body[req.file.fieldname] = result.secure_url //secure_url là link ảnh online, 
                //req.file.fieldname là tên của input người dùng đã upload .
                next()
            }
        upload(req);

        }else next()
    },
    validate.createPost, 
    controller.createPost
    ) // route trung nhau dc nhung pth phai khac

router.get('/edit/:id', controller.edit)

router.patch(
    '/edit/:id',
    upload.single('thumbnail'), // upload 1 anh truong thumbnail trong database
    validate.createPost, 
    controller.editPatch
    ) // route trung nhau dc nhung pth phai khac

router.get('/detail/:id', controller.detail)

module.exports = router