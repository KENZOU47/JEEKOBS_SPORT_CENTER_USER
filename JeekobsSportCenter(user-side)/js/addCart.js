var iconCart = document.querySelector('.icon-cart');
var body = document.querySelector('body');
var closeCart = document.querySelector('.close');
var checkOutCart = document.querySelector('.checkOut');
var listProductHTML = document.querySelector('.listProduct');
var listCartHTML = document.querySelector('.listCart');
var iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

checkOutCart.addEventListener('click', () => {
    // Do something when checkout button is clicked
});

const products = [
    {
        "id": 1,
        "name": "Sport shoes 1",
        "price": 599,
        "image": "../img/ball1-removebg-preview.png"
    },
    {
        "id": 2,
        "name": "Sport ball",
        "price": 699,
        "image": "../img/ball6-removebg-preview.png"
    },
    {
        "id": 3,
    "name":"Sport ball",
    "price":499,
    "image":" ../img/jersey2-removebg-preview.png"
    },
    
    {
        "id": 4,
        "name":"Sport ball2",
        "price":299,
        "image":"../img/ball2-removebg-preview.png"
        
    },
    {
        "id": 5,
        "name":"Sport ball3",
        "price":199,
        "image":"../img/ball3-removebg-preview.png"
        
    },
    {
        "id": 6,
        "name":"Sport shirt",
        "price":399,
        "image":"../img/jerseyadidas-removebg-preview.png"
        
    },
    {
        "id": 7,
        "name":"Sport ball4",
        "price":199,
        "image":"../img/ball4-removebg-preview.png"
        
    },
    {
        "id": 8,
        "name":"Johny Rolds",
        "price":99999,
        "image":"../img/harold-removebg-preview.png"
        
    },
    {
        "id": 9,
        "name":"Sport shoe 4",
        "price":199,
        "image":"../img/shoes9-removebg-preview.png"
        
    }
   
];


function renderProducts() {
    listProductHTML.innerHTML = '';
    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `  
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$ ${product.price}</div>
            <button class="addCart">Add to cart</button>`;
        listProductHTML.appendChild(newProduct);
    });
}


listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let productId = positionClick.parentElement.dataset.id;
        addToCart(productId);
    }
});

function addToCart(productId) {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == productId);
    if (carts.length <= 0) {
        carts = [{
            product_id: productId,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: productId,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity += 1;
    }
    renderCart();
    saveCartToStorage();
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(carts));
}

function renderCart() {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    let totalAmount = 0;

    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            let totalPrice = info.price * cart.quantity;
            totalAmount += totalPrice;
            newCart.innerHTML = `   
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div>${info.name}</div>
                <div class="totalPrice">$${totalPrice}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>`;
            listCartHTML.appendChild(newCart);
        });
    }

    iconCartSpan.innerText = totalQuantity;
    checkOutCart.innerText = `Checkout - Total: $${totalAmount.toFixed(2)}`;
    document.querySelector('.totalAmount').innerText = `Total: $${totalAmount.toFixed(2)}`;

    return totalAmount;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let productId = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantity(productId, type);
    }
});

function changeQuantity(productId, type) {
    let positionItemCart = carts.findIndex((value) => value.product_id == productId);
    if (positionItemCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemCart].quantity += 1;
                break;
            default:
                let valueChange = carts[positionItemCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemCart, 1);
                }
                break;
        }

        renderCart();
        saveCartToStorage();
    }
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
    renderCart(); 
    saveCartToStorage(); 
}




function initApp() {
    listProducts = products;
    console.log(listProducts);
    renderProducts();
    if (localStorage.getItem('cart')) {
        carts = JSON.parse(localStorage.getItem('cart'));
        renderCart();
    }
}

initApp();