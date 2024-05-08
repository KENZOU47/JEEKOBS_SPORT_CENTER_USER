var iconCart=document.querySelector('.icon-cart');
var body=document.querySelector('body');
var closeCart=document.querySelector('.close');
var checkOutCart=document.querySelector('.checkOut');
var listProductHTML=document.querySelector('.listProduct');
var listCartHTML = document.querySelector('.listCart');
var iconCartSpan = document.querySelector('.icon-cart span');


let listProducts = [];
let carts = [];
iconCart.addEventListener('click', ()=>{
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', ()=>{
    body.classList.toggle('showCart')
})

checkOutCart.addEventListener('click',()=>{

})
function addDataToHTML(){
    listProductHTML.innerHTML = '';
    if(listProducts.length>0){
        listProducts.forEach(product =>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id =product.id;
            newProduct.innerHTML = `  <img src="${product.image}" alt="">
            <h2>${ product.name}</h2>
            
            <div class="$ ">$ ${product.price}</div>
            <button class="addCart">
                add to cart
            </button>`;
            listProductHTML.appendChild(newProduct)
        })
    }
   
    }
    listProductHTML.addEventListener('click',(event)=>{
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let product_id = positionClick.parentElement.dataset.id;
         
            addToCart(product_id);
        }
    })
    function addToCart  (product_id)  {
        let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id)
        if(carts.length <=0){
            carts = [{
              product_id:product_id,    
                quantity:1
               
    
            }]
         }else if(positionThisProductInCart < 0){
            carts.push({
                product_id:product_id,
                quantity:1
            });

        
            
        }else{
            carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity +1;
        }
        addCarToHTML();
        addCartToStorage();
      
    }
    function addCartToStorage  () {
        localStorage.setItem('cart', JSON.stringify(carts));
    }
function addCarToHTML  () {

    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    let totalAmount=0;

    if(carts.length > 0){
        carts.forEach(cart =>{
            totalQuantity = totalQuantity+cart.quantity;

            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            let totalPrice =info.price*cart.quantity;
            totalAmount+=totalPrice
            newCart.innerHTML = `   <div class="image">
            <img src="${img/info.image}" alt="">
        </div>
        <div class="">${info.name}</div>
        <div class="totalPrice">$${info.price * cart.quantity}</div>
        <div class="quantity">
            <span class="minus">
                -</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
        </div>`;
        listCartHTML.appendChild(newCart);
        })
       
    }
 iconCartSpan.innerText = totalQuantity;
 checkOutCart.innerText = `Checkout - Total: $${totalAmount.toFixed(2)}`;
 document.querySelector('.totalAmount').innerText = `Total: $${totalAmount.toFixed(2)}`;
 
 return totalAmount;
 
   }
   

listCartHTML.addEventListener('click',(event) =>{
    let positionClick = event.target;
    if(positionClick.classList.contains('minus')||positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id,type);

    }


})
function changeQuantity (product_id,type) {
    let positionItemCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemCart >=0){
        switch(type){
            case 'plus':
                carts[positionItemCart].quantity = carts[positionItemCart].quantity +1;
                break;
                default:
                    let valueChange = carts[positionItemCart].quantity -1;
                    if(valueChange > 0){
                        carts[positionItemCart].quantity = valueChange;
                    }else{
                        carts.splice(positionItemCart, 1);

                    }
                    break;
        }
       
        addCarToHTML();
        addCartToStorage();
    }
}
function calculateTotalAmount() {
    let totalAmount = 0;

    carts.forEach(cart => {
        let product = listProducts.find(product => product.id === cart.product_id);
        if (product) {
            totalAmount += product.price * cart.quantity;
        }
    });

    return totalAmount;
    
}

checkOutCart.addEventListener('click', () => {
    checkout();
});


function checkout() {
  
    const popup = document.querySelector('.popup');
    popup.style.display = 'block'; 

    clearCart();   
}


document.querySelector('.close-popup').addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    popup.style.display = 'none';

});

document.querySelector('.close-popup').addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none';
});

function clearCart() {
    carts = []; 
    addCarToHTML(); 
    addCartToStorage(); 
}


function initApp()  {
 
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        console.log(listProducts);
        addDataToHTML(); 
        //retrieve da memory
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCarToHTML();
        } 

    })
}

initApp();