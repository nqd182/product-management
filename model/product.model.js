const mongoose = require("mongoose")
const slug = require("mongoose-slug-updater") // tao slug(duong dan phia nguoi dung vd: products/hieu-thu-hai)

mongoose.plugin(slug)

const productSchema = new mongoose.Schema( // Schema định nghĩa cấu trúc, kiểu dữ liệu, và các ràng buộc cho bản ghi trong một collection MongoDB.
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
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

const Product = mongoose.model('Product',productSchema,'products') // tạo một model(là một đối tượng đại diện cho một bảng (table) hoặc collection
                                                                    //trong CSDL cung cấp các phương thức để thao tác với dữ liệu đó)
/* const Product là tên biến bạn sẽ dùng để truy cập model đó trong mã.
3 tham so trong do:
- 'Product' là tên model mà mongoose sẽ nhận diện bên trong
- productSchema: schema đã được định nghĩa trước đó
- 'products' tên cụ thể của collection trong MongoDB mà bạn muốn lưu các tài liệu cho model này. Nếu không truyền tham số này,
 Mongoose sẽ tự động sử dụng tên số nhiều của model ('Product') và chuyển về viết thường, tức 'products'.
*/

module.exports= Product