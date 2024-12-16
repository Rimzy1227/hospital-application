// Load cart items from localStorage
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

// Display cart items
function updateCart() {
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';

    let totalPrice = 0;
    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        totalPrice += total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rs.${item.price}</td>
            <td>${item.quantity}</td>
            <td>Rs.${total}</td>
            <td><button class="remove-item" data-index="${index}">Remove</button></td>
        `;

        tbody.appendChild(row);
    });

    document.querySelector('#totalPrice').textContent = `Total Price: Rs.${totalPrice}`;

    // Add event listeners to "Remove" buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt(event.target.getAttribute('data-index'));
            cart.splice(index, 1); // Remove the item
            localStorage.setItem('cartItems', JSON.stringify(cart)); // Update localStorage
            updateCart(); // Re-render the cart
        });
    });
}

// Initialize the cart
updateCart();

// Checkout functionality
document.getElementById('checkout').addEventListener('click', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Validate if the cart is empty
    if (!cartItems || cartItems.length === 0) {
        alert('Your cart is empty. Please add items before proceeding to checkout.');
        return; // Stop execution if the cart is empty
    }

    // Validate payment method and fields
    if (!validatePaymentAndCheckout()) {
        return; // Stop execution if validation fails
    }

    // Process checkout
    alert('Thank you for your purchase!');
    localStorage.removeItem('cartItems'); // Clear the cart
    window.location.href = 'order.html'; // Redirect to order confirmation page
});

function togglePaymentMethod(method) {
    const cardFields = document.getElementById("card-payment-fields");
    const codMessage = document.getElementById("cod-message");

    if (!cardFields || !codMessage) {
        console.error("Required elements are missing in the DOM.");
        return;
    }

    if (method === "card") {
        cardFields.style.display = "block";
        codMessage.style.display = "none";
    } else if (method === "cod") {
        cardFields.style.display = "none";
        codMessage.style.display = "block";
    } else {
        console.error("Invalid payment method provided:", method);
    }
}

function validatePaymentAndCheckout() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    const cardNumber = document.getElementById("card-number");
    const cardExpiry = document.getElementById("card-expiry");
    const cardCvv = document.getElementById("card-cvv");

    if (!selectedMethod) {
        displayError("Please select a payment method.");
        return false;
    }

    if (selectedMethod.value === "card") {
        
        // Validate card fields
        if (!cardNumber || !cardExpiry || !cardCvv) {
            console.error("Card fields are missing in the DOM.");
            return false;
        }

        if (!cardNumber.value.trim()) {
            displayError("Card number is required.");
            return false;
        }
        if (!cardExpiry.value.trim()) {
            displayError("Card expiry date is required.");
            return false;
        }
        if (!cardCvv.value.trim()) {
            displayError("Card CVV is required.");
            return false;
        }

        // Additional validations for card details
        if (!/^\d{16}$/.test(cardNumber.value)) {
            displayError("Card number must be 16 digits.");
            return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry.value)) {
            displayError("Card expiry must be in MM/YY format.");
            return false;
        }
        if (!/^\d{3}$/.test(cardCvv.value)) {
            displayError("CVV must be 3 digits.");
            return false;
        }
    }

    // If no validation errors
    clearError();
    return true;
}

function displayError(errorMessage) {
    const message = document.getElementById("payment-error");
    if (message) {
        message.textContent = errorMessage;
        message.style.color = "red";
    }
}

function clearError() {
    const message = document.getElementById("payment-error");
    if (message) {
        message.textContent = "";
    }
}

function processPayment() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    const message = document.getElementById("message");

    if (!selectedMethod) {
        console.error("No payment method selected.");
        return;
    }

    if (selectedMethod.value === "card") {
        message.textContent = "Card payment processed successfully!";
        message.style.color = "green";
    } else if (selectedMethod.value === "cod") {
        message.textContent = "Order placed successfully! Please pay on delivery.";
        message.style.color = "green";
    }
}
