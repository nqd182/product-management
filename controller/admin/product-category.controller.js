const ProductCategory = require('../../model/product-category.model')
const systemConfig = require("../../config/system")
const createTreeHelper = require("../../helper/createTree") // ham de quy danh muc con 

// [GET] /admin/products-category
module.exports.index= async (req, res) => {
    let find={
        deleted: false
    }
    

    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.tree(records)

    res.render("admin/pages/products-category/index",{
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
        
    })
}  
// [GET] /admin/products-category/create
module.exports.create= async (req, res) => {
   let find = {
    deleted: false 
   }

   const records = await ProductCategory.find(find)
   
   const newRecords = createTreeHelper.tree(records)
   
    res.render("admin/pages/products-category/create",{
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    })
}  

// [POST] /admin/products-category/create
module.exports.createPost= async (req, res) => { 

    if(req.body.position == ""){
        const countProducts = await ProductCategory.countDocuments();
        req.body.position = countProducts + 1

    }else {
        req.body.position = parseInt(req.body.position)
    }
   
    const productCategory = new ProductCategory(req.body)
    await productCategory.save() 

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}  