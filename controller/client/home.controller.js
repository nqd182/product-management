const Product = require("../../model/product.model")
const productHelper = require("../../helper/products")

//[GET] /
module.exports.index= async (req, res) => { // index la ten ham 
    const products = await Product.find({
        deleted: false,
        status: "active"
    })

    const newProducts = productHelper.priceNewProducts(products)

    res.render("client/pages/home/index",{ 
        pageTitle: "Trang chủ",
        products: newProducts
    })
}