// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.querySelector('#pharmacy-form form');
    const message = document.createElement('div'); // Element to display messages
    message.id = 'formMessage';
    message.style.marginTop = '10px';
    message.style.textAlign = 'center';
    orderForm.appendChild(message);

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve form values
        const name = document.getElementById('name').value.trim();
        const mobile = document.getElementById('number').value.trim();
        const address = document.getElementById('address').value.trim();

        // Perform JavaScript validation
        const validationErrors = validateForm(name, mobile, address);

        if (validationErrors.length > 0) {
            displayMessage(validationErrors.join('<br>'), 'red');
            return;
        }

        // Create an order object
        const order = {
            name,
            mobile,
            address,
            items: cart, // Assuming 'cart' is a global variable containing cart items
            totalPrice: calculateTotalPrice(),
            orderDate: new Date().toISOString()
        };

       

        // Optionally, redirect to an order confirmation page after a delay
        setTimeout(() => {
            window.location.href = 'order.html'; // Redirect to order confirmation page
        }, 3000);
    });

    /**
     * Validates the form inputs.
     * @param {string} name - The user's name.
     * @param {string} mobile - The user's mobile number.
     * @param {string} address - The delivery address.
     * @returns {Array} - An array of error messages.
     */
    function validateForm(name, mobile, address) {
        const errors = [];

        // Name validation: Only letters and spaces, at least 2 characters
        const namePattern = /^[A-Za-z\s]{2,}$/;
        if (!namePattern.test(name)) {
            errors.push('Please enter a valid name (letters and spaces only, minimum 2 characters).');
        }

        // Mobile number validation: Exactly 10 digits
        const mobilePattern = /^\d{10}$/;
        if (!mobilePattern.test(mobile)) {
            errors.push('Please enter a valid 10-digit mobile number.');
        }

        // Address validation: At least 10 characters
        if (address.length < 5) {
            errors.push('Please enter a valid delivery address (minimum 10 characters).');
        }

        return errors;
    }

    
});

document.getElementById('OrderMedicine').addEventListener('click', () => {
    if (cart.length) {
        localStorage.setItem('cartItems', JSON.stringify(cart));
        window.location.href = 'order.html'; // Navigate to the order page
    }
    else {
        alert('Your information is empty. Please add detailes to proceed.');
    }
});
