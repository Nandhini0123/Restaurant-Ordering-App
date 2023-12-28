import { menuArray } from '/data.js'
const menuCard = document.getElementById("menu-card")
const orderBox = document.getElementById("order-box")
const finalPrice = document.getElementById("final-price")
const priceOfEach = [];
const orderedItem = [];
const idOfItem =  [];
let totalPrice  = '';
let indexOfItem;

// To display menu list from  data file

function getMenuHtml(){
    let menuHtml = '';
    menuArray.forEach(function(menu){
             menuHtml += `<div class="food-items">
                                <div class="food-details">
                                    <div class="food-emoji">
                                        <p>${menu.emoji}</p>
                                    </div>
                                    <div>
                                        <p id="name">${menu.name}</p>
                                        <p id="ingredients">${menu.ingredients}</p>
                                        <p id="price">${"$" + menu.price}
                                    </div>
                                </div>
                                <div class="add-items">
                                    <p id="add-btn" data-add="${menu.id}">➕</p>
                                </div>
                          </div>`
                          
    })
    return menuHtml
}
menuCard.innerHTML = getMenuHtml();

//  EVENT LISTENER

document.addEventListener('click',function(e){
 if(e.target.dataset.add){
   yourOrderBox(e.target.dataset.add)
   document.getElementById("order-heading").style.display="block";
   document.getElementById("total").style.display="flex";
   document.getElementById("purchase-btn").style.display="block";
   document.getElementById("alert-msg").innerHTML = " ";
   document.getElementById("order-msg-box").style.visibility="hidden";
 }
 else if(e.target.dataset.remove){
   removeItem(e.target.dataset.remove)
 }
 else if(e.target.id === 'purchase-btn'){
    paymentWindow()
 }
})

//Order Confirmation Message//
const formId = document.getElementById("form-id");
formId.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("modal").style.visibility="hidden";
    orderBox.innerHTML = '';
    document.getElementById("order-heading").style.display="none";
    document.getElementById("total").style.display="none";
    document.getElementById("purchase-btn").style.display="none";
    document.getElementById("order-msg-box").style.visibility="visible";
    // ORDER MSG
    const orderMsg = document.getElementById("order-msg");
    orderMsg.innerHTML = 'Thank You , your order is on the way';
})

//  FUNCTION TO DISPLAY ADDED ITEMS

function getCart() {
    let addItem = "";
    orderedItem.forEach(function(item) {
        addItem +=  
        `<div class="item-name-price" data-name="${item.name}">
           <div class="item-name-remove" >
                <p class="item-name">${item.name}</p>
                <p id="remove-item-btn" data-remove="${item.id}">remove</p>
                <p id="quantity" data-qty="count">${item.quantity}</p>
            </div>

                 <p id="price-selected-item">$ ${item.price}</p>
        </div>`
})
return addItem
}

function yourOrderBox(menuId){
   
    const selectedItem = menuArray.filter(function(menu){
        return menu.id == menuId
    })[0]
    if(!orderedItem.find( item => item.id === selectedItem.id)){
            const newItem = {
                id: selectedItem.id,
                name: selectedItem.name,
               quantity: 1,
               price: selectedItem.price,
            }
         orderedItem.push(newItem)
        }
      else {
        const moreItem = orderedItem.find( item => item.id === selectedItem.id);
            moreItem.price =  moreItem.price +  moreItem.price/ moreItem.quantity
            moreItem.quantity++
      }
    
    priceOfEach.push(selectedItem.price)
    idOfItem.push(selectedItem.id)
    update()
}

//UPDATE REMOVED ITEMS AND UPDATED TOTAL PRICE

function update(){
    orderBox.innerHTML = getCart();
    totalPriceCalc();
}

// REMOVE FUNCTION

function removeItem(menuId){
const toRemoveItem = orderedItem.find(function(menu){
      return menu.id == menuId
        });
     toRemoveItem.price = toRemoveItem.price -toRemoveItem.price/toRemoveItem.quantity
     toRemoveItem.quantity--
     indexOfItem = idOfItem.indexOf(Number(menuId));
     if(toRemoveItem.quantity){
        orderedItem.splice(indexOfItem, 1, toRemoveItem)
     }
     else{
        orderedItem.splice(indexOfItem, 1)
     } 
idOfItem.splice(indexOfItem, 1);  
priceOfEach.splice(indexOfItem, 1);
update();
  
}

// FUNCTION TO CALCULATE TOTAL PRICE

function totalPriceCalc(){ 
    if(priceOfEach.length){
    totalPrice = priceOfEach.reduce(calcTotalPrice);
    function calcTotalPrice(total,value){
        return total + value;
    }}
    else {
        totalPrice = 0;
        document.getElementById("total").style.display= "none"
        document.getElementById("purchase-btn").style.display="none"
        document.getElementById("order-heading").style.display="none"
    }
    finalPrice.innerHTML = `$ ${totalPrice}`;
    } 

//FUNCTION TO DISPLAY PAYMENTWINDOW

function paymentWindow(){
    if(orderedItem.length) {
    document.getElementById("modal").style.visibility="visible";
    }
    else {
        document.getElementById("order-msg-box").style.visibility="visible";
        document.getElementById("alert-msg").innerHTML = "Your Cart is empty. Please add items";
        document.getElementById("order-msg").innerHTML = " ";
    }
}



