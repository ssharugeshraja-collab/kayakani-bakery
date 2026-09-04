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

    apiKey: "AIzaSyCuy68o-h0dcAVO7cg183xlQnBpttp2gAs",

    authDomain: "kayakani-bakery.firebaseapp.com",

    projectId: "kayakani-bakery",

    storageBucket: "kayakani-bakery.firebasestorage.app",

    messagingSenderId: "861879891216",

    appId: "1:861879891216:web:a9c91ee27859ef9ef62195"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// =====================================================
// DEFAULT PRODUCTS
// =====================================================

const defaultProducts = [

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


    // BREAD

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


    // MIXTURE

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


    // CAKES

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
        icon: "🍌",
        image: ""
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
// PRODUCTS
// =====================================================

let products = [...defaultProducts];


// =====================================================
// CART
// =====================================================

let cart = [];


// =====================================================
// LOAD FIREBASE PRODUCTS
// =====================================================

async function loadProductsFromFirebase() {

    try {

        console.log("🔄 Loading products from Firebase...");

        const snapshot =
            await getDocs(collection(db, "products"));


        console.log(
            "Firebase product count:",
            snapshot.size
        );


        // If Firebase has no products,
        // keep the default products.

        if (snapshot.empty) {

            console.log(
                "ℹ️ No Firebase products. Using default products."
            );

            displayProducts();

            return;
        }


        // Add/update Firebase products
        // WITHOUT deleting existing products.

        snapshot.forEach(function(doc) {

            const data = doc.data();

            if (data.available === false) {
                return;
            }


            const firebaseProduct = {

                name: data.name || "Product",

                price: Number(data.price) || 0,

                category:
                    String(
                        data.category || ""
                    ).toLowerCase(),

                icon:
                    data.icon || "🍰",

                image:
                    data.image || "",

                cake:
                    data.cake === true

            };


            // Check whether product already exists

            const existingIndex =
                products.findIndex(function(product) {

                    return product.name.toLowerCase() ===
                           firebaseProduct.name.toLowerCase();

                });


            if (existingIndex >= 0) {

                // Update existing product

                products[existingIndex] =
                    firebaseProduct;

            } else {

                // Add new product

                products.push(
                    firebaseProduct
                );

            }

        });


        console.log(
            "✅ Products loaded:",
            products
        );


        displayProducts();


    } catch (error) {

        console.error(
            "❌ Firebase product error:",
            error
        );

        // Keep default products if Firebase fails

        displayProducts();

    }

}


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(list = products) {

    const container =
        document.getElementById("products");


    if (!container) {

        console.error(
            "❌ Cannot find #products in index.html"
        );

        return;
    }


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;">
                No products available.
            </p>
        `;

        return;
    }


    list.forEach(function(product) {

        const originalIndex =
            products.indexOf(product);


        let productVisual;


        if (product.image) {

            productVisual = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    style="
                        width:100%;
                        height:180px;
                        object-fit:cover;
                        border-radius:10px;
                    "
                    onerror="this.style.display='none';"
                >

            `;

        } else {

            productVisual = `

                <div
                    style="
                        font-size:60px;
                        text-align:center;
                        padding:40px 0;
                    "
                >
                    ${product.icon}
                </div>

            `;

        }


        container.innerHTML += `

            <div class="product">

                <div class="product-icon">

                    ${productVisual}

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

    category =
        String(category).toLowerCase();


    if (category === "all") {

        displayProducts(products);

        return;
    }


    const filtered =
        products.filter(function(product) {

            return String(product.category)
                .toLowerCase() === category;

        });


    displayProducts(filtered);

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


    if (!product) {

        console.error(
            "Product not found:",
            index
        );

        return;
    }


    const existing =
        cart.find(function(item) {

            return item.name === product.name;

        });


    if (existing) {

        existing.quantity++;

    } else {

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


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(function(item) {

        totalItems +=
            item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    if (cartCount) {

        cartCount.innerText =
            totalItems;

    }


    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    cart.forEach(function(item, index) {

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    ${
                        item.image

                        ?

                        `<img
                            src="${item.image}"
                            alt="${item.name}"
                            style="
                                width:65px;
                                height:65px;
                                object-fit:cover;
                                border-radius:10px;
                            "
                        >`

                        :

                        `<div
                            style="
                                font-size:35px;
                            "
                        >
                            ${item.icon}
                        </div>`
                    }

                </div>


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


    if (cart[index].quantity <= 0) {

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

    const orderType =
        document.getElementById("orderType");

    const pickupBtn =
        document.getElementById("pickupBtn");

    const deliveryBtn =
        document.getElementById("deliveryBtn");

    const address =
        document.getElementById("address");

    const addressSection =
        document.getElementById("addressSection");


    if (orderType) {

        orderType.value = type;

    }


    if (type === "Pickup") {

        if (pickupBtn)
            pickupBtn.classList.add("selected");

        if (deliveryBtn)
            deliveryBtn.classList.remove("selected");

        if (addressSection)
            addressSection.style.display = "none";

        if (address) {

            address.disabled = true;

            address.value = "";

        }

    }


    if (type === "Delivery") {

        if (deliveryBtn)
            deliveryBtn.classList.add("selected");

        if (pickupBtn)
            pickupBtn.classList.remove("selected");

        if (addressSection)
            addressSection.style.display = "block";

        if (address)
            address.disabled = false;

    }


    updateCheckoutSummary();

}


// =====================================================
// CHECKOUT SUMMARY
// =====================================================

function updateCheckoutSummary() {

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );


    if (!checkoutItems) return;


    checkoutItems.innerHTML = "";


    let itemsTotal = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


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
        );


    const deliveryCharge =
        orderType &&
        orderType.value === "Delivery"
            ? 30
            : 0;


    const grandTotal =
        itemsTotal +
        deliveryCharge;


    const itemsTotalElement =
        document.getElementById(
            "itemsTotal"
        );


    const deliveryElement =
        document.getElementById(
            "deliveryCharge"
        );


    const grandTotalElement =
        document.getElementById(
            "grandTotal"
        );


    if (itemsTotalElement)
        itemsTotalElement.innerText =
            itemsTotal;


    if (deliveryElement)
        deliveryElement.innerText =
            deliveryCharge;


    if (grandTotalElement)
        grandTotalElement.innerText =
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


    cakeSection.style.display =
        hasCake ? "block" : "none";

}


// =====================================================
// PAYMENT
// =====================================================

function selectPayment(method) {

    const paymentMethod =
        document.getElementById(
            "paymentMethod"
        );


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


    if (paymentMethod)
        paymentMethod.value = method;


    if (method === "Cash") {

        if (cashBtn)
            cashBtn.classList.add("selected");

        if (upiBtn)
            upiBtn.classList.remove("selected");

        if (upiSection)
            upiSection.style.display = "none";

    } else {

        if (upiBtn)
            upiBtn.classList.add("selected");

        if (cashBtn)
            cashBtn.classList.remove("selected");

        if (upiSection)
            upiSection.style.display = "block";

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
        );


    if (
        orderType &&
        orderType.value === "Delivery"
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
// SEND ORDER
// =====================================================

async function sendWhatsAppOrder() {

    const nameElement =
        document.getElementById(
            "customerName"
        );


    const phoneElement =
        document.getElementById(
            "customerPhone"
        );


    const typeElement =
        document.getElementById(
            "orderType"
        );


    const addressElement =
        document.getElementById(
            "address"
        );


    const paymentElement =
        document.getElementById(
            "paymentMethod"
        );


    const name =
        nameElement
            ? nameElement.value.trim()
            : "";


    const phone =
        phoneElement
            ? phoneElement.value.trim()
            : "";


    const type =
        typeElement
            ? typeElement.value
            : "Pickup";


    const address =
        addressElement
            ? addressElement.value.trim()
            : "";


    const payment =
        paymentElement
            ? paymentElement.value
            : "Cash";


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


    const deliveryCharge =
        type === "Delivery"
            ? 30
            : 0;


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


        if (messageInput)
            cakeMessage =
                messageInput.value.trim();


        if (instructionsInput)
            cakeInstructions =
                instructionsInput.value.trim();

    }


    // SAVE TO FIRESTORE

    try {

        await addDoc(
            collection(db, "orders"),
            {

                orderId,

                name,

                phone,

                orderType: type,

                address:
                    type === "Delivery"
                        ? address
                        : "",

                payment,

                items:
                    cart.map(function(item) {

                        return {

                            name: item.name,

                            price: item.price,

                            quantity: item.quantity

                        };

                    }),

                itemsTotal:
                    total,

                deliveryCharge,

                grandTotal,

                cakeMessage,

                cakeInstructions,

                status: "New",

                createdAt:
                    serverTimestamp()

            }
        );


        console.log(
            "✅ Order saved to Firestore"
        );


    } catch (error) {

        console.error(
            "❌ Order saving error:",
            error
        );


        alert(
            "Unable to save the order. Please try again."
        );

        return;

    }


    // WHATSAPP

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


    if (type === "Delivery") {

        message +=
            "Address: " +
            address +
            "\n";

    }


    message +=
        "Payment: " +
        payment +
        "\n\n";


    message +=
        "ITEMS:\n";


    cart.forEach(function(item) {

        message +=
            item.name +
            " x " +
            item.quantity +
            " = Rs." +
            (
                item.price *
                item.quantity
            ) +
            "\n";

    });


    message +=
        "\nItems Total: Rs." +
        total;


    message +=
        "\nDelivery Charge: Rs." +
        deliveryCharge;


    if (cakeMessage) {

        message +=
            "\nCake Message: " +
            cakeMessage;

    }


    if (cakeInstructions) {

        message +=
            "\nSpecial Instructions: " +
            cakeInstructions;

    }


    message +=
        "\n\nTOTAL: Rs." +
        grandTotal;


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


    // CONFIRMATION

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
// MAKE FUNCTIONS AVAILABLE TO HTML
// =====================================================

window.showCategory =
    showCategory;

window.searchProducts =
    searchProducts;

window.addToCart =
    addToCart;

window.changeQuantity =
    changeQuantity;

window.updateCart =
    updateCart;

window.openCart =
    openCart;

window.closeCart =
    closeCart;

window.checkout =
    checkout;

window.closeCheckout =
    closeCheckout;

window.selectOrderType =
    selectOrderType;

window.selectPayment =
    selectPayment;

window.payUPI =
    payUPI;

window.sendWhatsAppOrder =
    sendWhatsAppOrder;

window.closeConfirmation =
    closeConfirmation;


// =====================================================
// START
// =====================================================

displayProducts();

updateCart();

selectOrderType("Pickup");

selectPayment("Cash");


// =====================================================
// LOAD FIREBASE PRODUCTS
// =====================================================

loadProductsFromFirebase();
