
const express = require('express')
const router = express.Router()
const multer = require('multer') // thu vien de upload file
const storageMulter = require("../../helper/storageMulter") // import ham dinh nghia cach file 
const upload = multer({storage: storageMulter() })
//const upload = multer({ dest: './public/uploads/' }) // dest: đường dẫn lưu ảnh, dest sẽ đứng từ thư mục gốc

const controller = require("../../controller/admin/product.controller")

 router.get('/', controller.index)
 router.patch('/change-status/:status/:id', controller.changeStatus) // :router dong
 router.patch('/change-multi', controller.changeMulti) // :router dong
 router.delete('/delete/:id', controller.deleteItem)
 router.get('/create', controller.create) // lay trang them san pham
 router.post(
    '/create',
    upload.single('thumbnail'), // truong thumbnail trong database
    controller.createPost
    ) // route trung nhau dc nhung pth phai khac

module.exports = router