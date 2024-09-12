const products = [
  {
    name: 'Sony Playstation 5',
    url: 'playstation_5.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'samsung_galaxy.png',
    type: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'cannon_eos_camera.png',
    type: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'sony_a7_camera.png',
    type: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'lg_tv.png',
    type: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'nintendo_switch.png',
    type: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'xbox_series_x.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'samsung_tv.png',
    type: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'google_pixel.png',
    type: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'sony_zv1f_camera.png',
    type: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'toshiba_tv.png',
    type: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'iphone_14.png',
    type: 'smartphones',
    price: 999.99,
  },
];
const productsWrapper = document.getElementById('products-wrapper');
const checkEl = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartBtn = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');

//Initialize the cart element count
let cartItemCount = 0;
const productsEls = [];
//Loop over the products and create the product element
products.forEach((product) => {
  const productEl = createProductElement(product);
  productsEls.push(productEl);
  productsWrapper.appendChild(productEl);
});
//Add filter event listeners
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);
function createProductElement(product) {
  const productEl = document.createElement('div');
  productEl.className = 'item space-y-2';
  productEl.innerHTML = `
    <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border">
       <img src="assets/images/${product.url}" alt="${product.name}" class="w-full h-full object-cover"/>
         <span class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
            Add To Cart
         </span>
    </div>
    <p class="text-xl">${product.name}</p>
    <strong>$${product.price.toLocaleString()}</strong>
  `;
  productEl.querySelector('.status').addEventListener('click', addToCart)
  return productEl;
}

function addToCart(e) {
  const statusEl = e.target;
  if(statusEl.classList.contains('added')) {
    statusEl.classList.remove('added');
    statusEl.innerText = 'Add To Cart';
    statusEl.classList.remove('bg-red-700');
    statusEl.classList.add('bg-gray-800');
    cartItemCount--;
  } else {
    statusEl.classList.add('added');
    statusEl.innerText = 'Remove From Cart';
    statusEl.classList.remove('bg-gray-800');
    statusEl.classList.add('bg-red-700');
    cartItemCount++;
  }
  //Update cartItemCount
  cartCount.innerText = cartItemCount.toString();
}

//Filter products by search or checkbox
function filterProducts() {
  //Get search term
  const searchTerm = searchInput.value.trim().toLowerCase();
  //get checked categories
  const checkedCategories = Array.from(checkEl)
      .filter(check => check.checked)
      .map(check => check.id);
  //Loop over products and check for matches
  productsEls.forEach((productEl, index) => {
    const product = products[index];
    //Check to see if product matches search or checked items
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInCheckedCategory = checkedCategories.length === 0 ||
        checkedCategories.includes(product.type);
    //Show or hide the products based on matches
    if(matchesSearchTerm && isInCheckedCategory) {
      productEl.classList.remove('hidden');
    } else {
      productEl.classList.add('hidden');
    }
  })
}
