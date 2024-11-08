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