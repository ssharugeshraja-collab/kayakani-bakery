// =====================================================
// KAYAKANI BAKERY & SWEETS - COMPLETE JAVASCRIPT
// =====================================================

// FIREBASE
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    setDoc,
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
// PRODUCTS
// =====================================================

let products = [
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
// CART VARIABLES
// =====================================================

let cart = [];
let selectedOrderType = "Pickup";
let selectedPayment = "Cash";

// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(list = products) {
    list = list.filter(product => product.available !== false);

    const container = document.getElementById("products");
    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const index = products.indexOf(product);

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
            imageHTML = `<div>${product.icon || "🍰"}</div>`;
        }

        card.innerHTML = `
            <div class="product-image">
                ${imageHTML}
            </div>

            <div class="product-info">
                <h3>${product.icon || "🍰"} ${product.name}</h3>

                <p class="price">₹${product.price}</p>

                <button
                    class="add-btn"
                    onclick="addToCart(${index})"
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
    if (!category || category.toLowerCase() === "all") {
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

    const wanted = categoryMap[category.toLowerCase()] || category;

    const filtered = products.filter(product =>
        product.category &&
        product.category.toLowerCase() === wanted.toLowerCase()
    );

    displayProducts(filtered);
};

// =====================================================
// SEARCH PRODUCTS
// =====================================================

window.searchProducts = function() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const search = input.value.trim().toLowerCase();

    if (!search) {
        displayProducts(products);
        return;
    }

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    displayProducts(filtered);
};

// =====================================================
// ADD TO CART
// =====================================================

window.addToCart = function(index) {
    const product = products[index];

    if (!product) return;

    if (product.available === false) {
        alert("This product is unavailable.");
        return;
    }

    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: Number(product.price),
            quantity: 1,
            cake: product.cake === true
        });
    }

    updateCart();
    alert(product.name + " added to cart!");
};

// =====================================================
// UPDATE CART
// =====================================================

function updateCart() {
    const countElement = document.getElementById("cartCount");

    if (countElement) {
        countElement.innerText = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        updateCartTotal();
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <span>₹${item.price} × ${item.quantity}</span><br>

                <button onclick="changeQuantity(${index}, -1)">−</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>

            <strong>₹${item.price * item.quantity}</strong>
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
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const element = document.getElementById("cartTotal");

    if (element) {
        element.innerText = total;
    }
}

// =====================================================
// OPEN AND CLOSE CART
// =====================================================

window.openCart = function() {
    const modal = document.getElementById("cartModal");
    if (modal) modal.style.display = "flex";
};

window.closeCart = function() {
    const modal = document.getElementById("cartModal");
    if (modal) modal.style.display = "none";
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

    const modal = document.getElementById("checkoutModal");
    if (modal) modal.style.display = "flex";

    selectOrderType("Pickup");
    selectPayment("Cash");
    updateCheckoutSummary();
};

window.closeCheckout = function() {
    const modal = document.getElementById("checkoutModal");
    if (modal) modal.style.display = "none";
};

// =====================================================
// SELECT PICKUP OR DELIVERY
// =====================================================

window.selectOrderType = function(type) {
    selectedOrderType = type;

    const pickupBtn = document.getElementById("pickupBtn");
    const deliveryBtn = document.getElementById("deliveryBtn");
    const orderTypeInput = document.getElementById("orderType");
    const addressSection = document.getElementById("addressSection");
    const addressInput = document.getElementById("address");

    if (orderTypeInput) orderTypeInput.value = type;

    if (pickupBtn) {
        pickupBtn.classList.toggle("selected", type === "Pickup");
    }

    if (deliveryBtn) {
        deliveryBtn.classList.toggle("selected", type === "Delivery");
    }

    if (addressSection) {
        addressSection.style.display =
            type === "Delivery" ? "block" : "none";
    }

    if (addressInput) {
        addressInput.disabled = type !== "Delivery";
    }

    updateCheckoutSummary();
};

// =====================================================
// SELECT PAYMENT
// =====================================================

window.selectPayment = function(payment) {
    selectedPayment = payment;

    const cashBtn = document.getElementById("cashBtn");
    const upiBtn = document.getElementById("upiBtn");
    const paymentInput = document.getElementById("paymentMethod");
    const upiSection = document.getElementById("upiSection");

    if (paymentInput) paymentInput.value = payment;

    if (cashBtn) {
        cashBtn.classList.toggle("selected", payment === "Cash");
    }

    if (upiBtn) {
        upiBtn.classList.toggle("selected", payment === "UPI");
    }

    if (upiSection) {
        upiSection.style.display =
            payment === "UPI" ? "block" : "none";
    }
};

// =====================================================
// CHECKOUT SUMMARY
// =====================================================

function updateCheckoutSummary() {
    const itemsTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        selectedOrderType === "Delivery" ? 30 : 0;

    const grandTotal = itemsTotal + deliveryCharge;

    const checkoutItems = document.getElementById("checkoutItems");

    if (checkoutItems) {
        checkoutItems.innerHTML = "";

        cart.forEach(item => {
            const row = document.createElement("div");
            row.className = "checkout-item";

            row.innerHTML = `
                <span>${item.name} × ${item.quantity}</span>
                <strong>₹${item.price * item.quantity}</strong>
            `;

            checkoutItems.appendChild(row);
        });
    }

    const itemsElement = document.getElementById("itemsTotal");
    const deliveryElement = document.getElementById("deliveryCharge");
    const grandElement = document.getElementById("grandTotal");

    if (itemsElement) itemsElement.innerText = itemsTotal;
    if (deliveryElement) deliveryElement.innerText = deliveryCharge;
    if (grandElement) grandElement.innerText = grandTotal;

    const cakeSection = document.getElementById("cakeCustomization");

    if (cakeSection) {
        cakeSection.style.display =
            cart.some(item => item.cake) ? "block" : "none";
    }
}

// =====================================================
// UPI PAYMENT
// =====================================================

window.payUPI = function() {
    selectPayment("UPI");

    const upiId = "9025611796@nyes";

    const itemsTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        selectedOrderType === "Delivery" ? 30 : 0;

    const total = itemsTotal + deliveryCharge;

    const upiURL =
        "upi://pay?pa=" + encodeURIComponent(upiId) +
        "&pn=" + encodeURIComponent("Kayakani Bakery") +
        "&am=" + total +
        "&cu=INR";

    window.location.href = upiURL;
};

// =====================================================
// SEND ORDER TO WHATSAPP AND FIRESTORE
// =====================================================

window.sendWhatsAppOrder = async function() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const nameInput = document.getElementById("customerName");
    const phoneInput = document.getElementById("customerPhone");
    const addressInput = document.getElementById("address");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";

    if (!name) {
        alert("Please enter your name.");
        if (nameInput) nameInput.focus();
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        if (phoneInput) phoneInput.focus();
        return;
    }

    if (selectedOrderType === "Delivery" && !address) {
        alert("Please enter your delivery address.");
        if (addressInput) addressInput.focus();
        return;
    }

    // Generate order ID and private tracking code.
    const orderId =
        "KYK-" + Math.floor(100000 + Math.random() * 900000);

    const trackingCode =
        crypto.randomUUID().replace(/-/g, "");

    const itemsTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        selectedOrderType === "Delivery" ? 30 : 0;

    const grandTotal = itemsTotal + deliveryCharge;

    const cakeMessage =
        document.getElementById("cakeMessage")?.value.trim() || "";

    const cakeInstructions =
        document.getElementById("cakeInstructions")?.value.trim() || "";

    // Prepare WhatsApp message.
    let message = "🧁 *KAYAKANI BAKERY & SWEETS*%0A%0A";

    message += "*Order ID:* " + encodeURIComponent(orderId) + "%0A";
    message += "*Tracking Code:* " + encodeURIComponent(trackingCode) + "%0A";
    message += "*Customer:* " + encodeURIComponent(name) + "%0A";
    message += "*Phone:* " + encodeURIComponent(phone) + "%0A";
    message += "*Order Type:* " + encodeURIComponent(selectedOrderType) + "%0A";
    message += "*Payment:* " + encodeURIComponent(selectedPayment) + "%0A%0A";

    message += "*Items:*%0A";

    cart.forEach(item => {
        message += encodeURIComponent(
            item.name + " × " + item.quantity +
            " = ₹" + item.price * item.quantity
        ) + "%0A";
    });

    message += "%0A*Items Total:* ₹" + itemsTotal;

    if (selectedOrderType === "Delivery") {
        message += "%0A*Delivery Charge:* ₹" + deliveryCharge;
        message += "%0A*Address:* " + encodeURIComponent(address);
    }

    message += "%0A*Grand Total:* ₹" + grandTotal;

    if (cakeMessage) {
        message += "%0A🎂 *Cake Message:* " +
            encodeURIComponent(cakeMessage);
    }

    if (cakeInstructions) {
        message += "%0A*Cake Instructions:* " +
            encodeURIComponent(cakeInstructions);
    }

    const whatsappNumber = "919025611796";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber + "?text=" + message;

    // Save order in Firestore.
    try {
        await addDoc(collection(db, "orders"), {
            orderId: orderId,
            trackingCode: trackingCode,
            name: name,
            phone: phone,
            orderType: selectedOrderType,
            address: selectedOrderType === "Delivery" ? address : "",
            payment: selectedPayment,

            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),

            itemsTotal: itemsTotal,
            deliveryCharge: deliveryCharge,
            grandTotal: grandTotal,
            cakeMessage: cakeMessage,
            cakeInstructions: cakeInstructions,
            status: "New",
            createdAt: serverTimestamp()
        });

        console.log("Order saved:", orderId);

    } catch (error) {
        console.error("Firebase order error:", error);

        alert(
            "Order could not be saved in the admin dashboard. " +
            "Please check your Firebase settings."
        );
    }

    // Open WhatsApp.
    window.open(whatsappURL, "_blank");

    // Clear cart.
    cart = [];
    updateCart();
    closeCheckout();

    // Show confirmation.
    const confirmationModal =
        document.getElementById("confirmationModal");

    const confirmationOrderId =
        document.getElementById("orderId");

    const confirmationTrackingCode =
        document.getElementById("trackingCode");

    if (confirmationOrderId) {
        confirmationOrderId.innerText = orderId;
    }

    if (confirmationTrackingCode) {
        confirmationTrackingCode.innerText = trackingCode;
    }

    if (confirmationModal) {
        confirmationModal.style.display = "flex";
    }
};

// =====================================================
// CLOSE CONFIRMATION
// =====================================================

window.closeConfirmation = function() {
    const modal = document.getElementById("confirmationModal");
    if (modal) modal.style.display = "none";
};

// =====================================================
// CUSTOMER ORDER TRACKING
// =====================================================

function setupOrderTracking() {
    const form = document.getElementById("trackOrderForm");

    if (!form) return;

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const input = document.getElementById("trackOrderId");
        const result = document.getElementById("trackingResult");

        if (!input || !result) return;

        const trackingCode = input.value.trim();

        if (!trackingCode) {
            result.textContent = "Please enter your tracking code.";
            return;
        }

        result.textContent = "Checking your order...";

        try {
            // The tracking code is the Firestore document ID.
            const trackingRef = doc(db, "tracking", trackingCode);
            const trackingSnap = await getDoc(trackingRef);

            if (!trackingSnap.exists()) {
                result.textContent =
                    "Tracking code not found. Please check the code.";
                return;
            }

            const data = trackingSnap.data();

            result.textContent =
                "Order ID: " + (data.orderId || "Not available") +
                " | Status: " + (data.status || "Status unavailable");

        } catch (error) {
            console.error("Tracking error:", error);

            result.textContent =
                "Unable to track your order right now. Please try again later.";
        }
    });
}

// =====================================================
// LOAD PRODUCTS FROM FIRESTORE
// =====================================================

async function loadProductsFromFirebase() {
    try {
        const snapshot = await getDocs(collection(db, "products"));

        snapshot.forEach(productDoc => {
            const data = productDoc.data();

            if (!data.name) return;

            let image = data.image || "";

            if (
                image &&
                !image.startsWith("http") &&
                !image.startsWith("images/")
            ) {
                image = "images/" + image.replace(/^\/+/, "");
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

            const categoryValue = data.category || "Snacks";

            const firebaseProduct = {
                name: data.name,
                price: Number(data.price) || 0,
                category:
                    categoryMap[String(categoryValue).toLowerCase()] ||
                    categoryValue,
                image: image,
                icon: data.icon || "🍰",
                cake: data.cake === true,
                available: data.available !== false
            };

            const existingIndex = products.findIndex(product =>
                product.name.toLowerCase() ===
                firebaseProduct.name.toLowerCase()
            );

            if (existingIndex !== -1) {
                products[existingIndex] = firebaseProduct;
            } else {
                products.push(firebaseProduct);
            }
        });

        displayProducts(products);
        console.log("Products loaded:", products.length);

    } catch (error) {
        console.error("Could not load products:", error);
        displayProducts(products);
    }
}

// =====================================================
// START WEBSITE
// =====================================================

document.addEventListener("DOMContentLoaded", function() {
    console.log("Kayakani Bakery website started");

    displayProducts();
    updateCart();

    selectOrderType("Pickup");
    selectPayment("Cash");

    setupOrderTracking();
    loadProductsFromFirebase();
});
