 const products = [
      {id:1, name:"Ak47 ", price:299.99, image:"../assets/ak47.png", description:"A NEW AK-style with a curved magazine and classic silhouette made for long and short distance very easy to use", category:"guns", isNew:true},
      {id:2, name:"Mp 40", price:159.99, image:"../assets/mp40.jpg", description:"MP40  with its iconic folding stock and streamlined shape made purely for short distance only.", category:"guns"},
      {id:3, name:"Pump", price:79.99, image:"../assets/pump.png", description:" shotgun  featuring a short barrel and sliding foregrip made purely for short distance ", category:"guns"},
      {id:4, name:" kar98k", price:189.99, image:"../assets/kar.jpeg", description:"a classic sniper with its classic wooden-stock look and bolt-action detail made purely", category:"guns"},
      {id:5, name:"Helmet", price:39.99, image:"../assets/helmet.jpeg", description:"Official insignia helmet in various designs.", category:"accessories"},
      {id:6, name:"full army outfit", price:1290.99, image:"../assets/outfit.jpeg", description:"A compact, stylized military outfit featuring a fitted uniform, tactical vest, and basic gear details made for display or costume use..", category:"clothing"},
      {id:6, name:"Mask", price:30.99, image:"../assets/mask.jpeg", description:"dont breadh jews fart", category:"accessories"},
      {id:6, name:"Credit Card 3000€", price:59.99, image:"../assets/visa.jpeg", description:"dont use it in this shop!", category:"exiclusives"},
      {id:6, name:"Credit Card 1300€", price:40.99, image:"../assets/vis.jpeg", description:"dont use it in this shop!", category:"exiclusives"},
      {id:6, name:"jew soap ", price:300.99, image:"../assets/soap.jpeg", description:"aged soap", category:"exiclusives"}
    ];

    let cart = [];
    let productQuantities = {};
    products.forEach(p => productQuantities[p.id] = 1);

    function renderProducts(filter = 'all') {
      const container = document.getElementById('productsContainer');
      container.innerHTML = '';
      products.filter(p => filter === 'all' || p.category === filter).forEach((p, i) => {
        container.innerHTML += `
          <div class="col-md-4" data-aos="fade-up" data-aos-duration="${1000 + i*200}">
            <div class="product-card ${p.isNew ? 'new-item' : ''}">
              ${p.isNew ? '<div class="new-badge">🌟 New!</div>' : ''}
              <img src="${p.image}" alt="${p.name}">
              <div class="product-title">${p.name}</div>
              <div class="product-description">${p.description}</div>
              <div class="product-price">€${p.price.toFixed(2)}</div>
              <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQty(${p.id}, -1)">-</button>
                <span class="quantity-display" id="qty-${p.id}">1</span>
                <button class="quantity-btn" onclick="changeQty(${p.id}, 1)">+</button>
              </div>
              <button class="btn-buy" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
          </div>
        `;
      });
    }

    function changeQty(id, delta) {
      productQuantities[id] = Math.max(1, productQuantities[id] + delta);
      document.getElementById(`qty-${id}`).textContent = productQuantities[id];
    }

    function addToCart(id) {
      const product = products.find(p => p.id === id);
      const qty = productQuantities[id];
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({...product, quantity: qty});
      }
      updateCart();
      document.getElementById('cartPanel').classList.add('open');
    }

    function updateCart() {
      const cartItems = document.getElementById('cartItems');
      const cartBadge = document.getElementById('cartBadge');
      const cartTotal = document.getElementById('cartTotal');
      const totalPrice = document.getElementById('totalPrice');

      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      cartBadge.textContent = totalItems;

      if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.style.display = 'none';
      } else {
        cartItems.innerHTML = cart.map(item => `
          <div class="cart-item">
            <div class="cart-item-content">
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">€${item.price.toFixed(2)} each</div>
              </div>
            </div>
            <div class="cart-item-controls">
              <div class="cart-quantity-controls">
                <button class="cart-quantity-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                <span class="cart-quantity">${item.quantity}</span>
                <button class="cart-quantity-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
              </div>
              <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        `).join('');
        cartTotal.style.display = 'block';
        totalPrice.textContent = totalCost.toFixed(2);
      }
    }

    function updateCartQty(id, delta) {
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          removeFromCart(id);
        } else {
          updateCart();
        }
      }
    }

    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      updateCart();
    }

    document.getElementById('cartIcon').onclick = () => document.getElementById('cartPanel').classList.add('open');
    document.getElementById('closeCart').onclick = () => document.getElementById('cartPanel').classList.remove('open');
    document.getElementById('checkoutBtn').onclick = () => {
      alert(`Order placed! Total: €${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
      cart = [];
      updateCart();
      document.getElementById('cartPanel').classList.remove('open');
    };

    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.onclick = function() {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProducts(this.dataset.category);
      };
    });

    const audio = document.getElementById("bgAudio");
    const player = document.getElementById("player");
    const rotImg = document.getElementById("rotimg");
    audio.play().catch(() => {});
    player.onclick = () => {
      if (audio.paused) {
        audio.play();
        rotImg.style.animationPlayState = "running";
      } else {
        audio.pause();
        rotImg.style.animationPlayState = "paused";
      }
    };

    renderProducts();