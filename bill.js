function generateBill() {
  const billDiv = document.getElementById('billContainer');
  billDiv.style.display = 'block';
  let totalAmount = 0;
  let itemsHTML = '<table><tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th></tr>';
  cart.forEach(i => {
    itemsHTML += `<tr><td>${i.name}</td><td>₹${i.price}</td><td>${i.quantity}</td><td>₹${i.price * i.quantity}</td></tr>`;
    totalAmount += i.price * i.quantity;
  });
  itemsHTML += '</table>';
  billDiv.innerHTML = `
    <h3>Raja Rice & Grocery Bill</h3>
    ${itemsHTML}
    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
    <p><strong>Order Code:</strong> ${orderCode}</p>
  `;
  document.getElementById('downloadBtn').style.display = 'inline-block';
}

// PDF Download
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.html(document.getElementById('billContainer'), {
    callback: function(pdf) { pdf.save('RajaRice_Bill.pdf'); },
    x: 10, y: 10, width: 190
  });
}
