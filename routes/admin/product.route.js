
const express = require('express')
const router = express.Router()
const controller = require("../../controller/admin/product.controller")

 router.get('/', controller.index)
 router.patch('/change-status/:status/:id', controller.changeStatus) // :router dong
 router.patch('/change-multi', controller.changeMulti) // :router dong
 router.delete('/delete/:id', controller.deleteItem)
 router.get('/create', controller.create) // lay trang them san pham
 router.post('/create', controller.createPost) // route trung nhau dc nhung pth phai khac

module.exports = router