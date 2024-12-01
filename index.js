const express = require('express')
const methodOverride = require("method-override")
const route =require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')
const flash = require('express-flash') // tao thong bao
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer = require('multer') // upload file 

require('dotenv').config()
const systemConfig = require("./config/system")

const database = require('./config/database')
database.connect()

const app = express() // khởi tạo một ứng dụng Express
const port = process.env.port

app.use(methodOverride("_method")) // ghi de phuong thuc de chuyen thanh PATCH

app.use(express.urlencoded({extended: false}))


app.set("views",`${__dirname}/views`) //cấu hình các tùy chọn như views hay view engine //luc dau la app.set("views","./views")
app.set("view engine","pug")

// Flash de tao thong bao
app.use(cookieParser('nqd182')); //key bat ky, can cai thu vien cookie-parser
app.use(session({ cookie: { maxAge: 60000 }}));// thoi gian cookie ton tai, can cai thu vien express-session
app.use(flash());

 // App Locals Variables
 
 app.locals.prefixAdmin= systemConfig.prefixAdmin //gán giá trị vào biến cục bộ (locals) 
 // biến cục bộ này được truyền vào tất cả các view  khi render do đó có thể được truy cập trực tiếp trong các file view

app.use(express.static(`${__dirname}/public`)) //luc dau la app.use(express.static('public')) them ${__dirname}/ de sever hieu public la 1 thu muc  

//Routes
route(app)
routeAdmin(app)

app.listen(port, () => { // khởi động server lắng nghe trên một port
  console.log(`Example app listening on port ${port}`)
})