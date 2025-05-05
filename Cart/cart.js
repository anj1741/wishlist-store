document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const cartCountElement = document.querySelector(".cart-item-count");

  function updateCartDisplay() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartContainer.innerHTML = "";
      let totalCount = 0;

      if (cart.length === 0) {
          cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      }

      cart.forEach((item, index) => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "cart-item";
          itemDiv.innerHTML = `
    <h4>${item.title}</h4>
    <div class="cart-controls">
        <button class="btn decrease" data-index="${index}">➖</button>
        <span class="quantity">${item.quantity}</span>
        <button class="btn increase" data-index="${index}">➕</button>
        <button class="remove" data-index="${index}" title="Remove item">🗑️</button>
    </div>
`;

          cartContainer.appendChild(itemDiv);
          totalCount += item.quantity;
      });

      if (cartCountElement) {
          cartCountElement.innerText = totalCount;
          cartCountElement.style.display = totalCount > 0 ? "inline-block" : "none";
      }
  }

  cartContainer.addEventListener("click", (e) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = parseInt(e.target.getAttribute("data-index"));

      if (e.target.classList.contains("increase")) {
          cart[index].quantity += 1;
      } else if (e.target.classList.contains("decrease")) {
          cart[index].quantity -= 1;
          if (cart[index].quantity < 1) cart.splice(index, 1);
      } else if (e.target.classList.contains("remove")) {
          cart.splice(index, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
  });

  updateCartDisplay();
});
