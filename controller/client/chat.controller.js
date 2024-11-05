//[GET] /chat/
module.exports.index= async (req, res) => { // index la ten ham 
    res.render("client/pages/chat/index",{
        pageTitle: "Chat"
    })
}