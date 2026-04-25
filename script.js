let subtotal = 0;
let count = 1;

// Load invoice number
window.onload = () => {
  let num = localStorage.getItem("inv") || 1001;
  document.getElementById("invoiceNo").innerText = num;
};

function addItem() {
  let item = document.getElementById("item").value;
  let qty = parseInt(document.getElementById("qty").value);
  let price = parseFloat(document.getElementById("price").value);

  if (!item || !qty || !price) return alert("Fill all fields");

  let taxable = qty * price;
  let cgst = taxable * 0.09;
  let sgst = taxable * 0.09;
  let total = taxable + cgst + sgst;

  subtotal += taxable;

  let row = `
    <tr>
      <td>${count++}</td>
      <td>${item}</td>
      <td>${qty}</td>
      <td>${price}</td>
      <td>${taxable.toFixed(2)}</td>
      <td>${cgst.toFixed(2)}</td>
      <td>${sgst.toFixed(2)}</td>
      <td>${total.toFixed(2)}</td>
    </tr>
  `;

  document.getElementById("items").innerHTML += row;

  updateTotals();

  document.getElementById("item").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("price").value = "";
}

function updateTotals() {
  let cgst = subtotal * 0.09;
  let sgst = subtotal * 0.09;
  let total = subtotal + cgst + sgst;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("cgst").innerText = cgst.toFixed(2);
  document.getElementById("sgst").innerText = sgst.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);

  document.getElementById("words").innerText = total.toFixed(0) + " Rupees Only";
}

// Download PDF + increment invoice
function downloadPDF() {
  const { jsPDF } = window.jspdf;

  html2canvas(document.getElementById("invoice")).then(canvas => {
    let pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 0);
    pdf.save("Invoice_" + document.getElementById("invoiceNo").innerText + ".pdf");

    // Increment invoice AFTER download
    let current = parseInt(localStorage.getItem("inv") || 1001);
    localStorage.setItem("inv", current + 1);
  });
}

// Reset for new bill
function newBill() {
  subtotal = 0;
  count = 1;

  document.getElementById("items").innerHTML = "";
  document.getElementById("subtotal").innerText = "0";
  document.getElementById("cgst").innerText = "0";
  document.getElementById("sgst").innerText = "0";
  document.getElementById("total").innerText = "0";
  document.getElementById("words").innerText = "";

  document.getElementById("customer").value = "";
  document.getElementById("address").value = "";
  document.getElementById("contact").value = "";
  document.getElementById("gst").value = "";

  // Load new invoice number
  let num = localStorage.getItem("inv") || 1001;
  document.getElementById("invoiceNo").innerText = num;
}