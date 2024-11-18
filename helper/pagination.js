module.exports = (objectPagination,query,countProducts) =>{
    if(query.page){
        objectPagination.currentPage = parseInt(query.page) // lay trang hien tai dang truy cap tu query
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems // ap dung cong thuc de tinh so san pham can skip 

        //Tinh so trang can de phan trang
    const totalPage = Math.ceil(countProducts/objectPagination.limitItems); //  tinh tong so trang 
    objectPagination.totalPage = totalPage;
    return objectPagination
}