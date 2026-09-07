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
// BAKERY PRODUCTS
// =====================================================

let products = [

    // Tea & Coffee
    {
        name: "Tea Parcel",
        price: 40,
        category: "Tea & Coffee",
        image: "images/tea.png",
        icon: "☕"
    },

    {
        name: "Coffee Parcel",
        price: 40,
        category: "Tea & Coffee",
        image: "images/coffe.png",
        icon: "☕"
    },

    {
        name: "Black Tea Parcel",
        price: 40,
        category: "Tea & Coffee",
        image: "images/black tea.png",
        icon: "🍵"
    },


    // Snacks
    {
        name: "Vada",
        price: 10,
        category: "Snacks",
        image: "images/vada.png",
        icon: "🍩"
    },

    {
        name: "Samosa",
        price: 10,
        category: "Snacks",
        image: "images/samosa.png",
        icon: "🥟"
    },

    {
        name: "Bonda",
        price: 10,
        category: "Snacks",
        image: "images/bonda.png",
        icon: "🥯"
    },

    {
        name: "Bajji",
        price: 10,
        category: "Snacks",
        image: "images/bajji.png",
        icon: "🥞"
    },

    {
        name: "Veg Puff",
        price: 20,
        category: "Snacks",
        image: "images/veg puff.png",
        icon: "🥐"
    },

    {
        name: "Egg Puff",
        price: 30,
        category: "Snacks",
        image: "images/egg puff.png",
        icon: "🥐"
    },

    {
        name: "Mushroom Puff",
        price: 30,
        category: "Snacks",
        image: "images/mushroom puff.png",
        icon: "🥐"
    },


    // Buns & Bread
    {
        name: "Cream Bun",
        price: 25,
        category: "Buns & Bread",
        image: "images/creambun.png",
        icon: "🍞"
    },

    {
        name: "Tea Bun",
        price: 10,
        category: "Buns & Bread",
        image: "images/teabun.png",
        icon: "🍞"
    },

    {
        name: "Bread",
        price: 45,
        category: "Buns & Bread",
        image: "images/bread.png",
        icon: "🍞"
    },


    // Mixture
    {
        name: "Mixture 100g",
        price: 40,
        category: "Mixture",
        image: "images/mixture-100g.png",
        icon: "🥜"
    },

    {
        name: "Mixture 250g",
        price: 90,
        category: "Mixture",
        image: "images/mixture-250g.png",
        icon: "🥜"
    },

    {
        name: "Mixture 500g",
        price: 170,
        category: "Mixture",
        image: "images/mixture-500g.png",
        icon: "🥜"
    },

    {
        name: "Sevu 100g",
        price: 40,
        category: "Mixture",
        image: "images/sevu-100g.png",
        icon: "🥨"
    },


    // Sweets
    {
        name: "Normal Sweets",
        price: 150,
        category: "Sweets",
        image: "images/normal sweets-250g.png",
        icon: "🍬"
    },

    {
        name: "Milk Sweets",
        price: 250,
        category: "Sweets",
        image: "images/milk sweets.png",
        icon: "🍬"
    },


    // Drinks
    {
        name: "Coke",
        price: 20,
        category: "Drinks",
        image: "images/coke.png",
        icon: "🥤"
    },

    {
        name: "Juice",
        price: 20,
        category: "Drinks",
        image: "images/juice.png",
        icon: "🧃"
    },

    {
        name: "Rose Milk",
        price: 50,
        category: "Drinks",
        image: "images/rosemilk.png",
        icon: "🥛"
    },

    {
        name: "Badam Milk",
        price: 50,
        category: "Drinks",
        image: "images/badammilk.png",
        icon: "🥛"
    },


    // Cakes
    {
        name: "Biscuits",
        price: 30,
        category: "Cakes",
        image: "images/biscuits.png",
        icon: "🍪"
    },

    {
        name: "Brownie",
        price: 50,
        category: "Cakes",
        image: "images/bronine.png",
        icon: "🍫"
    },

    {
        name: "Honey Cake",
        price: 70,
        category: "Cakes",
        image: "images/honey cake.png",
        icon: "🍰"
    },

    {
        name: "Pudding Cake",
        price: 60,
        category: "Cakes",
        image: "images/pudding cake.png",
        icon: "🍰"
    },

    {
        name: "Banana Cake",
        price: 70,
        category: "Cakes",
        image: "images/Banana cake.jpeg",
        icon: "🍌"
    },

    {
        name: "Birthday Cake",
        price: 450,
        category: "Cakes",
        image: "images/brithday cake(0.5kg).png",
        icon: "🎂",
        cake: true
    }
];


// =====================================================
// CART
// =====================================================

let cart = [];

let selectedOrderType = "Pickup";

let selectedPayment = "Cash";


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(list = products) {

    const container = document.getElementById("products");

    if (!container) {
        console.error("Products container not found.");
        return;
    }

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <div style="
                width:100%;
                text-align:center;
                padding:30px;
                font-size:18px;
            ">
                No products found.
            </div>
        `;

        return;
    }


    list.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";


        // IMPORTANT:
        // Find the real product index
        // inside the main products array.

        const realIndex = products.indexOf(product);


        let imageHTML = "";

        if (product.image) {

            imageHTML = `
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.style.display='none';"
                >
            `;

        } else {

            imageHTML = `
                <div style="
                    font-size:70px;
                    text-align:center;
                    padding:20px;
                ">
                    ${product.icon || "🍰"}
                </div>
            `;
        }


        card.innerHTML = `

            <div class="product-image">
                ${imageHTML}
            </div>

            <div class="product-info">

                <h3>
                    ${product.icon || "🍰"}
                    ${product.name}
                </h3>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart(${realIndex})"
                >
                    Add to Cart
                </button>

            </div>
        `;


        container.appendChild(card);

    });

}


// =====================================================
// CATEGORY FILTER
// =====================================================

window.showCategory = function(category) {

    if (!category ||
        category.toLowerCase() === "all") {

        displayProducts(products);

        return;
    }


    const categoryMap = {

        tea: "Tea & Coffee",

        snacks: "Snacks",

        bread: "Buns & Bread",

        mixture: "Mixture",

        sweets: "Sweets",

        drinks: "Drinks",

        cakes: "Cakes"

    };


    const wantedCategory =
        categoryMap[category.toLowerCase()] || category;


    const filtered =
        products.filter(function(product) {

            return product.category &&
                product.category.toLowerCase() ===
                wantedCategory.toLowerCase();

        });


    displayProducts(filtered);

};


// =====================================================
// SEARCH
// =====================================================

window.searchProducts = function() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;


    const search =
        input.value.trim().toLowerCase();


    if (search === "") {

        displayProducts(products);

        return;
    }


    const filtered =
        products.filter(function(product) {

            return product.name
                .toLowerCase()
                .includes(search);

        });


    displayProducts(filtered);

};


// =====================================================
// ADD TO CART
// =====================================================

window.addToCart = function(index) {

    const product = products[index];

    if (!product) {

        console.error("Product not found:", index);

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

            name: product.name,

            price: Number(product.price),

            quantity: 1,

            cake: product.cake === true,

            cakeMessage: "",

            instructions: ""

        });

    }


    updateCart();


    alert(
        product.name +
        " added to cart!"
    );

};


// =====================================================
// UPDATE CART
// =====================================================

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        const count =
            cart.reduce(function(total, item) {

                return total + item.quantity;

            }, 0);


        cartCount.innerText = count;

    }


    const cartItems =
        document.getElementById("cartItems");


    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        updateCartTotal();

        return;
    }


    cart.forEach(function(item, index) {

        const div =
            document.createElement("div");

        div.className = "cart-item";


        const itemTotal =
            item.price * item.quantity;


        div.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <br>

                <span>
                    ₹${item.price} × ${item.quantity}
                </span>

                <br>

                <button
                    type="button"
                    onclick="changeQuantity(${index}, -1)"
                >
                    −
                </button>

                <button
                    type="button"
                    onclick="changeQuantity(${index}, 1)"
                >
                    +
                </button>

                <button
                    type="button"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

            <strong>
                ₹${itemTotal}
            </strong>

        `;


        cartItems.appendChild(div);

    });


    updateCartTotal();

}


// =====================================================
// CHANGE QUANTITY
// =====================================================

window.changeQuantity = function(index, change) {

    if (!cart[index]) return;


    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

    updateCheckoutSummary();

};


// =====================================================
// REMOVE FROM CART
// =====================================================

window.removeFromCart = function(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);


    updateCart();

    updateCheckoutSummary();

};


// =====================================================
// CART TOTAL
// =====================================================

function updateCartTotal() {

    const total =
        cart.reduce(function(sum, item) {

            return sum +
                item.price * item.quantity;

        }, 0);


    const cartTotal =
        document.getElementById("cartTotal");


    if (cartTotal) {

        // IMPORTANT:
        // Do NOT add ₹ here because
        // HTML already contains ₹.

        cartTotal.innerText = total;

    }

}


// =====================================================
// OPEN CART
// =====================================================

window.openCart = function() {

    const cartModal =
        document.getElementById("cartModal");


    if (cartModal) {

        cartModal.style.display = "flex";

    }

};


// =====================================================
// CLOSE CART
// =====================================================

window.closeCart = function() {

    const cartModal =
        document.getElementById("cartModal");


    if (cartModal) {

        cartModal.style.display = "none";

    }

};


// =====================================================
// CHECKOUT
// =====================================================

window.checkout = function() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    closeCart();


    const checkoutModal =
        document.getElementById("checkoutModal");


    if (checkoutModal) {

        checkoutModal.style.display = "flex";

    }


    // Default to Pickup
    selectOrderType("Pickup");

    // Default to Cash
    selectPayment("Cash");


    updateCheckoutSummary();

};


// =====================================================
// CLOSE CHECKOUT
// =====================================================

window.closeCheckout = function() {

    const checkoutModal =
        document.getElementById("checkoutModal");


    if (checkoutModal) {

        checkoutModal.style.display = "none";

    }

};


// =====================================================
// ORDER TYPE
// =====================================================

window.selectOrderType = function(type) {

    selectedOrderType = type;


    const pickupBtn =
        document.getElementById("pickupBtn");


    const deliveryBtn =
        document.getElementById("deliveryBtn");


    const orderTypeInput =
        document.getElementById("orderType");


    const addressSection =
        document.getElementById("addressSection");


    const addressInput =
        document.getElementById("address");


    // Hidden input

    if (orderTypeInput) {

        orderTypeInput.value = type;

    }


    // Pickup button

    if (pickupBtn) {

        pickupBtn.classList.toggle(
            "selected",
            type === "Pickup"
        );

    }


    // Delivery button

    if (deliveryBtn) {

        deliveryBtn.classList.toggle(
            "selected",
            type === "Delivery"
        );

    }


    // Address

    if (addressSection) {

        addressSection.style.display =
            type === "Delivery"
                ? "block"
                : "none";

    }


    if (addressInput) {

        addressInput.disabled =
            type !== "Delivery";

    }


    updateCheckoutSummary();

};


// =====================================================
// PAYMENT
// =====================================================

window.selectPayment = function(payment) {

    selectedPayment = payment;


    const cashBtn =
        document.getElementById("cashBtn");


    const upiBtn =
        document.getElementById("upiBtn");


    const paymentInput =
        document.getElementById("paymentMethod");


    const upiSection =
        document.getElementById("upiSection");


    // Hidden input

    if (paymentInput) {

        paymentInput.value = payment;

    }


    // Cash button

    if (cashBtn) {

        cashBtn.classList.toggle(
            "selected",
            payment === "Cash"
        );

    }


    // UPI button

    if (upiBtn) {

        upiBtn.classList.toggle(
            "selected",
            payment === "UPI"
        );

    }


    // UPI information

    if (upiSection) {

        upiSection.style.display =
            payment === "UPI"
                ? "block"
                : "none";

    }

};


// =====================================================
// CHECKOUT SUMMARY
// =====================================================

function updateCheckoutSummary() {

    const itemsTotal =
        cart.reduce(function(sum, item) {

            return sum +
                item.price * item.quantity;

        }, 0);


    const deliveryCharge =
        selectedOrderType === "Delivery"
            ? 30
            : 0;


    const grandTotal =
        itemsTotal + deliveryCharge;


    // -----------------------------------------------
    // CHECKOUT ITEMS
    // -----------------------------------------------

    const checkoutItems =
        document.getElementById("checkoutItems");


    if (checkoutItems) {

        checkoutItems.innerHTML = "";


        cart.forEach(function(item) {

            const row =
                document.createElement("div");


            row.className =
                "checkout-item";


            row.innerHTML = `

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

            `;


            checkoutItems.appendChild(row);

        });

    }


    // -----------------------------------------------
    // ITEMS TOTAL
    // -----------------------------------------------

    const itemsTotalElement =
        document.getElementById("itemsTotal");


    if (itemsTotalElement) {

        itemsTotalElement.innerText =
            itemsTotal;

    }


    // -----------------------------------------------
    // DELIVERY CHARGE
    // -----------------------------------------------

    const deliveryChargeElement =
        document.getElementById("deliveryCharge");


    if (deliveryChargeElement) {

        deliveryChargeElement.innerText =
            deliveryCharge;

    }


    // -----------------------------------------------
    // GRAND TOTAL
    // -----------------------------------------------

    const grandTotalElement =
        document.getElementById("grandTotal");


    if (grandTotalElement) {

        grandTotalElement.innerText =
            grandTotal;

    }


    // -----------------------------------------------
    // CAKE CUSTOMIZATION
    // -----------------------------------------------

    const cakeCustomization =
        document.getElementById("cakeCustomization");


    if (cakeCustomization) {

        const hasCake =
            cart.some(function(item) {

                return item.cake === true;

            });


        cakeCustomization.style.display =
            hasCake
                ? "block"
                : "none";

    }

}


// =====================================================
// CAKE CUSTOMIZATION
// =====================================================

window.updateCakeCustomization = function() {

    const messageInput =
        document.getElementById("cakeMessage");


    const instructionInput =
        document.getElementById("cakeInstructions");


    cart.forEach(function(item) {

        if (item.cake === true) {

            item.cakeMessage =
                messageInput
                    ? messageInput.value.trim()
                    : "";


            item.instructions =
                instructionInput
                    ? instructionInput.value.trim()
                    : "";

        }

    });

};


// =====================================================
// UPI PAYMENT
// =====================================================

window.payUPI = function() {

    // Select UPI

    selectPayment("UPI");


    const upiId =
        "9025611796@nyes";


    const itemsTotal =
        cart.reduce(function(sum, item) {

            return sum +
                item.price * item.quantity;

        }, 0);


    const deliveryCharge =
        selectedOrderType === "Delivery"
            ? 30
            : 0;


    const total =
        itemsTotal + deliveryCharge;


    const upiURL =
        "upi://pay?pa=" +
        encodeURIComponent(upiId) +

        "&pn=" +
        encodeURIComponent(
            "Kayakani Bakery"
        ) +

        "&am=" +
        total +

        "&cu=INR";


    window.location.href =
        upiURL;

};


// =====================================================
// SEND WHATSAPP ORDER
// =====================================================

window.sendWhatsAppOrder = async function() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    // -----------------------------------------------
    // CUSTOMER INPUTS
    // -----------------------------------------------

    const nameInput =
        document.getElementById("customerName");


    const phoneInput =
        document.getElementById("customerPhone");


    const addressInput =
        document.getElementById("address");


    const name =
        nameInput
            ? nameInput.value.trim()
            : "";


    const phone =
        phoneInput
            ? phoneInput.value.trim()
            : "";


    const address =
        addressInput
            ? addressInput.value.trim()
            : "";


    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (name === "") {

        alert(
            "Please enter your name."
        );

        if (nameInput) {
            nameInput.focus();
        }

        return;
    }


    if (phone === "") {

        alert(
            "Please enter your phone number."
        );

        if (phoneInput) {
            phoneInput.focus();
        }

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        if (phoneInput) {
            phoneInput.focus();
        }

        return;
    }


    if (
        selectedOrderType === "Delivery" &&
        address === ""
    ) {

        alert(
            "Please enter your delivery address."
        );

        if (addressInput) {
            addressInput.focus();
        }

        return;
    }


    // -----------------------------------------------
    // ORDER ID
    // -----------------------------------------------

    const orderId =
        "KYK-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    // -----------------------------------------------
    // TOTALS
    // -----------------------------------------------

    const itemsTotal =
        cart.reduce(function(sum, item) {

            return sum +
                item.price * item.quantity;

        }, 0);


    const deliveryCharge =
        selectedOrderType === "Delivery"
            ? 30
            : 0;


    const grandTotal =
        itemsTotal + deliveryCharge;


    // -----------------------------------------------
    // CAKE DETAILS
    // -----------------------------------------------

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


    // -----------------------------------------------
    // SAVE ORDER TO FIREBASE
    // -----------------------------------------------

    try {

        await addDoc(
            collection(db, "orders"),
            {

                orderId: orderId,

                name: name,

                phone: phone,

                orderType:
                    selectedOrderType,

                address:
                    selectedOrderType === "Delivery"
                        ? address
                        : "",

                payment:
                    selectedPayment,

                items:
                    cart.map(function(item) {

                        return {

                            name: item.name,

                            price: item.price,

                            quantity: item.quantity

                        };

                    }),

                itemsTotal:
                    itemsTotal,

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
            "✅ Order saved:",
            orderId
        );


    } catch (error) {

        console.error(
            "❌ Firebase order error:",
            error
        );


        alert(
            "Order could not be saved. Please try again."
        );


        return;

    }


    // -----------------------------------------------
    // WHATSAPP MESSAGE
    // -----------------------------------------------

    let message =
        "🧁 *KAYAKANI BAKERY & SWEETS*%0A%0A";


    message +=
        "*Order ID:* " +
        encodeURIComponent(orderId) +
        "%0A";


    message +=
        "*Customer:* " +
        encodeURIComponent(name) +
        "%0A";


    message +=
        "*Phone:* " +
        encodeURIComponent(phone) +
        "%0A";


    message +=
        "*Order Type:* " +
        encodeURIComponent(
            selectedOrderType
        ) +
        "%0A";


    message +=
        "*Payment:* " +
        encodeURIComponent(
            selectedPayment
        ) +
        "%0A%0A";


    message +=
        "*Items:*%0A";


    cart.forEach(function(item) {

        message +=
            encodeURIComponent(
                item.name +
                " × " +
                item.quantity +
                " = ₹" +
                (
                    item.price *
                    item.quantity
                )
            ) +
            "%0A";

    });


    message +=
        "%0A*Items Total:* ₹" +
        itemsTotal;


    if (
        selectedOrderType === "Delivery"
    ) {

        message +=
            "%0A*Delivery Charge:* ₹30";


        message +=
            "%0A*Address:* " +
            encodeURIComponent(address);

    }


    message +=
        "%0A*Grand Total:* ₹" +
        grandTotal;


    if (cakeMessage !== "") {

        message +=
            "%0A%0A🎂 *Cake Message:* " +
            encodeURIComponent(
                cakeMessage
            );

    }


    if (cakeInstructions !== "") {

        message +=
            "%0A*Cake Instructions:* " +
            encodeURIComponent(
                cakeInstructions
            );

    }


    // -----------------------------------------------
    // WHATSAPP NUMBER
    // -----------------------------------------------

    const whatsappNumber =
        "919025611796";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    // -----------------------------------------------
    // CLEAR CART
    // -----------------------------------------------

    cart = [];

    updateCart();


    // -----------------------------------------------
    // CLOSE CHECKOUT
    // -----------------------------------------------

    closeCheckout();


    // -----------------------------------------------
    // CONFIRMATION
    // -----------------------------------------------

    const confirmationModal =
        document.getElementById(
            "confirmationModal"
        );


    const confirmationOrderId =
        document.getElementById(
            "orderId"
        );


    if (confirmationOrderId) {

        confirmationOrderId.innerText =
            orderId;

    }


    if (confirmationModal) {

        confirmationModal.style.display =
            "flex";

    }


    // -----------------------------------------------
    // OPEN WHATSAPP
    // -----------------------------------------------

    window.open(
        whatsappURL,
        "_blank"
    );

};


// =====================================================
// CLOSE CONFIRMATION
// =====================================================

window.closeConfirmation = function() {

    const confirmationModal =
        document.getElementById(
            "confirmationModal"
        );


    if (confirmationModal) {

        confirmationModal.style.display =
            "none";

    }

};


// =====================================================
// LOAD PRODUCTS FROM FIREBASE
// =====================================================

async function loadProductsFromFirebase() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "products")
            );


        snapshot.forEach(function(doc) {

            const data = doc.data();


            if (data.available === false) {

                return;

            }


            if (!data.name) {

                return;

            }


            let image =
                data.image || "";


            if (
                image &&
                !image.startsWith("http") &&
                !image.startsWith("images/")
            ) {

                image =
                    "images/" +
                    image.replace(
                        /^\/+/,
                        ""
                    );

            }


            const firebaseProduct = {

                name:
                    data.name,

                price:
                    Number(data.price) || 0,

                category:
                    data.category ||
                    "Snacks",

                image:
                    image,

                icon:
                    data.icon ||
                    "🍰",

                cake:
                    data.cake === true

            };


            const existingIndex =
                products.findIndex(
                    function(product) {

                        return product.name
                            .toLowerCase() ===
                            firebaseProduct.name
                                .toLowerCase();

                    }
                );


            if (existingIndex !== -1) {

                products[existingIndex] =
                    firebaseProduct;

            } else {

                products.push(
                    firebaseProduct
                );

            }

        });


        displayProducts(products);


        console.log(
            "✅ Products loaded:",
            products.length
        );


    } catch (error) {

        console.error(
            "❌ Could not load Firebase products:",
            error
        );


        // Default products still show

        displayProducts(products);

    }

};


// =====================================================
// START WEBSITE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "🍰 Kayakani Bakery website started"
        );


        displayProducts();


        updateCart();


        selectOrderType(
            "Pickup"
        );


        selectPayment(
            "Cash"
        );


        loadProductsFromFirebase();

    }
);
