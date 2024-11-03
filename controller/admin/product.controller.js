const Product = require("../../model/product.model")

const filterStatusHelper = require("../../helper/filterStatus")
const searchsHelper = require("../../helper/search")
const paginationHelper = require("../../helper/pagination")

// [GET] /admin/products
module.exports.index= async (req, res) => { // index la ten ham 
   
    let find={
        deleted: false
    }
    const filterStatus = filterStatusHelper(req.query)
    if(req.query.status) {
        find.status= req.query.status // them key vao object, ko phai luc nao cung co truy van

    }
    // search engine
    const objectSearch = searchsHelper(req.query)
    if(objectSearch.regex){
        find.title= objectSearch.regex
    }
    // end search engine

    //Pagination: phân trang
        //công thức: Vị trí bắt đầu lấy =  (Trang hiện tại-1)*Số phần tử mỗi trang
        // Ví dụ: Trang 2, 4 sản phẩm=> vị trí bắt đầu lấy = (2-1)*4= 4 
    const countProducts = await Product.countDocuments(find);// lấy so lg  sản phẩm
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4  // so luong item 
        },
        req.query,
        countProducts
    )
        //let objectPagination =
        // {
        //     currentPage: 1,
        //     limitItems: 4  // so luong item 
        // },
        // if(req.query.page){
        //     objectPagination.currentPage = parseInt(req.query.page) // trang hien tai dang truy cap
        // }
        // objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems // ap dung cong thuc 

        //     //Tinh so trang can de phan trang
        // const countProducts = await Product.countDocuments(find);// lấy sl sản phẩm
        // const totalPage = Math.ceil(countProducts/objectPagination.limitItems); //  tinh tong so trang
        // objectPagination.totalPage = totalPage;
        //End Pagination

    //Hiển thị danh sách sản phẩm
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip ) //skip: bo qua bnhieu sp dau tien


    res.render("admin/pages/products/index",{
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}  

// [PATCH] /admin/products/change-status/:status/:id 
module.exports.changeStatus = async (req, res) => { 
    const status = req.params.status // params chua cac router dong
    const id = req.params.id

    await Product.updateOne({_id: id},{status: status})

    res.redirect("back") // chuyen huong ve trang truoc do 
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => { 
    const type = req.body.type
    const ids = req.body.ids.split(", ") // chuyển lại về 1 mảng
    switch(type) {
        case "active":
            await Product.updateMany({_id: {$in: ids}},{status: "active"}) //Toán tử $in: tìm tất cả các tài liệu có trường _id nằm trong mảng ids.
            break
        case "inactive":
            await Product.updateMany({_id: {$in: ids}},{status: "inactive"})
            break
    }
    
    res.redirect("back")
}

//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async(req, res) =>{
    const id = req.params.id

    //await Product.deleteOne({_id: id})
    await Product.updateOne({_id: id}, 
        {
            deleted: true, deletedAt: new Date()
        })

    res.redirect("back")
}