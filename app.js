const menu = document.querySelector(".menu");
const closeBtn = document.querySelector(".close");
const openBtn = document.querySelector(".hamburgger");
const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.querySelector(".cart-display");
const images = document.querySelectorAll(".p-img");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const number = document.querySelector(".number");
const countAmount = document.querySelector(".count-amount");
const addToCart = document.querySelector(".add-to-cart");
console.log(countAmount);
// increase cart and populating cart
// one function to handle the increase and decrease   it will nbe called if a button
//  is clicked , it will  check  if the countAmount is less than one so that it will  remove
// the notification
let quantity = 0;
const changeNumber = () => {
  if (countAmount.innerText.trim() > 0) {
    cartIcon.classList.add("full");
  } else if (countAmount.innerText.trim() == 0) {
    cartIcon.classList.remove("full");
  }
  countAmount.innerText = quantity;
  if (quantity < 0) {
    decrease.style.visibility = "hidden";
  } else {
    decrease.style.visibility = "visible";
    number.innerText = quantity;
  }
};
changeNumber();
increase.addEventListener("click", () => {
  quantity += 1;
  changeNumber();
});
decrease.addEventListener("click", () => {
  quantity -= 1;
  if (quantity < 1) {
    cartIcon.classList.remove("full");
  }
  // countAmount.innerText = quantity;
  changeNumber();
});
//  adding to cart

// function to  clean or clear   the cart after every  click
const cleanCart = () => {
  cartModal.innerHTML = "";
};

const createCart = () => {
  cleanCart();
  let div = document.createElement("div");
  quantity == 0
    ? (div.innerHTML = `
  <div class="cart"><span>cart</span></div>
  <div class="detailed">
    <div class="item">
    <p class='empty-cart'> your cart is empty</p>
    </div>

   `)
    : (div.innerHTML = `
  <div class="cart"><span>cart</span></div>
  <div class="detailed">
    <div class="item">
      <div class="content">
        <section>
          <div class="thumbnail">
            <img
              src="./images/image-product-1-thumbnail.jpg"
              alt="item-image"
            />
          </div>
          <div class="description">
            <p>Autum Limited Edition...</p>
            <p>$125 x ${quantity} <span class="total">$${
        quantity * 125
      }</span></p>
          </div>
        </section>
        <img src="./images/icon-delete.svg" alt=""  id="clear"/>
      </div>
    </div>
    <button class="pay-btn">Checkout</button>
  </div>`);
  cartModal.appendChild(div);
};
// function to clear cart
const clearCart = document.getElementById("clear");
const kk = document.querySelector(".pay-btn");
console.log(kk);
console.log(clearCart);
clearCart.addEventListener("click", () => {
  cartModal.replaceChildren("");
});
// add to cart button
addToCart.addEventListener("click", () => {
  quantity += 1;
  number.innerText = quantity;
  cartIcon.classList.add("full");
  countAmount.innerText = quantity;
});
//  end of adding to cart

// slidding functionality
let count = 0;
const changeImage = () => {
  if (count > images.length - 1) {
    count = 0;
  } else if (count < 0) {
    count = images.length - 1;
  } else {
    images.forEach(
      (image) => (image.style.transform = `translateX(${-count * 100}%)`)
    );
  }
};

const moveRight = () => {
  changeImage();
  count++;
};
const moveLeft = () => {
  count--;
  changeImage();
};

next.addEventListener("click", moveRight);
previous.addEventListener("click", moveLeft);
// sliding functionality

// toggle functionalu=ity for the cart
cartIcon.addEventListener("click", () => {
  cartModal.classList.toggle("show");
  createCart();
});

// toggle functionality for the menu
const toggleFunc = () => {
  menu.classList.add("open");
  menu.addEventListener("click", (e) => {
    e.target.classList.contains("menu") || e.target.classList.contains("close")
      ? menu.classList.remove("open")
      : null;
  });
};

openBtn.addEventListener("click", toggleFunc);
