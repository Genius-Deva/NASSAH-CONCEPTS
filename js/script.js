// MOBILE MENU

const menuBtn = document.getElementById("menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("show");
});


// CART

let cartCount = 0;

function addToCart() {

    cartCount++;

    document.getElementById("cart-count").textContent = cartCount;

    alert("Product added to your cart!");
}


// WISHLIST

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

    });

});