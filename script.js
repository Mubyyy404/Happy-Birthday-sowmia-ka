let cart = [];
let orderCode = 'ORD-'+Math.random().toString(36).substring(2,8).toUpperCase();

function addToCart(name, price){
  const item = cart.find(i=>i.name===name);
  if(item){ item.quantity++; }
  else { cart.push({name,price,quantity:1}); }
  document.getElementById('cartCount').innerText = cart.reduce((a,b)=>a+b.quantity,0);
}

function openCart(){
  updateCartTable();
  document.getElementById('orderCode').value = orderCode;
  document.getElementById('codOrderCode').innerText = orderCode;
  document.getElementById('cartModal').style.display='flex';
}

function closeCart(){ document.getElementById('cartModal').style.display='none'; }

function updateCartTable(){
  const tbody = document.querySelector('#cartTable tbody');
  tbody.innerHTML='';
  let total=0;
  cart.forEach(i=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${i.name}</td><td>₹${i.price}</td>
      <td><button onclick="changeQty('${i.name}',-1)">-</button> ${i.quantity} <button onclick="changeQty('${i.name}',1)">+</button></td>
      <td>₹${i.price*i.quantity}</td>`;
    tbody.appendChild(tr);
    total+=i.price*i.quantity;
  });
  document.getElementById('totalAmount').innerText='Total: ₹'+total;
}

function changeQty(name, delta){
  const item = cart.find(i=>i.name===name);
  if(item){ item.quantity+=delta; if(item.quantity<=0) cart=cart.filter(i=>i.name!==name); }
  updateCartTable();
  document.getElementById('cartCount').innerText=cart.reduce((a,b)=>a+b.quantity,0);
}

document.querySelectorAll('input[name="payment"]').forEach(r=>{
  r.addEventListener('change',()=>{
    document.getElementById('upiSection').style.display = r.value==="UPI"?"block":"none";
    document.getElementById('codSection').style.display = r.value==="COD"?"block":"none";
  });
});

document.getElementById('payNowBtn').addEventListener('click',()=>{
  document.getElementById('paymentStatus').innerText=`Pay using UPI with this code: ${orderCode}. After payment, admin will approve to generate your bill.`;
  let orders=JSON.parse(localStorage.getItem("orders"))||{};
  orders[orderCode]=cart;
  localStorage.setItem("orders",JSON.stringify(orders));
});
