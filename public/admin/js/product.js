// Change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonsChangeStatus.length>0){
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")

    buttonsChangeStatus.forEach(button =>{
        button.addEventListener("click",() =>{
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            let statusChange = statusCurrent == "active" ? "inactive":"active"

            const action = path + `/${statusChange}/${id}?_method=PATCH` // ?_method=PATCH de ghi de phuong thuc thanh PATCH, ben method form phai de la POST
            // ly do phai dung path mac du co the dung get la tranh bi nguoi dung truy cap va chinh sua du lieu
            formChangeStatus.action = action //o day action la thuoc tinh mac dinh nen ko can dung setAttribute

            formChangeStatus.submit() // ham de gui form
            // cai them thu vien method-override de doi method cua form thanh PATH
        })
    })
}
// End change status

//Check box multi
const checkBoxMulti = document.querySelector("[checkbox-multi]")
if(checkBoxMulti){ 
    const inputCheckAll = checkBoxMulti.querySelector("input[name=checkall]") // hoac viet la "input[name='checkall']"
    const inputsId =  checkBoxMulti.querySelectorAll("input[name=id]")
    inputCheckAll.addEventListener("click",() =>{
        if(inputCheckAll.checked){
            inputsId.forEach(input =>{
                input.checked = true
            })
        }else{
            inputsId.forEach(input =>{
                input.checked = false
            })
        }
        
    })

    inputsId.forEach(input =>{
        input.addEventListener("click",()=>{
          const countChecked = checkBoxMulti.querySelectorAll("input[name=id]:checked").length // lay checkbox co checked = true
          console.log(countChecked)
          console.log(inputsId.length)
          if(countChecked == inputsId.length){
            inputCheckAll.checked = true
          }else inputCheckAll.checked = false
        })
    })
}
//End check box multi

//Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) =>{
        e.preventDefault()
        const checkBoxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkBoxMulti.querySelectorAll("input[name=id]:checked")
        if(inputsChecked.length > 0)
        {
             let ids = []
             const inputIds = formChangeMulti.querySelector("input[name=ids]")

             inputsChecked.forEach(input =>{
                const id = input.value
                ids.push(id)
             })

             inputIds.value = ids.join(", ")//input chi luu dang mang nen phai convert thanh text 
             formChangeMulti.submit()
        }else{
            alert("Vui lòng chọn ít nhất 1 bản ghi")
        }

    })
}
//End form change multi

//Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]")
if(buttonsDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path =formDeleteItem.getAttribute("data-path")
    buttonsDelete.forEach(button => {
        button.addEventListener("click", ()=>{
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này không?")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                const action =  `${path}/${id}?_method=DELETE`
                formDeleteItem.action = action
                formDeleteItem.submit();
            }
        })
    })
}
//End delete item
