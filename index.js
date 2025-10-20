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
                        class="btn w-full bg-[#15803d] hover:bg-[#14532d] text-[#ffffff] text-[1rem] border-none rounded-full py-2 mt-2"
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
  console.log(trees);
  const allTreeByCategory = document.getElementById("card-container");
  allTreeByCategory.innerHTML = "";
  for (const tree of trees) {
    const treeByCatagoryDiv = document.createElement("div");
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
                      <button
                        class="btn w-full bg-[#15803d] hover:bg-[#14532d] text-[#ffffff] text-[1rem] border-none rounded-full py-2 mt-2"
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
