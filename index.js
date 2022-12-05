import {menuArray} from "./data.js"

let orderArray = []
let completedOrder = false
let customerName = ""

document.addEventListener("click", handleClick)
document.addEventListener("submit", handleClick)

function handleClick(e){

    if(e.target.dataset.buy){
        handleBuyButtonClick(e.target.dataset.buy)
    }
    else if(e.target.dataset.remove){
        handleRemoveButtonClick(e.target.dataset.remove)
    }
    else if(e.target.id==="complete-order-btn") {
        handleCompleteOrderButtonClick()
    }
    else if(e.target.id==="pay-button"){
        handlePayButtonClick(e)
    }
    else if(e.target.id==="modal-close-btn"){
        handleCloseModalButtonClick()
    }
}

function handleBuyButtonClick(chosenId) {
    
    completedOrder = false
    orderArray.push(menuArray.filter( menuItem => menuItem.id==chosenId)[0])
    
    render()
    
}

function handleRemoveButtonClick(removeIndex){
    orderArray.splice(removeIndex, 1)
    render()
}

function handleCompleteOrderButtonClick(){
    document.getElementById('modal').style.display = "inline"
}


// <input type="text" name="fullName" placeholder="Enter your name" />
// <input type="text" name="card" placeholder="Enter card number" />
// <input type="text" name="cvv" placeholder="Enter CVV" />

function handlePayButtonClick(e) {
    
    const paymentForm = document.getElementById("payment-form")
    
    if(paymentForm.checkValidity()){
        e.preventDefault()
        const paymentFormData = new FormData(paymentForm)
        customerName = paymentFormData.get("fullName")
        
        
        paymentForm.reset()
        document.getElementById('modal').style.display = "none"
        completedOrder = true
        orderArray = []
        
        render()    
    }
    
}

function handleCloseModalButtonClick(){
    document.getElementById('modal').style.display = "none"
}


function getMenuHtml(){
    let menuHtml = ""
    menuArray.forEach(menuItem => {
        menuHtml+= `
        <div class="menu-item">
            <div class="menu-item-image">${menuItem.emoji}</div>
            <div class="menu-item-info">
                    <h2 class="menu-item-name">${menuItem.name}</h2>
                    <p class="menu-item-ingredients">${menuItem.ingredients}</p>
                    <p class="menu-item-price">$${menuItem.price}</p>
            </div>
            <button class="menu-item-btn" data-buy="${menuItem.id}">+</button>
        </div> 
        `
    })
    return menuHtml
}

function getOrderHtml() {
    let orderHtml = ""
    let totalPrice = 0

    if(orderArray.length>0){
        orderHtml += `
        <div class="order-container">
        <h1>Your order</h1>

        `
        orderArray.forEach((orderItem, index) => {
            totalPrice+=orderItem.price
            orderHtml+=`
            <div class="order-item">
         
                <h2 class="order-item-name">${orderItem.name}</h2>
                <button class="order-item-btn" data-remove="${index}">remove</button>
                <p class="order-item-price">$${orderItem.price}</p>
                
                
            </div> 
            `
        })
        orderHtml+=`
        </div>
        <div class="finish-order">
            <h2>Total Price: </h2><span class="total-price">$${totalPrice}</span>
        </div>
        <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
        
        `
    }
    return orderHtml
    
}

function getCompletedOrderHtml(message){
    let completedOrderHtml=`
    <div class="completed-order-message">
        <h1>Thanks ${customerName}! Your order is on its way! </h1>
    </div>`

    return completedOrderHtml

}

function render(){
    document.getElementById("menu").innerHTML = getMenuHtml()
    document.getElementById("order").innerHTML = completedOrder? getCompletedOrderHtml(): getOrderHtml()
}

render()