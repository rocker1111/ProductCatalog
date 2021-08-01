const filterInput = document.querySelector('#filter')
const producrList = document.querySelector('.collection')
const msg = document.querySelector('.msg')
const nameInput = document.querySelector('.productName')
const priceInput = document.querySelector('.productPrice')
const addBtn = document.querySelector('.add-product')
const deleteBtn = document.querySelector('.delete-btn')

// data / statuse
let productData = []
function getData(productList){
    if(productData.length  > 0) {
       msg.innerHTML = ''
        let li = ''
        productList.forEach(({id,name, price}) => {
            // const {id,name, price} = product
        li = document.createElement('li')
        li.className = "list-group-item collection-item"
        li.id = `product-${id}`
        li.innerHTML = `
        <strong>${name} </strong> -
        <span class="price">$${price}</span>
        <i class="far fa-trash-alt float-right delete-btn"></i>
        `
    producrList.appendChild(li)
    });

    } else {
       showMsg('please add item to your catalog')
    }
}
getData(productData)

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const name = nameInput.value
    const price = priceInput.value
    let id 
    if (productData.length === 0) {
        id = 0
    } else {
        id = productData[productData.length - 1].id + 1
    }

    if(name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))) {
        alert('please fill up form')
    } else {
        productData.push({
            id,
            name,
            price
        })
        producrList.innerHTML = ''
        getData(productData)
        nameInput.value = ''
        priceInput.value = ''
    }

})

// delete item

producrList.addEventListener('click', e => {
    if(e.target.classList.contains('delete-btn')){
    // console.log('you want to delete item')
        // e.target.parentElement.remove()
        // removing target form the ui
        const target = e.target.parentElement
        e.target.parentElement.remove(target)

        const id =parseInt(target.id.split('-')[1])
        // ret result array
       const result = productData.filter((product) =>{
            return product.id !== id 
        })
        productData = result
    }
})

filterInput.addEventListener('keyup', (e) => {
    // console.log(e.target.value)
    const text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection .collection-item').forEach(item => {
        const productName = item.firstElementChild.textContent.toLowerCase()
        if(productName.indexOf(text) === -1) {
            // showMsg(null, true)
            showMsg('no item your catria')
            item.style.display = 'none'
        } else {
            msg.innerHTML = ''
            item.style.display = 'block'
        }
        // item.firstChild.firstChild
    })
})

// function showMsg(fetcMsg, searchMesg){
//     if(fetcMsg) {
//         msg.innerHTML = 'please add item to your catalog'
//     } else if(searchMesg){
//         msg.innerHTML = 'no item meet your crteria'
//     }
// }

function showMsg(message){
    msg.innerHTML = message
    // if(fetcMsg) {
    //     msg.innerHTML = 'please add item to your catalog'
    // } else if(searchMesg){
    //     msg.innerHTML = 'no item meet your crteria'
    // }
}