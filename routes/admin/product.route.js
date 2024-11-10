const express = require('express')
const router = express.Router()
const multer = require('multer') // thu vien de upload file
const storageMulter = require("../../helper/storageMulter") // import ham dinh nghia cach file duoc luu
//const upload = multer({ dest: './public/uploads/' }) // dest: đường dẫn lưu ảnh, dest sẽ đứng từ thư mục gốc
const upload = multer({storage: storageMulter() }) //tùy chọn storage để tùy chỉnh cách multer lưu trữ tệp như đổi tên file và nơi lưu

const controller = require("../../controller/admin/product.controller")
const validate = require("../../validates/admin/product.validate")

 router.get('/', controller.index)
 router.patch('/change-status/:status/:id', controller.changeStatus) // :router dong
 router.patch('/change-multi', controller.changeMulti) // :router dong
 router.delete('/delete/:id', controller.deleteItem)
 router.get('/create', controller.create) // lay trang them san pham
 router.post(
    '/create',
    upload.single('thumbnail'), // upload 1 anh truong thumbnail trong database
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