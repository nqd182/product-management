const User = require("../../model/user.model")

module.exports.inforUser = async(req,res,next) => {

    if(req.cookies.tokenUser){      
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        }).select("-password") // ko lấy thuộc tính password ra
        if(user){ // neu co user thi luu vao bien toan cuc de hien thi ra giao dien ko co thi van de truy cap binh thuong 
            res.locals.user = user
       }
    }

    next()
}