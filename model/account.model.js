const mongoose = require("mongoose")
const generate = require("../helper/generate")

const accountSchema = new mongoose.Schema(
    {
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomNumber(20)
    }, // la 1 chuoi random la duy nhat, khi dang nhap thanh cong thi se luu token phia ng dung
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
        
    deleted: {
        type: Boolean, 
        default: false
    },
    deletedAt: Date
},
{
    timestamps: true
}
)

const Account = mongoose.model('Account',accountSchema,'accounts')

module.exports= Account