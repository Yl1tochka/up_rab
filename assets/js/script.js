document.addEventListener("DOMContentLoaded", function () {
  // Бургер-меню
  const burgerMenu = document.getElementById("burger-menu");
  const mobileNav = document.getElementById("mobile-nav");
  if (burgerMenu && mobileNav) {
    burgerMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });
  }

  // Мобильное выпадающее меню
  const mobileDropdowns = document.querySelectorAll(".mobile-nav .dropdown > a");
  mobileDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      if (menu) menu.classList.toggle("active");
    });
  });

  // Переключение темы
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMob = document.getElementById("theme-toggle-mob");
  const themeStyle = document.getElementById("theme-style");

  if (themeToggle && themeStyle) {
    if (localStorage.getItem("theme") === "dark") {
      themeStyle.removeAttribute("disabled");
      themeToggle.innerHTML = '<i class="fa fa-star"></i>';
    }
    themeToggle.addEventListener("click", function () {
      if (themeStyle.disabled) {
        themeStyle.removeAttribute("disabled");
        localStorage.setItem("theme", "dark");
        this.innerHTML = '<i class="fa fa-star"></i>';
      } else {
        themeStyle.setAttribute("disabled", "true");
        localStorage.setItem("theme", "light");
        this.innerHTML = '<i class="fas fa-star-half"></i>';
      }
    });
  }
  if (themeToggleMob && themeStyle) {
    if (localStorage.getItem("theme") === "dark") {
      themeStyle.removeAttribute("disabled");
      themeToggleMob.innerHTML = '<i class="fa fa-star"></i>';
    }
    themeToggleMob.addEventListener("click", function () {
      if (themeStyle.disabled) {
        themeStyle.removeAttribute("disabled");
        localStorage.setItem("theme", "dark");
        this.innerHTML = '<i class="fa fa-star"></i>';
      } else {
        themeStyle.setAttribute("disabled", "true");
        localStorage.setItem("theme", "light");
        this.innerHTML = '<i class="fas fa-star-half"></i>';
      }
    });
  }

  // Табы на странице товара
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(tabId)?.classList.add("active");
    });
  });

  // Миниатюры товара
  const thumbnails = document.querySelectorAll(".thumbnail-images img");
  const mainImage = document.getElementById("main-product-image");
  if (thumbnails.length && mainImage) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        thumbnails.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        mainImage.src = this.src.replace("-thumb", "-large");
      });
    });
  }

  // Количество товара
  const minusBtns = document.querySelectorAll(".quantity-btn.minus");
  const plusBtns = document.querySelectorAll(".quantity-btn.plus");

  minusBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.nextElementSibling;
      if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
      }
    });
  });

  plusBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.previousElementSibling;
      if (input) {
        input.value = parseInt(input.value) + 1;
      }
    });
  });

  // Обновляем счетчик корзины
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = totalItems;
    });
  }

  updateCartCount();

  // Авторизация и аккаунт
  const accountBtn = document.getElementById("account-btn");
  const accountDropdown = document.getElementById("account-dropdown");
  const authModal = document.getElementById("auth-modal");

  if (accountBtn) {
    accountBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        if (authModal) authModal.classList.add("active");
      } else {
        if (accountDropdown) accountDropdown.classList.toggle("show");
      }
    });

    document.addEventListener("click", function (e) {
      if (
        accountBtn &&
        !accountBtn.contains(e.target) &&
        !accountDropdown?.contains(e.target)
      ) {
        if (accountDropdown) accountDropdown.classList.remove("show");
      }
    });

    if (authModal) {
      document.getElementById("close-auth-modal")?.addEventListener("click", () => {
        authModal.classList.remove("active");
      });
    }
  }

  // Табы в модальном окне: Вход / Регистрация
  const tabButtons = document.querySelectorAll('.auth-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(tabId)?.classList.add('active');
    });
  });

  // Регистрация
  document.getElementById("register-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reg-name")?.value || "";
    const email = document.getElementById("reg-email")?.value || "";
    const phone = document.getElementById("reg-phone")?.value || "";
    const password = document.getElementById("reg-password")?.value || "";
    const confirmPassword = document.getElementById("reg-confirm-password")?.value || "";

    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      alert("Пользователь с таким email уже существует.");
      return;
    }

    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    alert("Регистрация успешна!");
    window.location.href = "./assets/page/account.html";
  });

  // Авторизация
  document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email")?.value || "";
    const password = document.getElementById("login-password")?.value || "";
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Вы вошли!");
      window.location.href = "./assets/page/account.html";
    } else {
      alert("Неверный email или пароль.");
    }
  });

  // Обновление интерфейса пользователя
  function updateUI() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const accountNameEl = document.getElementById("account-name");
    const accountLink = document.getElementById("account-link");
    const logoutBtn = document.getElementById("logout-btn");

    if (user) {
      if (accountNameEl) accountNameEl.textContent = user.name.split(" ")[0];
      if (accountLink) accountLink.style.display = "flex";
      if (logoutBtn) logoutBtn.style.display = "flex";
    } else {
      if (accountNameEl) accountNameEl.textContent = "";
      if (accountLink) accountLink.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  document.getElementById("logout-btn")?.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    updateUI();
    window.location.href = "./index.html";
  });

  updateUI();

  // Добавление товара в корзину
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const productCard = this.closest(".service-card") || this.closest(".product-details");
      const productName = productCard.querySelector("h3")?.textContent ||
        productCard.querySelector("h1")?.textContent;
      const productPrice = parseInt(productCard.querySelector(".price")?.textContent || 0);
      const productImage = productCard.querySelector("img")?.src;

      let quantity = 1;
      const quantityInput = this.closest(".product-actions")?.querySelector(".quantity-input");
      if (quantityInput) quantity = parseInt(quantityInput.value);

      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
        status: "planned",
        date: new Date().toISOString(),
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex((item) => item.id === productId);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert("Товар добавлен в корзину!");
    });
  });

  // Отображение товаров в корзине
  function displayCartItems() {
    const cartContainer = document.querySelector(".cart-items");
    const cartSummary = document.querySelector(".cart-summary");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Ваша корзина пуста</p>";
      if (cartSummary) cartSummary.style.display = "none";
      return;
    }

    cartContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.setAttribute("data-id", item.id);
      cartItem.innerHTML = `
        <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
        <div class="item-details">
          <h3>${item.name}</h3>
          <div class="item-meta">
            <span class="price">${item.price} руб.</span>
          </div>
        </div>
        <div class="item-controls">
          <div class="quantity-selector">
            <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
            <input type="number" value="${item.quantity}" min="1" class="quantity-input">
            <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
          </div>
          <div class="item-price">${item.price * item.quantity} руб.</div>
          <button class="remove-item"><i class="fas fa-trash"></i></button>
        </div>`;
      cartContainer.appendChild(cartItem);
    });

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "cart-actions";
    actionsDiv.innerHTML = `
      <button class="continue-shopping">Продолжить покупки</button>
      <button class="clear-cart">Очистить корзину</button>`;
    cartContainer.appendChild(actionsDiv);

    const firstSummary = document.querySelector(".summary-row:nth-child(1) span:last-child");
    if (firstSummary) {
      firstSummary.textContent = `${totalPrice} руб.`;
    }

    const totalSummary = document.querySelector(".summary-row.total span:last-child");
    if (totalSummary) {
      totalSummary.textContent = `${totalPrice - 500} руб.`;
    }

    document.querySelector(".continue-shopping")?.addEventListener("click", () => {
      window.location.href = "catalog.html";
    });

    document.querySelector(".clear-cart")?.addEventListener("click", () => {
      localStorage.removeItem("cart");
      displayCartItems();
      updateCartCount();
    });

    document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = this.nextElementSibling;
        if (parseInt(input.value) > 1) {
          input.value = parseInt(input.value) - 1;
          updateCartItem(this.closest(".cart-item").getAttribute("data-id"), parseInt(input.value));
        }
      });
    });

    document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = this.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        updateCartItem(this.closest(".cart-item").getAttribute("data-id"), parseInt(input.value));
      });
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemId = this.closest(".cart-item").getAttribute("data-id");
        removeCartItem(itemId);
      });
    });
  }

  function updateCartItem(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
      updateCartCount();
    }
  }

  function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
  }

  if (document.querySelector(".cart-page")) {
    displayCartItems();
  }

  // График популярности услуг
  if (document.getElementById("servicesChart")) {
    const ctx = document.getElementById("servicesChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Уход за лицом", "Массаж", "Маникюр", "Депиляция", "Уход за телом", "SPA"],
        datasets: [{
          label: "Популярность услуг",
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: [
            "rgba(255, 107, 129, 0.7)", "rgba(165, 94, 234, 0.7)",
            "rgba(43, 203, 186, 0.7)", "rgba(253, 203, 110, 0.7)",
            "rgba(75, 123, 236, 0.7)", "rgba(240, 147, 43, 0.7)"
          ],
          borderColor: [
            "rgba(255, 107, 129, 1)", "rgba(165, 94, 234, 1)",
            "rgba(43, 203, 186, 1)", "rgba(253, 203, 110, 1)",
            "rgba(75, 123, 236, 1)", "rgba(240, 147, 43, 1)"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

});
if (document.getElementById("category-filter")) {
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".service-card");
    const searchInput = document.getElementById("service-search");
    const categoryFilter = document.getElementById("category-filter");
    const priceSort = document.getElementById("price-sort");
    // -----------------------------------------------------------

    function filterAndSortServices() {
      // Получаем значения фильтров
      const query = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      const sort = priceSort.value;

      // Преобразуем NodeList в массив для удобной работы
      const servicesArray = Array.from(cards);

      // Фильтрация по поиску и категории
      let filtered = servicesArray.filter(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const cardCategory = card.getAttribute("data-category");
        return (
          title.includes(query) &&
          (category === "all" || cardCategory === category)
        );
      });

      // Сортировка
      if (sort === "price-asc") {
        filtered.sort((a, b) => {
          const priceA = parseInt(a.querySelector(".price").textContent);
          const priceB = parseInt(b.querySelector(".price").textContent);
          return priceA - priceB;
        });
      } else if (sort === "price-desc") {
        filtered.sort((a, b) => {
          const priceA = parseInt(a.querySelector(".price").textContent);
          const priceB = parseInt(b.querySelector(".price").textContent);
          return priceB - priceA;
        });
      } else if (sort === "popular") {
        filtered.sort((a, b) => {
          const popA = a.getAttribute("data-popularity") === "high" ? 1 : 0;
          const popB = b.getAttribute("data-popularity") === "high" ? 1 : 0;
          return popB - popA;
        });
      }

      // Очищаем контейнер
      const grid = document.querySelector(".services-grid");
      grid.innerHTML = "";

      // Добавляем отфильтрованные/отсортированные карточки
      filtered.forEach(card => {
        grid.appendChild(card.cloneNode(true));
      });
    }
    // ---------------------------------------------------------------------------------------------

    // Обработчики событий
    searchInput?.addEventListener("input", filterAndSortServices);
    categoryFilter?.addEventListener("change", filterAndSortServices);
    priceSort?.addEventListener("change", filterAndSortServices);

    // Вызываем функцию при загрузке страницы
    filterAndSortServices();
  });
}

if (document.getElementById('add-service-btn')) {


  document.addEventListener('DOMContentLoaded', function () {
    // Пример данных (в реальном приложении эти данные будут загружаться с сервера)
    let services = [
      {
        id: 1,
        name: "Комплексный уход за лицом",
        category: "face",
        price: 3500,
        duration: 90,
        description: "Полный комплекс процедур по уходу за кожей лица, включая чистку, массаж и маску.",
        image: "../media/card_img.jpeg"
      },
      {
        id: 2,
        name: "Антицеллюлитный массаж",
        category: "massage",
        price: 2500,
        duration: 60,
        description: "Специальный массаж, направленный на борьбу с целлюлитом и улучшение состояния кожи.",
        image: "../media/card2.webp"
      },
      {
        id: 3,
        name: "Комплексный маникюр",
        category: "nails",
        price: 1800,
        duration: 60,
        description: "Уход за ногтями и кожей рук, включая обработку ногтей, кутикулы и покрытие.",
        image: "../media/card3.webp"
      },
      {
        id: 4,
        name: "Восковая депиляция ног",
        category: "hair-removal",
        price: 2000,
        duration: 45,
        description: "Удаление волос с ног с использованием воска для длительного результата.",
        image: "../media/card4.webp"
      }
    ];

    // Элементы DOM
    const servicesList = document.getElementById('services-list');
    const addServiceBtn = document.getElementById('add-service-btn');
    const serviceModal = document.getElementById('service-modal');
    const confirmModal = document.getElementById('confirm-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .cancel-btn');
    const serviceForm = document.getElementById('service-form');
    const modalTitle = document.getElementById('modal-title');
    const submitBtn = document.getElementById('submit-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const serviceImageInput = document.getElementById('service-image');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const serviceSearch = document.getElementById('service-search');

    // Переменные состояния
    let currentPage = 1;
    const itemsPerPage = 5;
    let currentServiceId = null;
    let isEditing = false;

    // Инициализация
    renderServices();

    // Открытие модального окна для добавления услуги
    addServiceBtn.addEventListener('click', () => {
      isEditing = false;
      modalTitle.textContent = 'Добавить новую услугу';
      submitBtn.textContent = 'Добавить';
      serviceForm.reset();
      imagePreviewContainer.style.display = 'none';
      serviceModal.style.display = 'blok';
    });


    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        serviceModal.style.display = 'none';
      }
      if (e.target === confirmModal) {
        confirmModal.style.display = 'none';
      }
    });



    // Функция для отображения услуг
    function renderServices(filteredServices = services) {
      servicesList.innerHTML = '';

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedServices = filteredServices.slice(startIndex, endIndex);

      if (paginatedServices.length === 0) {
        servicesList.innerHTML = '<tr><td colspan="7" style="text-align: center;">Услуги не найдены</td></tr>';
        return;
      }

      paginatedServices.forEach(service => {
        const row = document.createElement('tr');

        row.innerHTML = `
              <td>${service.id}</td>
              <td><img src="${service.image}" class="service-image-preview" alt="${service.name}"></td>
              <td>${service.name}</td>
              <td>${getCategoryName(service.category)}</td>
              <td>${service.price} руб.</td>
              <td>${service.duration} мин.</td>
              <td>
                  <button class="action-btn edit-btn" data-id="${service.id}">
                      <i class="fas fa-edit"></i> Изменить
                  </button>
                  <button class="action-btn delete-btn" data-id="${service.id}">
                      <i class="fas fa-trash"></i> Удалить
                  </button>
              </td>
          `;

        servicesList.appendChild(row);
      });


    }

    // Редактирование услуги
    function editService(id) {
      const service = services.find(s => s.id === id);
      if (service) {
        isEditing = true;
        currentServiceId = id;
        modalTitle.textContent = 'Редактировать услугу';
        submitBtn.textContent = 'Сохранить';

        document.getElementById('service-id').value = service.id;
        document.getElementById('service-name').value = service.name;
        document.getElementById('service-category').value = service.category;
        document.getElementById('service-price').value = service.price;
        document.getElementById('service-duration').value = service.duration;
        document.getElementById('service-description').value = service.description;

        if (service.image) {
          imagePreview.src = service.image;
          imagePreviewContainer.style.display = 'block';
        } else {
          imagePreviewContainer.style.display = 'none';
        }

        serviceModal.style.display = 'block';
      }
    }

    // Поиск услуг
    serviceSearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm) {
        const filtered = services.filter(service =>
          service.name.toLowerCase().includes(searchTerm) ||
          getCategoryName(service.category).toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm)
        );
        renderServices(filtered);
      } else {
        renderServices();
      }
    });

    // Вспомогательная функция для получения названия категории
    function getCategoryName(category) {
      const categories = {
        'face': 'Уход за лицом',
        'massage': 'Массажи',
        'nails': 'Маникюр/Педикюр',
        'hair-removal': 'Депиляция',
        'body': 'Уход за телом',
        'hair': 'Уход за волосами'
      };
      return categories[category] || category;
    }
  });
}