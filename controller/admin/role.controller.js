const Role = require("../../model/role.model")
const systemConfig = require("../../config/system")

// [GET] /admin/roles
module.exports.index= async (req, res) => { 
    let find = {
        deleted: false
    }
    const records = await Role.find(find)

    res.render("admin/pages/roles/index",{
        pageTitle: "Trang nhóm quyền",
        records: records
    })
}   

// [GET] /admin/roles/create
module.exports.create= async (req, res) => { 

    res.render("admin/pages/roles/create",{
        pageTitle: "Tạo nhóm quyền",
    })
}

// [POST] /admin/roles/create
module.exports.createPost= async (req, res) => { 

    const record= new Role(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit= async (req, res) => { 
try {
    let find = {
        _id: req.params.id,
        deleted: false
    }
    let record = await Role.findOne(find)

    res.render("admin/pages/roles/edit",{
        pageTitle: "Chỉnh sửa nhóm quyền",
        record: record
    })
} catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
   
}
// [GET] /admin/roles/edit/:id
module.exports.editPatch= async (req, res) => { 
    
    await Role.updateOne({_id: req.params.id},req.body)

    res.redirect(`${systemConfig.prefixAdmin}/roles`)

    res.render("admin/pages/roles/edit",{
        pageTitle: "Chỉnh sửa nhóm quyền",
    })
}