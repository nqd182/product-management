module.exports = (query)=>{
    let filterStatus = [
        {
            name:"Tất cả",
            status:"",
            class:""
        },
        {
            name:"Hoạt động",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status:"inactive",   
            class:""
        }
    ]
    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status) // tim vi tri tuong ung
        filterStatus[index].class = "active" // them key 

    }else{
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
    
}
    return filterStatus
}