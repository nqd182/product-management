const productsRoutes =require("./product.route")
const homeRoutes = require("./home.route")
const chatRoutes = require("./chat.route")

module.exports = (app) =>{
    app.use('/', homeRoutes)  
    app.use('/products', productsRoutes)
    app.use('/chat', chatRoutes)
}
