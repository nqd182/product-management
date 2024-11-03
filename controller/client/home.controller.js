//[GET] /
module.exports.index= async (req, res) => { // index la ten ham 
    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ"
    })
}