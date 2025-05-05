document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".cart-btn");
    const cartCountElement = document.querySelector(".cart-item-count");

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.innerText = totalItems;
            cartCountElement.style.display = totalItems > 0 ? "inline-block" : "none";
        }
    }

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product-card");
            const title = productElement.querySelector("h3").innerText;

            const product = { title, quantity: 1 };
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingItem = cart.find(item => item.title === product.title);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });

    updateCartCount();
});
