const multer = require('multer')
// multer lưu ngầm file nên không cần truyền sang duoi dang (file)
module.exports = () => { 
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/uploads/')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now()
          cb(null, `${uniqueSuffix}-${file.originalname}`) // ten file sau khi luu
        }
      })
      return storage
}