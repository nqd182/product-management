const mongoose = require("mongoose")


const roleSchema = new mongoose.Schema( // Schema định nghĩa cấu trúc, kiểu dữ liệu, và các ràng buộc cho bản ghi trong một collection MongoDB.
    {
        title: String,
        description: String,
        permissions: {
            type: Array,
            default: []
        },
        deleted: { 
            type: Boolean, 
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true // them 2 thuoc tinh thoi gian tao va sua 
    }
)

const Role = mongoose.model('Role',roleSchema,'roles') 


module.exports= Role