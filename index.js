// Cart state: keyed by id, value: { id, name, price, image, qty }
let cart = {};

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const raw = localStorage.getItem("green_earth_cart");
    if (raw) cart = JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to parse cart from storage", e);
    cart = {};
  }
};

const saveCartToStorage = () => {
  localStorage.setItem("green_earth_cart", JSON.stringify(cart));
};

const getCartItemsArray = () => Object.values(cart);

// Render cart into the #cart-items container
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container) return;
  container.innerHTML = "";
  const items = getCartItemsArray();
  if (items.length === 0) {
    container.innerHTML = `<div class=\"text-sm text-gray-600\">Your cart is empty.</div>`;
    if (totalEl) totalEl.textContent = "";
    return;
  }
  let total = 0;
  for (const it of items) {
    total += it.price * it.qty;
    const div = document.createElement("div");
    div.className =
      "p-1 bg-[#f0fdf4] rounded-md flex justify-between items-center";
    div.innerHTML = `
      <div class="flex gap-3 items-center">
        <img src="${it.image || ""}" alt="${
      it.name
    }" class="w-12 h-12 object-cover rounded" />
        <div>
          <div class="font-medium">${it.name}</div>
          <div class="text-sm text-gray-700">৳${it.price} x ${it.qty}</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button data-action="decrease" data-id="${
          it.id
        }" class="text-sm px-2 py-1 rounded">-</button>
        <button data-action="increase" data-id="${
          it.id
        }" class="text-sm px-2 py-1  rounded">+</button>
        <button data-action="remove" data-id="${
          it.id
        }" class="text-sm px-2 py-1 text-[#8C8C8C]">&times;</button>
      </div>
    `;
    container.appendChild(div);
  }
  if (totalEl) totalEl.textContent = `Total: ৳${total}`;
}

// Cart mutation helpers
function addToCart(item) {
  const id = item.id;
  if (!id) return;
  if (!cart[id]) {
    cart[id] = { ...item, qty: 0 };
  }
  cart[id].qty += 1;
  saveCartToStorage();
  renderCart();
}

function removeFromCart(id) {
  if (!cart[id]) return;
  delete cart[id];
  saveCartToStorage();
  renderCart();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  saveCartToStorage();
  renderCart();
}

// Wire event delegation: card add buttons and cart action buttons
const cardContainerEl = document.getElementById("card-container");
if (cardContainerEl) {
  cardContainerEl.addEventListener("click", function (e) {
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;
    // read data attributes from button
    const id = btn.dataset.id;
    const name =
      btn.dataset.name ||
      btn.dataset.title ||
      btn.dataset.productName ||
      btn.closest("#card")?.querySelector("h1")?.textContent?.trim();
    const price = Number(btn.dataset.price || btn.dataset.amount || 0) || 0;
    const image =
      btn.dataset.image ||
      btn.closest("#card")?.querySelector("img")?.src ||
      "";
    addToCart({ id, name, price, image });
    // small UI feedback
    btn.classList.add("opacity-80");
    setTimeout(() => btn.classList.remove("opacity-80"), 300);
  });
}

// Cart action delegation inside cart container
const cartContainer = document.getElementById("cart-items");
if (cartContainer) {
  cartContainer.addEventListener("click", function (e) {
    const actionBtn = e.target.closest("button[data-action]");
    if (!actionBtn) return;
    const id = actionBtn.dataset.id;
    const action = actionBtn.dataset.action;
    if (action === "remove") removeFromCart(id);
    else if (action === "increase") changeQty(id, 1);
    else if (action === "decrease") changeQty(id, -1);
  });
}

// initialize cart
loadCartFromStorage();
renderCart();

const loadAllTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants") //promise for response
    .then((res) => res.json()) //promise for data
    .then((data) => displayAllTrees(data.plants));
};
const loadAllCatatoriesNames = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayAllCatagoryNames(data.categories));
};
const loadTreeByCatagory = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTreeByCatagory(data.plants));
};
//for loadAll trees
const displayAllTrees = (all_trees) => {
  //1.get the container and empty
  //   console.log(all_trees);
  const allTreesContainer = document.getElementById("card-container");
  allTreesContainer.innerHTML = "";
  // 2. get into every lesson
  for (let tree of all_trees) {
    // 3. create a div
    const allTreeDiv = document.createElement("div");
    const treeId =
      tree.id ||
      tree._id ||
      tree.slug ||
      tree.name.replace(/\s+/g, "-").toLowerCase();
    allTreeDiv.innerHTML = `
        <div id="card" class="card">
                  <div
                    class="Normalcard bg-[#ffffff] w-full h-full  flex flex-col justify-between items-center mx-auto rounded-lg"
                  >
                    <div class="p-5 flex flex-col justify-between w-full flex-1">
                      <img
                        class="w-full max-w-[20rem] h-[12rem] object-cover bg-[#ededed] rounded-lg mx-auto"
                        src=${tree.image}
                        alt=""
                      />
                      <h1
                        class="text-[#1f2937] text-[1rem] font-[600] leading-[20px] py-2 text-center md:text-left"
                      >
                        ${tree.name}
                      </h1>
                      <p
                        class="text-[#1f2937] text-[0.875rem] font-[400] leading-[16px] opacity-80 py-2 text-center md:text-left"
                      >
                        ${tree.description.slice(0, 100)}...
                      </p>
                      <div
                        class="flex flex-col md:flex-row md:justify-between items-center py-2 gap-3 md:gap-0"
                      >
                        <div
                          class="btn btn-sm bg-[#DCFCE7] text-[#15803D] text-[1rem] border-none rounded-full px-4"
                        >
                          ${tree.category}
                        </div>
                        <span
                          class="text-[#1f2937] text-[1rem] font-[600] leading-[16px]"
                          >Price: ৳${tree.price}</span
                        >
                      </div>
                      <button
                        data-id="${treeId}"
                        data-name="${tree.name}"
                        data-price="${tree.price}"
                        data-image="${tree.image}"
                        class="btn w-full add-to-cart-btn bg-[#15803d] hover:bg-[#14532d] text-[#ffffff] text-[1rem] border-none rounded-full py-2 mt-2"
                      >
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
        `;
    // 4. append the div to the container
    allTreesContainer.appendChild(allTreeDiv);
  }
};
//display all catagories names
const displayAllCatagoryNames = (all_catagory) => {
  //   console.log(all_catagory);
  const btnCatagoryContainer = document.getElementById("catagory");
  //   btnCatagoryContainer.innerHTML = "";

  for (const catagory of all_catagory) {
    const catagoryBtnDiv = document.createElement("div");
    catagoryBtnDiv.innerHTML = `
        <button onclick='loadTreeByCatagory(${catagory.id})' class="px-1 py-1 bg-[#F0F0F0] rounded-md flex justify-start text-left hover:bg-[#15803d] hover:text-white">
            ${catagory.category_name}
        </button>
        `;
    btnCatagoryContainer.appendChild(catagoryBtnDiv);
  }
};

const displayTreeByCatagory = (trees) => {
  //   console.log(trees);
  const allTreeByCategory = document.getElementById("card-container");
  allTreeByCategory.innerHTML = "";
  for (const tree of trees) {
    const treeByCatagoryDiv = document.createElement("div");
    const treeId =
      tree.id ||
      tree._id ||
      tree.slug ||
      tree.name.replace(/\s+/g, "-").toLowerCase();
    treeByCatagoryDiv.innerHTML = `
            <div id="card" class="card">
                  <div
                    class="Normalcard bg-[#ffffff] w-full h-full  flex flex-col justify-between items-center mx-auto rounded-lg"
                  >
                    <div class="p-5 flex flex-col justify-between w-full flex-1">
                      <img
                        class="w-full max-w-[20rem] h-[12rem] object-cover bg-[#ededed] rounded-lg mx-auto"
                        src=${tree.image}
                        alt=""
                      />
                      <h1
                        class="text-[#1f2937] text-[1rem] font-[600] leading-[20px] py-2 text-center md:text-left"
                      >
                        ${tree.name}
                      </h1>
                      <p
                        class="text-[#1f2937] text-[0.875rem] font-[400] leading-[16px] opacity-80 py-2 text-center md:text-left"
                      >
                        ${tree.description.slice(0, 100)}...
                      </p>
                      <div
                        class="flex flex-col md:flex-row md:justify-between items-center py-2 gap-3 md:gap-0"
                      >
                        <div
                          class="btn btn-sm bg-[#DCFCE7] text-[#15803D] text-[1rem] border-none rounded-full px-4"
                        >
                          ${tree.category}
                        </div>
                        <span
                          class="text-[#1f2937] text-[1rem] font-[600] leading-[16px]"
                          >Price: ৳${tree.price}</span
                        >
                      </div>
                      <button data-id="${treeId}"
                        data-name="${tree.name}"
                        data-price="${tree.price}"
                        data-image="${tree.image}"
                        class="btn add-to-cart-btn w-full bg-[#15803d] hover:bg-[#14532d] text-[#ffffff] text-[1rem] border-none rounded-full py-3 px-2 mt-2"
                      >
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
    `;
    allTreeByCategory.appendChild(treeByCatagoryDiv);
  }
};

loadAllCatatoriesNames();
