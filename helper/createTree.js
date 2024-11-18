let count = 0; // them count de set lai index cho dung, la bien toan cuc duoc luu trong server
const createTree = (arr, parentId = "") =>{
    const tree =[]
    arr.forEach((item) => {
        if(item.parent_id === parentId){
            count++;
            const newItem = item
            newItem.index = count
            const children = createTree(arr, item.id)
            if(children.length > 0){
                newItem.children = children
            }
            tree.push(newItem)
        }
    });
    return tree
}

module.exports.tree = (arr, parentId = "") =>{
    count = 0
    const tree = createTree(arr, parentId = "")
    return tree
}