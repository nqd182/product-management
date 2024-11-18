const Product = require("../../model/product.model")

const systemConfig = require("../../config/system")

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
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4  // so luong item 
        },
        req.query,
        countProducts
    )
    //End Pagination
    //Sort
    let sort = {}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }else sort.position = 'asc'
    //End sort
    
    //Hiển thị danh sách sản phẩm
    const products = await Product.find(find)
    .sort(sort) // giam dan: desc
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip ) //skip: bo qua bnhieu sp dau tien

 
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

    req.flash("success", "Cập nhật trạng thái thành công!")

    res.redirect("back") // chuyen ve trang dang thao tac truoc do
}

// [PATCH] /admin/products/change-multi (thay đổi nhiều sản phẩm)
module.exports.changeMulti = async (req, res) => { 
    const type = req.body.type
    const ids = req.body.ids.split(", ") // chuyển lại về 1 mảng
    switch(type) {
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"}) //Toán tử $in: tìm tất cả các tài liệu có trường _id nằm trong mảng ids.
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công `)
            break
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"})
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công `)
            break
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}}, {deleted: "true", deletedAt: new Date()})
            req.flash("success", `Xóa thành công ${ids.length} sản phẩm`)
            break
        case "change-position":
            for(const item of ids){ // dùng for of để lặp mà ko dùng updateMany vì giá trị cập nhật của mỗi phần tử khác nhau
                let [id, position] = item.split("-") //tach ra thanh mang, cu gap dau - la tach thanh 1 mang 2 phan tu
                position = parseInt(position)
                await Product.updateOne({_id: id}, {position: position})
            }
            req.flash("success", `Đã đổi vị trí thành công ${ids.length} sản phẩm`)
            break
        default:
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

    req.flash("success", `Xóa sản phẩm thành công `)
    res.redirect("back")
}

// [GET] /admin/products/create
module.exports.create= async (req, res) => { 
    res.render("admin/pages/products/create",{
        pageTitle: "Thêm mới sản phẩm",

    })
}  

// [POST] /admin/products/create
module.exports.createPost= async (req, res) => { 
    // console.log(req.file)
    
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if(req.body.position == ""){
        const  countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1

    }else {
        req.body.position = parseInt(req.body.position)
    }
    // if(req.file){ // có tải ảnh thì mới up lên
    //     req.body.thumbnail = `/uploads/${req.file.filename}` //  đường link ảnh vd: localhost:3000/uploads/dbe287825aeab57b5dba583c4aa8964c
    // }
   
    const product = new Product(req.body) // tạo mới 1 sp
    await product.save() // Lưu vào database 

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}  

// [GET] /admin/products/edit/:id
module.exports.edit= async (req, res) => { 
try { // try catch de khi ng dung go sai id thi ko bi sap server
    const find = {
        deleted: false,
        _id: req.params.id
    }

    const product = await Product.findOne(find)


    res.render("admin/pages/products/edit",{
        pageTitle: "Sửa sản phẩm",
        product: product
    })
} catch (error) {
    req.flash("error", "Không tồn tại sản phẩm ")
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}
    
}  

// [PATCH] /admin/products/edit/:id 
module.exports.editPatch= async (req, res) => { 
    // console.log(req.file)
    const id= req.params.id
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position) // lấy vị trí nhập lên nên ko cần if else nữa

    if(req.body.thumbnailLink){ // thêm để sửa ảnh từ link
        req.body.thumbnail = req.body.thumbnailLink
    }
    else if(req.file){ // có tải ảnh thì mới up lên
        req.body.thumbnail = `/uploads/${req.file.filename}` //  đường link ảnh vd: localhost:3000/uploads/dbe287825aeab57b5dba583c4aa8964c
    }
    
   
    try {
        await Product.updateOne({ _id: id}, req.body)
        req.flash("success", `Sửa thành công sản phẩm ${req.body.title}`)
    } catch (error) {
        req.flash("success", `Sửa thất bại sản phẩm ${req.body.title}`)
    }

        res.redirect(`${systemConfig.prefixAdmin}/products`)
}  

// [GET] /admin/product/detail/:id
module.exports.detail= async (req, res) => { 
    
    try { // try catch de khi ng dung go sai id thi ko bi sap server
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find)
    
    
        res.render("admin/pages/products/detail",{
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        req.flash("error", "Không tồn tại sản phẩm ")
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}
        
