const Product = require('../../model/product.model')
const productHelper = require("../../helper/products")


//[GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })
    .sort({position: "desc"})

    const newProducts = productHelper.priceNewProducts(products)

    res.render("client/pages/products/index",{
        pageTitle: "Trang sản phẩm",
        products: newProducts
    })
}

//[GET] /products/:slug
module.exports.detail = async (req, res) => {
   
    try { // try catch de khi ng dung go sai id thi ko bi sap server
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }

        const product = await Product.findOne(find)
    
        res.render("client/pages/products/detail",{
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        req.flash("error", "Không tồn tại sản phẩm ")
        res.redirect("back")
    }
    
}
