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
const holder = document.querySelector(".holder");
const imagesContainer = document.querySelector(".images-container");
// const modalPage = document.querySelector('.modal-page')
const hoveredImage = "./images/icon-plus.svg";
const closeModal = document.querySelector(".modal-close");

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

// function  to swap  thumbnail  with main  image
const thumbnails = document.querySelectorAll(".thumb");
//  this function clears the active class on every element before
//  the active class is added
const clearAllActive = () => {
  thumbnails.forEach((thumb) => thumb.classList.remove("active"));
};
function swapThumbs() {
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      clearAllActive();
      //
      //
      count = index;
      changeImage();
      thumb.classList.add("active");
    });
  });
}
swapThumbs();

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
  <div class="detailed cart-height">
    <div class="item">
    <p class='empty-cart'> your cart is empty</p>
    </div>

   `) && setTimeout(cartVisiblityFunc, 1000)
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
        <img src="./images/icon-delete.svg" alt=""  id="clear" />
      </div>
    </div>
    <button class="pay-btn">Checkout</button>
  </div>`);
  cartModal.appendChild(div);
  const checkOut = document.querySelector(".pay-btn");
  checkOut.addEventListener("click", cartVisiblityFunc);
  // this function clears the content of the cart and sets the quantity to zero
  const deleteImage = document.querySelector("#clear");
  deleteImage.addEventListener("click", () => {
    cartModal.innerHTML = `   <div class="cart"><span>cart</span></div>
    <div class="detailed">
      <div class="item">
      <p class='empty-cart'> you emptied the cart </p>
      </div>`;
    number.innerText = 0;
    quantity = 0;
    cartIcon.classList.remove("full");
    setTimeout(cartVisiblityFunc, 1000);
  });
};

// function to swap close modal images

closeModal.addEventListener("mouseenter", () => {
  closeModal.src = hoveredImage;
});
closeModal.addEventListener(
  "mouseleave",
  () => (closeModal.src = "./images/icon-close.svg")
);
closeModal.addEventListener("click", (e) => {
  removeModal(e);
  closeModal.src = "./images/icon-close.svg";
});

//
//

// add to cart button
addToCart.addEventListener("click", () => {
  quantity += 1;
  number.innerText = quantity;
  cartIcon.classList.add("full");
  countAmount.innerText = quantity;
});
//  end of adding to cart

//  function to create modal on image click
// this function adds eventlistener on each image
images.forEach((image) =>
  image.addEventListener("click", () => {
    createModal();
  })
);
const createModal = () => {
  const section = document.createElement("div");
  section.innerHTML = `
  <div class="images-container">
  <div  >
  
  <img
  src="./images/icon-previous.svg"
  alt="previous"
  class="previous nav"/>
  <div class="slider modal-slider">
  // <img src="./images/icon-plus.svg" alt="close" class="modal-close" />
      <img
        src="./images/image-product-1.jpg"
        alt="product-1"
        id="p1"
        class="p-img"
      />
      <img
        src="./images/image-product-2.jpg"
        alt="product-2"
        id="p2"
        class="p-img"
      />
      <img
        src="./images/image-product-3.jpg"
        alt="product-3"
        id="p3"
        class="p-img"
      />
      <img
        src="./images/image-product-4.jpg"
        alt="product-4"
        id="p4"
        class="p-img"
      />
    </div>
    <img src="./images/icon-next.svg" alt="next" class="next nav" />
    <div class="thumbnail-images">
      <img
        src="./images/image-product-1-thumbnail.jpg"
        class="thumb active"
      />
      <img src="./images/image-product-2-thumbnail.jpg" class="thumb" />
      <img src="./images/image-product-3-thumbnail.jpg" class="thumb" />
      <img src="./images/image-product-4-thumbnail.jpg" class="thumb" />
    </div>
  </div>
</div>
  `;
  imagesContainer.classList.add("modal");
  const productsPage = document.querySelector(".products-page");
  productsPage.appendChild(section);
};

// removing modal
imagesContainer.addEventListener("click", (e) => removeModal(e));

const removeModal = (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("modal");
  }
  if (e.target.classList.contains("modal-close")) {
    imagesContainer.classList.remove("modal");
  }
};

// slidding functionality
let count = 0;
const changeImage = () => {
  if (count > images.length - 1) {
    count = 0;
  } else if (count < 0) {
    count = images.length - 1;
  }
  images.forEach(
    (image) => (image.style.transform = `translateX(${-count * 100}%)`)
  );
};

const moveRight = () => {
  changeImage();
  swapThumbs();
};
const moveLeft = () => {
  changeImage();
  swapThumbs();
};

next.addEventListener("click", () => {
  count++;
  moveRight();
});
previous.addEventListener("click", () => {
  count--;
  moveLeft();
});
// sliding functionality

// toggle functionality for the cart
const cartVisiblityFunc = () => {
  cartModal.classList.toggle("show");
};

cartIcon.addEventListener("click", () => {
  cartVisiblityFunc();
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
