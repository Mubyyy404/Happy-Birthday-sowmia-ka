let cart = [];
let orderCode = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();

// Show offer popup on load
window.onload = function() {
  document.getElementById('offerPopup').style.display = 'block';
};
function closeOffer() {
  document.getElementById('offerPopup').style.display = 'none';
}

// Add item to cart
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartCount();
  updateCartTable();
}

// Update cart count (total quantity)
function updateCartCount() {
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = totalQty;
}

// Open / close cart modal
function openCart() {
  updateCartTable();
  document.getElementById('orderCode').value = orderCode;
  document.getElementById('cartModal').style.display = 'flex';
}
function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

// Update cart table
function updateCartTable() {
  const tbody = document.querySelector('#cartTable tbody');
  tbody.innerHTML = '';
  let total = 0;
  cart.forEach(i => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i.name}</td>
      <td>₹${i.price}</td>
      <td>
        <button onclick="changeQty('${i.name}',-1)">-</button> 
        ${i.quantity} 
        <button onclick="changeQty('${i.name}',1)">+</button>
      </td>
      <td>₹${i.price * i.quantity}</td>
    `;
    tbody.appendChild(tr);
    total += i.price * i.quantity;
  });
  document.getElementById('totalAmount').innerText = 'Total: ₹' + total;
}

// Change quantity
function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(i => i.name !== name);
  }
  updateCartTable();
  updateCartCount();
}

// Toggle payment sections
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', e => {
    if (e.target.value === "UPI") {
      document.getElementById('upiSection').style.display = 'block';
      document.getElementById('codSection').style.display = 'none';
    } else {
      document.getElementById('upiSection').style.display = 'none';
      document.getElementById('codSection').style.display = 'block';
      document.getElementById('codOrderCode').innerText = orderCode;
    }
  });
});

// Pay Now (UPI)
document.getElementById('payNowBtn').addEventListener('click', () => {
  document.getElementById('paymentStatus').innerText =
    `Pay using UPI with this code: ${orderCode}. After payment, admin will approve to generate your bill.`;
});

// Fetch Bill (Get Bill Page)
function fetchBill() {
  const code = document.getElementById('enterCode').value.trim();
  let approvedCodes = JSON.parse(localStorage.getItem("approvedCodes")) || [];
  if (approvedCodes.includes(code)) {
    document.getElementById('billStatus').innerText = "✅ Order approved! Generating bill...";
    document.getElementById('billContainer').style.display = 'block';
    generateBill();
  } else {
    document.getElementById('billStatus').innerText = "❌ Order not approved yet!";
  }
}
