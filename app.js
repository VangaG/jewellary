const products = [
  { id: 1, name: "Gold Necklace", price: 599.99, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Silver Bracelet", price: 199.99, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Diamond Ring", price: 999.99, image: "https://via.placeholder.com/150" },
]

let cart = []
const orders = []

function renderProducts() {
  const productsHTML = products
    .map(
      (product) => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `,
    )
    .join("")

  document.getElementById("app").innerHTML = `
        <h2>Our Products</h2>
        <div id="products">${productsHTML}</div>
    `
}

function renderCart() {
  const cartItemsHTML = cart
    .map(
      (item) => `
        <li>
            ${item.name} - $${item.price}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </li>
    `,
    )
    .join("")

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  document.getElementById("app").innerHTML = `
        <h2>Your Cart</h2>
        <ul id="cart-items">${cartItemsHTML}</ul>
        <p>Total: $${total.toFixed(2)}</p>
        <button onclick="checkout()">Checkout</button>
    `
}

function renderOrders() {
  const ordersHTML = orders
    .map(
      (order) => `
        <li>
            Order #${order.id} - Total: $${order.total.toFixed(2)}
            <ul>
                ${order.items.map((item) => `<li>${item.name} - $${item.price}</li>`).join("")}
            </ul>
        </li>
    `,
    )
    .join("")

  document.getElementById("app").innerHTML = `
        <h2>Your Orders</h2>
        <ul id="orders-list">${ordersHTML}</ul>
    `
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (product) {
    cart.push({ ...product })
    alert(`${product.name} added to cart!`)
  }
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId)
  if (index !== -1) {
    cart.splice(index, 1)
    renderCart()
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const order = {
    id: orders.length + 1,
    items: [...cart],
    total: total,
  }

  orders.push(order)
  cart = []
  alert(`Order placed! Total: $${total.toFixed(2)}`)
  renderOrders()
}

// Navigation
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a")
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const page = e.target.getAttribute("href").substring(1)
      switch (page) {
        case "home":
        case "products":
          renderProducts()
          break
        case "cart":
          renderCart()
          break
        case "orders":
          renderOrders()
          break
      }
    })
  })

  // Initial render
  renderProducts()
})

