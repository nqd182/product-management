const userMiddleware = require("../../middleware/client/user.middleware")

const productsRoutes =require("./product.route")
const homeRoutes = require("./home.route")
const chatRoutes = require("./chat.route")
const userRoutes = require("./user.route")


module.exports = (app) =>{
    app.use(userMiddleware.inforUser)
    
    app.use('/', homeRoutes)  
    app.use('/products', productsRoutes)
    app.use('/chat', chatRoutes)

    app.use('/user', userRoutes)
}
