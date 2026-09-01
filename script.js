// ==================================================
// KAYAKANI BAKERY & SWEETS
// COMPLETE ORDERING SYSTEM
// ==================================================



// ================= PRODUCTS =================

const products = [


    // TEA & COFFEE

    {
        name: "Tea Parcel",
        price: 40,
        category: "tea",
        icon: "☕"
    },

    {
        name: "Coffee Parcel",
        price: 40,
        category: "tea",
        icon: "☕"
    },

    {
        name: "Black Tea Parcel",
        price: 40,
        category: "tea",
        icon: "🍵"
    },


    // SNACKS

    {
        name: "Vada",
        price: 10,
        category: "snacks",
        icon: "🥨"
    },

    {
        name: "Samosa",
        price: 10,
        category: "snacks",
        icon: "🥟"
    },

    {
        name: "Bonda",
        price: 10,
        category: "snacks",
        icon: "🟤"
    },

    {
        name: "Bajji",
        price: 10,
        category: "snacks",
        icon: "🥞"
    },

    {
    name: "Veg Puff",
    price: 20,
    category: "snacks",
    icon: "🥐"
},

{
    name: "Egg Puff",
    price: 30,
    category: "snacks",
    icon: "🥚"
},

{
    name: "Mushroom Puff",
    price: 30,
    category: "snacks",
    icon: "🍄"
},


    // BUNS & BREAD

    {
        name: "Cream Bun",
        price: 25,
        category: "bread",
        icon: "🍞"
    },

    {
        name: "Tea Bun",
        price: 10,
        category: "bread",
        icon: "🥯"
    },

    {
        name: "Bread",
        price: 45,
        category: "bread",
        icon: "🍞"
    },


    // MIXTURE

    {
        name: "Mixture - 100g",
        price: 40,
        category: "mixture",
        icon: "🥜"
    },

    {
        name: "Mixture - 250g",
        price: 90,
        category: "mixture",
        icon: "🥜"
    },

    {
        name: "Mixture - 500g",
        price: 170,
        category: "mixture",
        icon: "🥜"
    },

    {
        name: "Sevu - 100g",
        price: 40,
        category: "mixture",
        icon: "🥜"
    },


    // SWEETS

    {
        name: "Normal Sweets - 250g",
        price: 150,
        category: "sweets",
        icon: "🍬"
    },

    {
        name: "Milk Sweets - 250g",
        price: 250,
        category: "sweets",
        icon: "🍬"
    },


    // DRINKS

    {
        name: "Coke",
        price: 20,
        category: "drinks",
        icon: "🥤"
    },

    {
        name: "Juice",
        price: 20,
        category: "drinks",
        icon: "🧃"
    },

    {
        name: "Rose Milk",
        price: 50,
        category: "drinks",
        icon: "🥛"
    },

    {
        name: "Badam Milk",
        price: 50,
        category: "drinks",
        icon: "🥛"
    },


    // CAKES & BISCUITS

    {
        name: "Biscuits",
        price: 30,
        category: "cakes",
        icon: "🍪"
    },

    {
        name: "Brownie",
        price: 50,
        category: "cakes",
        icon: "🍫"
    },

    {
        name: "Honey Cake",
        price: 70,
        category: "cakes",
        icon: "🍯"
    },

    {
        name: "Pudding Cake",
        price: 60,
        category: "cakes",
        icon: "🍰"
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
        cake: true
    }

 

];



// ================= CART =================

let cart = [];



// ================= DISPLAY PRODUCTS =================

function displayProducts(list = products) {

    const container =
        document.getElementById("products");

    container.innerHTML = "";


    list.forEach(function(product) {


        const originalIndex =
            products.indexOf(product);


        container.innerHTML += `

            <div class="product">

                <div class="product-icon">

                    ${product.icon}

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



// ================= CATEGORY =================

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

function searchProducts() {

    const search =
        document.getElementById("searchInput")
        .value
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



// ================= ADD TO CART =================

function addToCart(index) {


    const product =
        products[index];


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



// ================= UPDATE CART =================

function updateCart() {


    const cartCount =
        document.getElementById("cartCount");


    const cartItems =
        document.getElementById("cartItems");


    const cartTotal =
        document.getElementById("cartTotal");


    let totalItems = 0;

    let totalPrice = 0;


    cartItems.innerHTML = "";


    cart.forEach(function(item, index) {


        totalItems += item.quantity;


        const itemTotal =
            item.price * item.quantity;


        totalPrice += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">


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


    cartCount.innerText =
        totalItems;


    cartTotal.innerText =
        totalPrice;

}



// ================= CHANGE QUANTITY =================

function changeQuantity(index, change) {


    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}



// ================= OPEN CART =================

function openCart() {


    document.getElementById(
        "cartModal"
    ).style.display = "block";

}



// ================= CLOSE CART =================

function closeCart() {


    document.getElementById(
        "cartModal"
    ).style.display = "none";

}



// ================= CHECKOUT =================

function checkout() {


    if (cart.length === 0) {

        alert(
            "Please add an item to your cart."
        );

        return;

    }


    closeCart();


    document.getElementById(
        "checkoutModal"
    ).style.display = "block";


    updateCheckoutSummary();


    updateCakeCustomization();

}



// ================= CLOSE CHECKOUT =================

function closeCheckout() {


    document.getElementById(
        "checkoutModal"
    ).style.display = "none";

}



// ================= PICKUP / DELIVERY =================

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


    if (type === "Delivery") {


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



// ================= ORDER SUMMARY =================

function updateCheckoutSummary() {


    let itemsTotal = 0;


    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );


    checkoutItems.innerHTML = "";


    cart.forEach(function(item) {


        const itemTotal =
            item.price * item.quantity;


        itemsTotal += itemTotal;


        checkoutItems.innerHTML += `

            <div class="summary-item">


                <span>

                    ${item.name}
                    × ${item.quantity}

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


    if (orderType === "Delivery") {

        deliveryCharge = 30;

    }


    const grandTotal =
        itemsTotal + deliveryCharge;


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



// ================= CAKE CUSTOMIZATION =================

function updateCakeCustomization() {


    const cakeSection =
        document.getElementById(
            "cakeCustomization"
        );


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



// ================= PAYMENT =================

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



// ================= UPI =================

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


    if (orderType === "Delivery") {

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



// ================= WHATSAPP =================


function sendWhatsAppOrder() {

    const name =
        document.getElementById("customerName")
        .value.trim();

    const phone =
        document.getElementById("customerPhone")
        .value.trim();

    const type =
        document.getElementById("orderType")
        .value;

    const address =
        document.getElementById("address")
        .value.trim();

    const payment =
        document.getElementById("paymentMethod")
        .value;


    // ================= VALIDATION =================

    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    if (phone === "") {

        alert("Please enter your mobile number.");

        return;

    }


    if (type === "Delivery" && address === "") {

        alert("Please enter your delivery address.");

        return;

    }


    // ================= ORDER ID =================

    const orderId =
        "KYK-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    // ================= MESSAGE =================

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
        "\n";


    message +=
        "\nITEMS:\n";


    let total = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price *
            item.quantity;

        total += itemTotal;

        message +=
            item.name +
            " x " +
            item.quantity +
            " = Rs." +
            itemTotal +
            "\n";

    });


    // ================= DELIVERY =================

    let deliveryCharge = 0;


    if (type === "Delivery") {

        deliveryCharge = 30;

    }


    const grandTotal =
        total +
        deliveryCharge;


    message +=
        "\nItems Total: Rs." +
        total;


    message +=
        "\nDelivery Charge: Rs." +
        deliveryCharge;


    // ================= CAKE DETAILS =================

    const cake =
        cart.find(function(item) {

            return item.cake === true;

        });


    if (cake) {

        const cakeMessage =
            document.getElementById("cakeMessage")
            .value.trim();

        const cakeInstructions =
            document.getElementById("cakeInstructions")
            .value.trim();


        if (cakeMessage !== "") {

            message +=
                "\nCake Message: " +
                cakeMessage;

        }


        if (cakeInstructions !== "") {

            message +=
                "\nSpecial Instructions: " +
                cakeInstructions;

        }

    }


    message +=
        "\n\nTOTAL: Rs." +
        grandTotal;


    // ================= WHATSAPP NUMBER =================

    const bakeryNumber =
        "919025611796";


    const whatsappURL =
        "https://wa.me/" +
        bakeryNumber +
        "?text=" +
        encodeURIComponent(message);


    // ================= OPEN WHATSAPP =================

    window.open(
        whatsappURL,
        "_blank"
    );


    // ================= SHOW CONFIRMATION =================

    document.getElementById(
        "orderId"
    ).innerText =
        orderId;


    document.getElementById(
        "confirmationModal"
    ).style.display =
        "block";

}

// ================= START =================

displayProducts();

updateCart();

selectOrderType("Pickup");

selectPayment("Cash");

function closeConfirmation() {

    document.getElementById(
        "confirmationModal"
    ).style.display = "none";

    cart = [];

    updateCart();

    closeCheckout();

}