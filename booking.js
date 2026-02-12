let inventory = [];

async function loadInventory() {
    try {
        const response = await fetch('products.json');
        inventory = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

const productContainer = document.getElementById('product-container');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartTotalCount = document.getElementById('cart-total-count');
const cartBadgeCount = document.querySelector('.cart-count');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const toast = document.getElementById('toast');

let cart = [];
let currentTag = 'all';

// Initialize product display
function displayProducts() {
    productContainer.innerHTML = '';
    const filteredInventory = currentTag === 'all'
        ? inventory
        : inventory.filter(p => p.tags && p.tags.includes(currentTag));

    filteredInventory.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card glass product-card reveal';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-content">
                <div class="product-info">
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span class="product-category">${product.category}</span>
                        ${product.tags ? product.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                    </div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-stock">库存: ${product.stock}</div>
                </div>
                <div class="product-actions">
                    <div class="product-price">¥${product.price.toFixed(2)}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">加入订单</button>
                </div>
            </div>
        `;
        productContainer.appendChild(card);
    });

    // Add click event for buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(id) {
    const product = inventory.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
            showToast(`已增加一份 ${product.name}`);
        } else {
            showToast(`抱歉，该产品仅剩 ${product.stock} 件库存。`);
            return;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
        showToast(`${product.name} 已加入购物车！`);
    }

    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted)">¥${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div style="text-align: right;">
                <p>¥${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}" style="background: none; border: none; color: #ff4444; cursor: pointer; font-size: 0.8rem;">移除</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalPrice.innerText = `¥${total.toFixed(2)}`;
    cartTotalCount.innerText = count;
    cartBadgeCount.innerText = count;

    // Add events for remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            removeFromCart(id);
        });
    });
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function showToast(message) {
    toast.innerText = message;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3000);
}

// Event listeners
cartToggle.addEventListener('click', () => {
    cartDrawer.classList.toggle('open');
});

closeCart.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('您的购物车还是空的！');
        return;
    }
    alert('下单成功！由于微信收款限制，此处订单仅用于记录送货地址，请直接向 侯艳秋 付款。');
    cart = [];
    updateCartUI();
    cartDrawer.classList.remove('open');
});

// Initial product display
loadInventory();

// Tag filter click events
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update button status
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update tag and redraw products
        currentTag = btn.dataset.tag;
        displayProducts();
    });
});
