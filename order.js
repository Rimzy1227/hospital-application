const cart = [];

// Get the table container
const cartTableContainer = document.getElementById('cartTableContainer');

// Get the original offset position of the table container
const originalOffset = cartTableContainer.offsetTop;

// Add a scroll event listener
// window.addEventListener('scroll', () => {
//  if (window.scrollY > originalOffset) {
//     cartTableContainer.classList.add('fixed'); // Add fixed position
//   } else {
//     cartTableContainer.classList.remove('fixed'); // Revert to normal position
//   }
// });

// Add event listener to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const quantityInput = button.previousElementSibling;
        const quantity = parseInt(quantityInput.value);

        const maxLimit = 100; // Define the maximum limit

        if (isNaN(quantity) || quantity <= 0 || quantity > maxLimit) {
            if (quantity > maxLimit) {
                alert(`Please enter a quantity less than or equal to ${maxLimit}.`);
            } else {
                alert("Please enter a valid quantity greater than zero.");
            }
            return;
        }
        
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }

        updateCart();
    });
});

function updateCart() {
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const row = document.createElement('tr');
        const total = item.price * item.quantity;
        totalPrice += total;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rs.${item.price}</td>
            <td>${item.quantity}</td>
            <td>Rs.${total}</td>
        `;

        tbody.appendChild(row);
    });

    document.querySelector('#totalPrice').textContent = `Total Price: Rs.${totalPrice}`;

    
}

document.getElementById('saveFavourites').addEventListener('click', () => {
    localStorage.setItem('favouriteOrder', JSON.stringify(cart));
    alert('Favourites saved!');
});

document.getElementById('applyFavourites').addEventListener('click', () => {
    const savedCart = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (savedCart) {
        cart.length = 0; // Clear existing cart
        savedCart.forEach(item => cart.push(item));
        updateCart();
    }
});

//document.getElementById('buyNow').addEventListener('click', () => {
    //alert('Navigating to order details page...');
    // Implement navigation logic
//});

document.getElementById('buyNow').addEventListener('click', () => {
    if (cart.length) {
        localStorage.setItem('cartItems', JSON.stringify(cart));
        window.location.href = 'cart.html'; // Navigate to the new cart page
    }
    else {
        alert('Your cart is empty. Please add items to proceed.');
    }
});


