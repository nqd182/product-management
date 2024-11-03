module.exports = (objectPagination,query,countProducts) =>{
    if(query.page){
        objectPagination.currentPage = parseInt(query.page) // trang hien tai dang truy cap
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems // ap dung cong thuc 

        //Tinh so trang can de phan trang
    const totalPage = Math.ceil(countProducts/objectPagination.limitItems); //  tinh tong so trang
    objectPagination.totalPage = totalPage;
    return objectPagination
}