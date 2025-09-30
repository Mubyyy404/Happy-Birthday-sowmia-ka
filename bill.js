function fetchBill(){
  const code=document.getElementById('enterCode').value.trim();
  if(!code) return;

  let approved=JSON.parse(localStorage.getItem("approvedCodes"))||[];
  if(!approved.includes(code)){
    document.getElementById("billStatus").innerText="❌ Not approved by Admin yet.";
    return;
  }

  let orders=JSON.parse(localStorage.getItem("orders"))||{};
  if(!orders[code]){
    document.getElementById("billStatus").innerText="❌ Invalid Order Code.";
    return;
  }

  let items=orders[code];
  let total=0;
  let html="<h3>Raja Rice & Grocery Bill</h3><table><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>";
  items.forEach(i=>{
    html+=`<tr><td>${i.name}</td><td>${i.quantity}</td><td>₹${i.price}</td><td>₹${i.price*i.quantity}</td></tr>`;
    total+=i.price*i.quantity;
  });
  html+="</table><p><b>Total: ₹"+total+"</b></p><p><b>Order Code:</b> "+code+"</p>";

  document.getElementById("billContainer").innerHTML=html;
  document.getElementById("billContainer").style.display="block";
  document.getElementById("downloadBtn").style.display="inline-block";
  document.getElementById("billStatus").innerText="";
}

function downloadPDF(){
  const { jsPDF } = window.jspdf;
  html2canvas(document.getElementById("billContainer")).then(canvas=>{
    let imgData=canvas.toDataURL("image/png");
    let pdf=new jsPDF();
    let imgWidth=190;
    let imgHeight=canvas.height*imgWidth/canvas.width;
    pdf.addImage(imgData,"PNG",10,10,imgWidth,imgHeight);
    pdf.save("RajaRice_Bill.pdf");
  });
}
