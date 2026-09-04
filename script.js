// =====================================================
// FIREBASE
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "YOUR_NEW_API_KEY",

    authDomain:
        "kayakani-bakery.firebaseapp.com",

    projectId:
        "kayakani-bakery",

    storageBucket:
        "kayakani-bakery.firebasestorage.app",

    messagingSenderId:
        "861879891216",

    appId:
        "1:861879891216:web:a9c91ee27859ef9ef62195"

};


const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);


// =====================================================
// PRODUCTS
// =====================================================

const products = [

    // TEA & COFFEE

    {
        name: "Tea Parcel",
        price: 40,
        category: "tea",
        icon: "☕",
        image: "images/tea.png"
    },

    {
        name: "Coffee Parcel",
        price: 40,
        category: "tea",
        icon: "☕",
        image: "images/coffe.png"
    },

    {
        name: "Black Tea Parcel",
        price: 40,
        category: "tea",
        icon: "🍵",
        image: "images/black tea.png"
    },


    // SNACKS

    {
        name: "Vada",
        price: 10,
        category: "snacks",
        icon: "🥨",
        image: "images/vada.png"
    },

    {
        name: "Samosa",
        price: 10,
        category: "snacks",
        icon: "🥟",
        image: "images/samosa.png"
    },

    {
        name: "Bonda",
        price: 10,
        category: "snacks",
        icon: "🟤",
        image: "images/bonda.png"
    },

    {
        name: "Bajji",
        price: 10,
        category: "snacks",
        icon: "🥞",
        image: "images/bajji.png"
    },

    {
        name: "Veg Puff",
        price: 20,
        category: "snacks",
        icon: "🥐",
        image: "images/veg puff.png"
    },

    {
        name: "Egg Puff",
        price: 30,
        category: "snacks",
        icon: "🥚",
        image: "images/egg puff.png"
    },

    {
        name: "Mushroom Puff",
        price: 30,
        category: "snacks",
        icon: "🍄",
        image: "images/mushroom puff.png"
    },


    // BUNS & BREAD

    {
        name: "Cream Bun",
        price: 25,
        category: "bread",
        icon: "🍞",
        image: "images/creambun.png"
    },

    {
        name: "Tea Bun",
        price: 10,
        category: "bread",
        icon: "🥯",
        image: "images/teabun.png"
    },

    {
        name: "Bread",
        price: 45,
        category: "bread",
        icon: "🍞",
        image: "images/bread.png"
    },


    // MIXTURE & SAVOURIES

    {
        name: "Mixture - 100g",
        price: 40,
        category: "mixture",
        icon: "🥜",
        image: "images/mixture-100g.png"
    },

    {
        name: "Mixture - 250g",
        price: 90,
        category: "mixture",
        icon: "🥜",
        image: "images/mixture-250g.png"
    },

    {
        name: "Mixture - 500g",
        price: 170,
        category: "mixture",
        icon: "🥜",
        image: "images/mixture-500g.png"
    },

    {
        name: "Sevu - 100g",
        price: 40,
        category: "mixture",
        icon: "🥜",
        image: "images/sevu-100g.png"
    },


    // SWEETS

    {
        name: "Normal Sweets - 250g",
        price: 150,
        category: "sweets",
        icon: "🍬",
        image: "images/normal sweets-250g.png"
    },

    {
        name: "Milk Sweets - 250g",
        price: 250,
        category: "sweets",
        icon: "🍬",
        image: "images/milk sweets.png"
    },

   


    // DRINKS

    {
        name: "Coke",
        price: 20,
        category: "drinks",
        icon: "🥤",
        image: "images/coke.png"
    },

    {
        name: "Juice",
        price: 20,
        category: "drinks",
        icon: "🧃",
        image: "images/juice.png"
    },

    {
        name: "Rose Milk",
        price: 50,
        category: "drinks",
        icon: "🥛",
        image: "images/rosemilk.png"
    },

    {
        name: "Badam Milk",
        price: 50,
        category: "drinks",
        icon: "🥛",
        image: "images/badammilk.png"
    },


    // CAKES & BISCUITS

    {
        name: "Biscuits",
        price: 30,
        category: "cakes",
        icon: "🍪",
        image: "images/biscuits.png"
    },

    {
        name: "Brownie",
        price: 50,
        category: "cakes",
        icon: "🍫",
        image: "images/bronine.png"
    },

    {
        name: "Honey Cake",
        price: 70,
        category: "cakes",
        icon: "🍯",
        image: "images/honey cake.png"
    },

    {
        name: "Pudding Cake",
        price: 60,
        category: "cakes",
        icon: "🍰",
        image: "images/pudding cake.png"
    },

    {
        name: "Banana Cake",
        price: 70,
        category: "cakes",
        icon: "🍌"
    },

    {
        name: "0.5 kg Birthday Cake",
        price: 450,
        category: "cakes",
        icon: "🎂",
        image: "images/brithday cake(0.5kg).png",
        cake: true
    }

];


// =====================================================
// LOAD PRODUCTS FROM FIREBASE
// =====================================================

async function loadProductsFromFirebase() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "products")
            );


        if (snapshot.empty) {

            console.log(
                "No Firebase products found. Using default products."
            );

            return;
        }


        products.length = 0;


        snapshot.forEach(function(doc) {

            const product =
                doc.data();


            if (
                product.available !== false
            ) {

                products.push({

                    name:
                        product.name,

                    price:
                        Number(product.price),

                    category:
                        product.category,

                    icon:
                        product.icon || "🍰",

                    image:
                        product.image || "",

                    cake:
                        product.cake === true

                });

            }

        });


        console.log(
            "✅ Products loaded from Firebase:",
            products
        );


        displayProducts();

    }

    catch (error) {

        console.error(
            "❌ Error loading products:",
            error
        );

    }

}


// =====================================================
// CART
// =====================================================

let cart = [];


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(list = products) {

    const container =
        document.getElementById("products");


    if (!container) return;


    container.innerHTML = "";


    list.forEach(function(product) {

        const originalIndex =
            products.indexOf(product);


        container.innerHTML += `

            <div class="product">

                <div class="product-icon">

                    ${
                        product.image

                        ?

                        `<img
                            src="${product.image}"
                            alt="${product.name}"
                            style="
                                width:100%;
                                height:180px;
                                object-fit:cover;
                                border-radius:10px;
                            "
                        >`

                        :

                        product.icon
                    }

                </div>


                <h3>
                    ${product.name}
                </h3>


                <p class="category">
                    ${product.category}
                </p>


                <div class="price">
                    ₹${product.price}
                </div>


                <button
                    class="add-button"
                    onclick="addToCart(${originalIndex})"
                >
                    Add to Cart +
                </button>

            </div>

        `;

    });

}


// =====================================================
// CATEGORY
// =====================================================

function showCategory(category) {

    if (category === "all") {

        displayProducts(products);

    }

    else {

        const filtered =
            products.filter(function(product) {

                return product.category === category;

            });


        displayProducts(filtered);

    }

}


// =====================================================
// SEARCH
// =====================================================

function searchProducts() {

    const input =
        document.getElementById("searchInput");


    if (!input) return;


    const search =
        input.value
        .toLowerCase()
        .trim();


    const filtered =
        products.filter(function(product) {

            return product.name
                .toLowerCase()
                .includes(search);

        });


    displayProducts(filtered);

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(index) {

    const product =
        products[index];


    if (!product) return;


    const existing =
        cart.find(function(item) {

            return item.name === product.name;

        });


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1,

            cakeMessage: "",

            instructions: ""

        });

    }


    updateCart();

    openCart();

}


// =====================================================
// UPDATE CART
// =====================================================

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");


    const cartItems =
        document.getElementById("cartItems");


    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems) return;


    let totalItems = 0;

    let totalPrice = 0;


    cartItems.innerHTML = "";


    cart.forEach(function(item, index) {

        totalItems +=
            item.quantity;


        const itemTotal =
            item.price *
            item.quantity;


        totalPrice +=
            itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                ${
                    item.image

                    ?

                    `
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        style="
                            width:65px;
                            height:65px;
                            object-fit:cover;
                            border-radius:10px;
                            margin-right:10px;
                        "
                    >
                    `

                    :

                    `
                    <div
                        style="
                            width:65px;
                            height:65px;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            font-size:30px;
                            margin-right:10px;
                        "
                    >
                        ${item.icon}
                    </div>
                    `
                }


                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    ₹${item.price}

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    ${item.quantity}

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

        `;

    });


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    if (cartCount) {

        cartCount.innerText =
            totalItems;

    }


    if (cartTotal) {

        cartTotal.innerText =
            totalPrice;

    }

}


// =====================================================
// CHANGE QUANTITY
// =====================================================

function changeQuantity(index, change) {

    if (!cart[index]) return;


    cart[index].quantity +=
        change;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    updateCart();

}


// =====================================================
// OPEN CART
// =====================================================

function openCart() {

    const modal =
        document.getElementById("cartModal");


    if (modal) {

        modal.style.display =
            "block";

    }

}


// =====================================================
// CLOSE CART
// =====================================================

function closeCart() {

    const modal =
        document.getElementById("cartModal");


    if (modal) {

        modal.style.display =
            "none";

    }

}


// =====================================================
// CHECKOUT
// =====================================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Please add an item to your cart."
        );

        return;

    }


    closeCart();


    const modal =
        document.getElementById(
            "checkoutModal"
        );


    if (modal) {

        modal.style.display =
            "block";

    }


    updateCheckoutSummary();

    updateCakeCustomization();

}


// =====================================================
// CLOSE CHECKOUT
// =====================================================

function closeCheckout() {

    const modal =
        document.getElementById(
            "checkoutModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// =====================================================
// PICKUP / DELIVERY
// =====================================================

function selectOrderType(type) {

    document.getElementById(
        "orderType"
    ).value = type;


    const pickupBtn =
        document.getElementById(
            "pickupBtn"
        );


    const deliveryBtn =
        document.getElementById(
            "deliveryBtn"
        );


    const address =
        document.getElementById(
            "address"
        );


    const addressSection =
        document.getElementById(
            "addressSection"
        );


    if (type === "Pickup") {

        pickupBtn.classList.add(
            "selected"
        );


        deliveryBtn.classList.remove(
            "selected"
        );


        addressSection.style.display =
            "none";


        address.disabled = true;

        address.value = "";

    }

    else if (
        type === "Delivery"
    ) {

        deliveryBtn.classList.add(
            "selected"
        );


        pickupBtn.classList.remove(
            "selected"
        );


        addressSection.style.display =
            "block";


        address.disabled = false;

    }


    updateCheckoutSummary();

}


// =====================================================
// ORDER SUMMARY
// =====================================================

function updateCheckoutSummary() {

    let itemsTotal = 0;


    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );


    if (!checkoutItems) return;


    checkoutItems.innerHTML = "";


    cart.forEach(function(item) {

        const itemTotal =
            item.price *
            item.quantity;


        itemsTotal +=
            itemTotal;


        checkoutItems.innerHTML += `

            <div class="summary-item">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

        `;

    });


    const orderType =
        document.getElementById(
            "orderType"
        ).value;


    let deliveryCharge = 0;


    if (
        orderType === "Delivery"
    ) {

        deliveryCharge = 30;

    }


    const grandTotal =
        itemsTotal +
        deliveryCharge;


    document.getElementById(
        "itemsTotal"
    ).innerText =
        itemsTotal;


    document.getElementById(
        "deliveryCharge"
    ).innerText =
        deliveryCharge;


    document.getElementById(
        "grandTotal"
    ).innerText =
        grandTotal;

}


// =====================================================
// CAKE CUSTOMIZATION
// =====================================================

function updateCakeCustomization() {

    const cakeSection =
        document.getElementById(
            "cakeCustomization"
        );


    if (!cakeSection) return;


    const hasCake =
        cart.some(function(item) {

            return item.cake === true;

        });


    if (hasCake) {

        cakeSection.style.display =
            "block";

    }

    else {

        cakeSection.style.display =
            "none";

    }

}


// =====================================================
// PAYMENT
// =====================================================

function selectPayment(method) {

    document.getElementById(
        "paymentMethod"
    ).value = method;


    const cashBtn =
        document.getElementById(
            "cashBtn"
        );


    const upiBtn =
        document.getElementById(
            "upiBtn"
        );


    const upiSection =
        document.getElementById(
            "upiSection"
        );


    if (method === "Cash") {

        cashBtn.classList.add(
            "selected"
        );


        upiBtn.classList.remove(
            "selected"
        );


        upiSection.style.display =
            "none";

    }

    else {

        upiBtn.classList.add(
            "selected"
        );


        cashBtn.classList.remove(
            "selected"
        );


        upiSection.style.display =
            "block";

    }

}


// =====================================================
// UPI
// =====================================================

function payUPI() {

    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price *
            item.quantity;

    });


    const orderType =
        document.getElementById(
            "orderType"
        ).value;


    if (
        orderType === "Delivery"
    ) {

        total += 30;

    }


    const upiID =
        "9025611796@nyes";


    const upiURL =
        "upi://pay?pa=" +
        upiID +
        "&pn=Kayakani%20Bakery%20%26%20Sweets" +
        "&am=" +
        total +
        "&cu=INR";


    window.location.href =
        upiURL;

}


// =====================================================
// WHATSAPP + FIRESTORE
// =====================================================

async function sendWhatsAppOrder() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const type =
        document.getElementById(
            "orderType"
        ).value;


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const payment =
        document.getElementById(
            "paymentMethod"
        ).value;


    if (!name || !phone) {

        alert(
            "Please enter your name and phone number."
        );

        return;

    }


    if (
        type === "Delivery" &&
        !address
    ) {

        alert(
            "Please enter your delivery address."
        );

        return;

    }


    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price *
            item.quantity;

    });


    let deliveryCharge = 0;


    if (
        type === "Delivery"
    ) {

        deliveryCharge = 30;

    }


    const grandTotal =
        total +
        deliveryCharge;


    const orderId =
        "KYK-" +
        Date.now();


    let cakeMessage = "";

    let cakeInstructions = "";


    const hasCake =
        cart.some(function(item) {

            return item.cake === true;

        });


    if (hasCake) {

        const messageInput =
            document.getElementById(
                "cakeMessage"
            );


        const instructionsInput =
            document.getElementById(
                "cakeInstructions"
            );


        if (messageInput) {

            cakeMessage =
                messageInput.value.trim();

        }


        if (instructionsInput) {

            cakeInstructions =
                instructionsInput.value.trim();

        }

    }


    // =================================================
    // SAVE ORDER TO FIRESTORE
    // =================================================

    try {

        await addDoc(
            collection(db, "orders"),
            {

                orderId: orderId,

                name: name,

                phone: phone,

                orderType: type,

                address:
                    type === "Delivery"
                        ? address
                        : "",

                payment: payment,

                items:
                    cart.map(function(item) {

                        return {

                            name:
                                item.name,

                            price:
                                item.price,

                            quantity:
                                item.quantity

                        };

                    }),

                itemsTotal:
                    total,

                deliveryCharge:
                    deliveryCharge,

                grandTotal:
                    grandTotal,

                cakeMessage:
                    cakeMessage,

                cakeInstructions:
                    cakeInstructions,

                status:
                    "New",

                createdAt:
                    serverTimestamp()

            }
        );


        console.log(
            "Order saved successfully to Firestore."
        );

    }

    catch (error) {

        console.error(
            "Error saving order:",
            error
        );


        alert(
            "Unable to save the order. Please try again."
        );


        return;

    }


    // =================================================
    // WHATSAPP MESSAGE
    // =================================================

    let message =
        "KAYAKANI BAKERY & SWEETS\n\n";


    message +=
        "NEW ORDER\n\n";


    message +=
        "Order ID: " +
        orderId +
        "\n";


    message +=
        "Name: " +
        name +
        "\n";


    message +=
        "Phone: " +
        phone +
        "\n";


    message +=
        "Order Type: " +
        type +
        "\n";


    if (
        type === "Delivery"
    ) {

        message +=
            "Address: " +
            address +
            "\n";

    }


    message +=
        "Payment: " +
        payment +
        "\n";


    message +=
        "\nITEMS:\n";


    cart.forEach(function(item) {

        const itemTotal =
            item.price *
            item.quantity;


        message +=
            item.name +
            " x " +
            item.quantity +
            " = Rs." +
            itemTotal +
            "\n";

    });


    message +=
        "\nItems Total: Rs." +
        total;


    message +=
        "\nDelivery Charge: Rs." +
        deliveryCharge;


    if (
        cakeMessage !== ""
    ) {

        message +=
            "\nCake Message: " +
            cakeMessage;

    }


    if (
        cakeInstructions !== ""
    ) {

        message +=
            "\nSpecial Instructions: " +
            cakeInstructions;

    }


    message +=
        "\n\nTOTAL: Rs." +
        grandTotal;


    // =================================================
    // WHATSAPP NUMBER
    // =================================================

    const bakeryNumber =
        "919025611796";


    const whatsappURL =
        "https://wa.me/" +
        bakeryNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );


    // =================================================
    // CONFIRMATION
    // =================================================

    const confirmationOrderId =
        document.getElementById(
            "orderId"
        );


    if (confirmationOrderId) {

        confirmationOrderId.innerText =
            orderId;

    }


    const confirmationModal =
        document.getElementById(
            "confirmationModal"
        );


    if (confirmationModal) {

        confirmationModal.style.display =
            "block";

    }

}


// =====================================================
// START
// =====================================================

displayProducts();

updateCart();

selectOrderType("Pickup");

selectPayment("Cash");


// =====================================================
// CLOSE CONFIRMATION
// =====================================================

function closeConfirmation() {

    const confirmationModal =
        document.getElementById(
            "confirmationModal"
        );


    if (confirmationModal) {

        confirmationModal.style.display =
            "none";

    }


    cart = [];

    updateCart();

    closeCheckout();

}


// =====================================================
// START FIREBASE PRODUCT LOADING
// =====================================================

loadProductsFromFirebase();
