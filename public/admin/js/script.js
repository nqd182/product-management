
//button status
const buttonStatus=document.querySelectorAll("[button-status]") // thuoc tinh tu dinh nghia  phai them []
if(buttonStatus.length > 0 ){ // ton tai thi moi cho code chay
    let url = new URL(window.location.href) // ham URL de xu ly duong dan
    buttonStatus.forEach(button => {
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status")
            if(status){
                url.searchParams.set ("status",status); //searchParams: thao tác với query string
            }else{
                url.searchParams.delete ("status");

            }
            window.location.href=url.href //chuyen huong trang
       })
    })
}
//end button status

//Form search
const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url= new URL(window.location.href)
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault(); //tat su kien load lai trang mac dinh thi se khong bi xoa bộ lọc đã chọn
        const keyword= e.target.elements.keyword.value //lay ra gia tri khi submit
        if(keyword){
            url.searchParams.set ("keyword",keyword);
        }else{
            url.searchParams.delete ("keyword");

        } 
        window.location.href = url.href
    })
}
//End form search

//Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]")
if(buttonsPagination){
    let url = new URL(window.location.href)
    buttonsPagination.forEach(button => {
        button.addEventListener("click",() =>{
            const page = button.getAttribute("button-pagination")

            url.searchParams.set("page",page)
            window.location.href = url.href
            
        })
    })
}
//End pagination

//Show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = showAlert.querySelector("[close-alert]")
    
    setTimeout(() =>{
        showAlert.classList.add("alert-hidden") // them class
    }, time)

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })

}
//End show alert

//Up load Image(Preview img upload)
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")

    uploadImageInput.addEventListener("change", (e) => {
        console.log(e)
       const file = e.target.files[0]
       if(file){
        uploadImagePreview.src = URL.createObjectURL(file) //tạo ra một URL tạm thời (blob URL) để  hiển thị nội dung của một file đã được chọn hoặc upload mà không cần phải tải file đó lên server trước
       }
    })
}
//End upload image

//Sort
const sort = document.querySelector('[sort]')
if(sort){
    let url = new URL(window.location.href)
    sortSelect = sort.querySelector('[sort-select]') 
    sortSelect.addEventListener('change', e => {
        const [sortKey, sortValue] = e.target.value.split("-")
        url.searchParams.set('sortKey', sortKey)
        url.searchParams.set('sortValue', sortValue)
        window.location.href = url.href
    })

    //Xoa tim kiem
    sortClear = sort.querySelector('[sort-clear]') 
    sortClear.addEventListener('click', ()=>{
        url.searchParams.delete('sortKey')
        url.searchParams.delete('sortValue')
        window.location.href = url.href
    })
    //checked
    const sortKey = url.searchParams.get('sortKey')
    const sortValue = url.searchParams.get('sortValue')
    if(sortKey && sortValue){
        let option = sortSelect.querySelector(`option[value=${sortKey}-${sortValue}]`)
        option.selected = true
    }

}

//End sort 