const mongoose = require("mongoose")
const slug = require("mongoose-slug-updater") 
mongoose.plugin(slug)

const productCategorySchema = new mongoose.Schema(
    {
        title: String,
        parent_id:{
            type: String,
            default: ""
        },
        description: String,
        thumbnail: String,
        status: String,
        position: Number, 
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        deleted: { // truyen dang lua chon bang object
            type: Boolean, 
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true // them 2 thuoc tinh thoi gian tao va sua 
    }
)

const ProductCategorgy = mongoose.model('ProductCategort',productCategorySchema,'products-category')

module.exports= ProductCategorgy 