// Cart object to store items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in navbar
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

// Add item to cart
function addToCart(name, price, qty) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty = parseInt(qty);
    if (existing.qty === 0) cart = cart.filter(item => item.name !== name);
  } else if (qty > 0) {
    cart.push({ name, price: parseFloat(price), qty: parseInt(qty) });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  if (window.location.pathname.endsWith('cart.html')) renderCart();
}

// Render cart on cart.html
function renderCart() {
  const tbody = document.querySelector('#cart-items tbody');
  const totalEl = document.getElementById('total-price');
  tbody.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.price} SAR</td>
      <td>${(item.price * item.qty).toFixed(2)} SAR</td>
    `;
    total += item.price * item.qty;
  });

  totalEl.textContent = total.toFixed(2);
}

// Confirm order
function confirmOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert(`Order confirmed! Total: ${document.getElementById('total-price').textContent} SAR`);
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('cart.html')) renderCart();
  updateCartCount();
});