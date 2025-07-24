// Load previous sales if available
let sales = JSON.parse(localStorage.getItem("salesData") || "[]");
let allSalesDone = false;

// Elements
const itemInput = document.getElementById("itemInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const salesTableBody = document.querySelector("#salesTable tbody");
const salesTotal = document.getElementById("salesTotal");
const doneBtn = document.getElementById("doneBtn");
const nextBtn = document.getElementById("nextBtn");

// Render sales on load
renderSales();

// Add Sale button
addBtn.addEventListener("click", () => {
  const name = itemInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name) {
    alert("⚠️ Enter item name");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("⚠️ Enter a valid amount");
    return;
  }

  // Whenever a new sale is added after marking done,
  // reset the done flag so user must press "All Sales Done" again.
  allSalesDone = false;

  // Add sale to list
  sales.push({ name, amount });
  localStorage.setItem("salesData", JSON.stringify(sales));
  renderSales();

  // Clear inputs
  itemInput.value = "";
  amountInput.value = "";
  itemInput.focus();
});

// All Sales Done button
doneBtn.addEventListener("click", () => {
  if (sales.length === 0) {
    alert("⚠️ Please add at least one sale before marking as done.");
    return;
  }
  allSalesDone = true;
  localStorage.setItem("salesData", JSON.stringify(sales));
  alert("✅ All sales marked as done. You can now go to the next step.");
});

// Next Step link click
nextBtn.addEventListener("click", (e) => {
  if (sales.length === 0) {
    e.preventDefault();
    alert("⚠️ Add at least one sale before proceeding.");
    return;
  }
  if (!allSalesDone) {
    e.preventDefault();
    alert('⚠️ Please click "All Sales Done" before proceeding.');
    return;
  }
  // else it will navigate to step2.html
});

// Render function
function renderSales() {
  salesTableBody.innerHTML = "";
  let total = 0;

  sales.forEach((sale, index) => {
    total += sale.amount;

    const tr = document.createElement("tr");

    const numCell = document.createElement("td");
    numCell.textContent = index + 1;
    tr.appendChild(numCell);

    const itemCell = document.createElement("td");
    itemCell.className = "item-cell";

    const itemSpan = document.createElement("span");
    itemSpan.textContent = sale.name;
    itemSpan.className = "item-text";

    const delIcon = document.createElement("span");
    delIcon.textContent = "✖";
    delIcon.className = "delete-icon";
    delIcon.title = "Delete";
    delIcon.addEventListener("click", () => {
      sales.splice(index, 1);
      localStorage.setItem("salesData", JSON.stringify(sales));
      renderSales();
    });

    itemCell.appendChild(itemSpan);
    itemCell.appendChild(delIcon);
    tr.appendChild(itemCell);

    const amtCell = document.createElement("td");
    amtCell.textContent = sale.amount.toFixed(2);
    tr.appendChild(amtCell);

    salesTableBody.appendChild(tr);
  });

  salesTotal.textContent = total.toFixed(2);
}
