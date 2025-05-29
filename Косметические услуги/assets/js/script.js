document.addEventListener("DOMContentLoaded", function () {
  // Бургер-меню
  const burgerMenu = document.getElementById("burger-menu");
  const mobileNav = document.getElementById("mobile-nav");

  burgerMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });

  // Мобильное выпадающее меню
  const mobileDropdowns = document.querySelectorAll(
    ".mobile-nav .dropdown > a"
  );

  mobileDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      menu.classList.toggle("active");
    });
  });

  // Переключение темы
  const themeToggle = document.getElementById("theme-toggle");
  const themeStyle = document.getElementById("theme-style");

  // Проверяем сохраненную тему
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
      this.innerHTML = '<i class="fas fas fa-star-half"></i>';
    }
  });

  // Табы на странице товара
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Удаляем активные классы у всех кнопок и панелей
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));

      // Добавляем активные классы текущей кнопке и панели
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Миниатюры товара
  const thumbnails = document.querySelectorAll(".thumbnail-images img");
  const mainImage = document.getElementById("main-product-image");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      // Удаляем активный класс у всех миниатюр
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Добавляем активный класс текущей миниатюре
      this.classList.add("active");

      // Меняем основное изображение
      mainImage.src = this.src.replace("-thumb", "-large");
    });
  });

  // Количество товара
  const minusBtns = document.querySelectorAll(".quantity-btn.minus");
  const plusBtns = document.querySelectorAll(".quantity-btn.plus");
  const quantityInputs = document.querySelectorAll(".quantity-input");

  minusBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.nextElementSibling;
      if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
      }
    });
  });

  plusBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.previousElementSibling;
      input.value = parseInt(input.value) + 1;
    });
  });

  // Обновляем счетчик корзины
  updateCartCount();
});

// Функция для обновления счетчика корзины
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = totalItems;
  });
}
if("accountBtn"){
  document.addEventListener("DOMContentLoaded", function () {
  const accountBtn = document.getElementById("account-btn");
  const accountDropdown = document.getElementById("account-dropdown");
  const authModal = document.getElementById("auth-modal");

  // Обработчик клика по кнопке аккаунта
  
  accountBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      // Открываем модальное окно
      authModal.classList.add("active");
    } else {
      // Показываем dropdown
      accountDropdown.classList.toggle("show");
    }
  });

  // Закрытие dropdown при клике вне его
  if (accountBtn) {
    document.addEventListener("click", function (e) {
      if (
        !accountBtn.contains(e.target) &&
        !accountDropdown.contains(e.target)
      ) {
        accountDropdown.classList.remove("show");
      }
    });
  }

  // Закрытие модального окна
  if (authModal) {
    document
      .getElementById("close-auth-modal")
      .addEventListener("click", () => {
        authModal.classList.remove("active");
      });
  }

  // Переключение табов
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Регистрация
  document
    .getElementById("register-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      const phone = document.getElementById("reg-phone").value;
      const password = document.getElementById("reg-password").value;
      const confirmPassword = document.getElementById(
        "reg-confirm-password"
      ).value;

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
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Вы вошли!");
        window.location.href = "./assets/page/account.html";
      } else {
        alert("Неверный email или пароль.");
      }
    });

  // Обновление интерфейса
  function updateUI() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const accountNameEl = document.getElementById("account-name");
    const accountLink = document.getElementById("account-link");
    const logoutBtn = document.getElementById("logout-btn");

    if (user) {
      accountNameEl.textContent = user.name.split(" ")[0];
      accountLink.style.display = "flex";
      logoutBtn.style.display = "flex";
    } else {
      accountNameEl.textContent = "";
      accountLink.style.display = "none";
      logoutBtn.style.display = "none";
    }
  }

  // Выход
  if ("logout-btn") {
    document.getElementById("logout-btn").addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        updateUI();
        window.location.href = "./index.html";
      });
  }

  updateUI();
});
}


// Функция для проверки авторизации
function checkAuth() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    updateUserUI();
  }
}
// Функция для обновления интерфейса после авторизации
function updateUserUI() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const accountBtn = document.querySelector(".account-btn");

  if (currentUser && accountBtn) {
    // Можно добавить аватар или имя пользователя
    accountBtn.innerHTML = `<i class="fas fa-user"></i> ${
      currentUser.name.split(" ")[0]
    }`;
  }
}

// Функция для выхода из системы
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
  // Добавление товара в корзину
  const addToCartBtns = document.querySelectorAll(".add-to-cart");

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const productName = this.closest(".service-card")
        ? this.closest(".service-card").querySelector("h3").textContent
        : this.closest(".product-details").querySelector("h1").textContent;
      const productPrice = this.closest(".service-card")
        ? parseInt(
            this.closest(".service-card").querySelector(".price").textContent
          )
        : parseInt(
            this.closest(".product-details").querySelector(".price").textContent
          );
      const productImage = this.closest(".service-card")
        ? this.closest(".service-card").querySelector("img").src
        : this.closest(".product-details").previousElementSibling.querySelector(
            "img"
          ).src;

      // Получаем количество (для страницы товара)
      let quantity = 1;
      const quantityInput = this.closest(".product-actions")
        ? this.closest(".product-actions").querySelector(".quantity-input")
        : null;

      if (quantityInput) {
        quantity = parseInt(quantityInput.value);
      }

      // Создаем объект товара
      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
        status: "planned",
        date: new Date().toISOString(),
      };

      // Получаем текущую корзину из localStorage или создаем пустую
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = cart.findIndex((item) => item.id === productId);

      if (existingItemIndex !== -1) {
        // Если товар уже есть, увеличиваем количество
        cart[existingItemIndex].quantity += quantity;
      } else {
        // Если товара нет, добавляем его
        cart.push(product);
      }

      // Сохраняем корзину в localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Обновляем счетчик корзины
      updateCartCount();

      // Показываем уведомление
      alert("Товар добавлен в корзину!");
    });
  });

  // Если мы на странице корзины, отображаем товары
  if (document.querySelector(".cart-page")) {
    displayCartItems();

    // Обработчики для изменения количества
    document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = this.nextElementSibling;
        if (parseInt(input.value) > 1) {
          input.value = parseInt(input.value) - 1;
          updateCartItem(
            this.closest(".cart-item").getAttribute("data-id"),
            parseInt(input.value)
          );
        }
      });
    });

    document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = this.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        updateCartItem(
          this.closest(".cart-item").getAttribute("data-id"),
          parseInt(input.value)
        );
      });
    });

    // Удаление товара из корзины
    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemId = this.closest(".cart-item").getAttribute("data-id");
        removeCartItem(itemId);
      });
    });
    // Очистка корзины
    const clearCartBtn = document.querySelector(".clear-cart");
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", function () {
        localStorage.removeItem("cart");
        displayCartItems();
        updateCartCount();
      });
    }
  }
});

// Функция для отображения товаров в корзине
function displayCartItems() {
  const cartContainer = document.querySelector(".cart-items");
  const cartSummary = document.querySelector(".cart-summary");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Ваша корзина пуста</p>";
    cartSummary.style.display = "none";
    return;
  }

  // Очищаем контейнер
  cartContainer.innerHTML = "";

  // Создаем элементы для каждого товара
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.setAttribute("data-id", item.id);

    cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-description">${item.description || ""}</p>
                <div class="item-meta">
                    <span class="price">${item.price} руб.</span>
                    <span class="status ${item.status}">${getStatusText(
      item.status,
      item.date
    )}</span>
                </div>
            </div>
            <div class="item-controls">
                <div class="quantity-selector">
                    <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                    <input type="number" value="${
                      item.quantity
                    }" min="1" class="quantity-input">
                    <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                </div>
                <div class="item-price">${item.price * item.quantity} руб.</div>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            </div>
        `;

    cartContainer.appendChild(cartItem);
  });

  // Добавляем кнопки действий
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "cart-actions";
  actionsDiv.innerHTML = `
        <button class="continue-shopping">Продолжить покупки</button>
        <button class="clear-cart">Очистить корзину</button>
    `;

  cartContainer.appendChild(actionsDiv);

  // Обновляем итоговую сумму
  document.querySelector(
    ".summary-row:nth-child(1) span:last-child"
  ).textContent = `${totalPrice} руб.`;
  document.querySelector(".summary-row.total span:last-child").textContent = `${
    totalPrice - 500
  } руб.`;

  // Обработчики для новых кнопок
  document
    .querySelector(".continue-shopping")
    .addEventListener("click", function () {
      window.location.href = "catalog.html";
    });

  document.querySelector(".clear-cart").addEventListener("click", function () {
    localStorage.removeItem("cart");
    displayCartItems();
    updateCartCount();
  });
}

// Функция для обновления количества товара в корзине
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

// Функция для удаления товара из корзины
function removeCartItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}
// Функция для получения текста статуса
function getStatusText(status, date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", options);

  switch (status) {
    case "planned":
      return `Запланировано на ${formattedDate}`;
    case "in-progress":
      return `В процессе (${formattedDate})`;
    case "completed":
      return `Завершено (${formattedDate})`;
    default:
      return `Запланировано на ${formattedDate}`;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация графиков
  if (document.getElementById("servicesChart")) {
    const ctx = document.getElementById("servicesChart").getContext("2d");
    const servicesChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Уход за лицом",
          "Массаж",
          "Маникюр",
          "Депиляция",
          "Уход за телом",
          "SPA",
        ],
        datasets: [
          {
            label: "Популярность услуг",
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: [
              "rgba(255, 107, 129, 0.7)",
              "rgba(165, 94, 234, 0.7)",
              "rgba(43, 203, 186, 0.7)",
              "rgba(253, 203, 110, 0.7)",
              "rgba(75, 123, 236, 0.7)",
              "rgba(240, 147, 43, 0.7)",
            ],
            borderColor: [
              "rgba(255, 107, 129, 1)",
              "rgba(165, 94, 234, 1)",
              "rgba(43, 203, 186, 1)",
              "rgba(253, 203, 110, 1)",
              "rgba(75, 123, 236, 1)",
              "rgba(240, 147, 43, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Модальное окно добавления услуги

  const addServiceModal = document.getElementById("add-service-modal");
  const addServiceBtns = document.querySelectorAll('[href="#add-service"]');
  const closeModalBtns = document.querySelectorAll(".close-modal");
  if ("add-service-modal") {
    addServiceBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        addServiceModal.classList.add("active");
      });
    });

    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        this.closest(".admin-modal").classList.remove("active");
      });
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener("click", function (e) {
      if (e.target.classList.contains("admin-modal")) {
        e.target.classList.remove("active");
      }
    });
  }

  // Форма добавления услуги
  const addServiceForm = document.getElementById("add-service-form");
  if (addServiceForm) {
    addServiceForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const serviceName = document.getElementById("service-name").value;
      const serviceCategory = document.getElementById("service-category").value;
      const servicePrice = document.getElementById("service-price").value;
      const serviceDuration = document.getElementById("service-duration").value;
      const serviceDescription = document.getElementById(
        "service-description"
      ).value;

      console.log({
        name: serviceName,
        category: serviceCategory,
        price: servicePrice,
        duration: serviceDuration,
        description: serviceDescription,
      });

      alert("Услуга успешно добавлена!");
      addServiceModal.classList.remove("active");
      this.reset();
    });
  }

  // Выход из системы
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }
});
/////////////////
/// Сортировка///////////////////////////////////////////////////////////////////////////////////
/////////////////
document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.from(document.querySelectorAll(".service-card"));
  const searchInput = document.getElementById("service-search");
  const categoryFilter = document.getElementById("category-filter");
  const priceSort = document.getElementById("price-sort");
  const servicesGrid = document.getElementById("services-grid");

  // Функция обновления отображения карточек
  function updateCards() {
    // Получаем значения фильтров
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sortType = priceSort.value;

    // Фильтрация
    let filtered = cards.filter((card) => {
      const matchesSearch = card
        .querySelector("h3")
        .textContent.toLowerCase()
        .includes(query);
      const matchesCategory =
        category === "all" || card.dataset.category === category;
      return matchesSearch && matchesCategory;
    });

    // Сортировка
    if (sortType === "price-asc") {
      filtered.sort((a, b) => a.dataset.price - b.dataset.price);
    } else if (sortType === "price-desc") {
      filtered.sort((a, b) => b.dataset.price - a.dataset.price);
    } else if (sortType === "popular") {
      const popularityOrder = { high: 3, medium: 2, low: 1 };
      filtered.sort(
        (a, b) =>
          popularityOrder[b.dataset.popularity] -
          popularityOrder[a.dataset.popularity]
      );
    }

    // Очистка и перерисовка
    servicesGrid.innerHTML = "";
    filtered.forEach((card) => servicesGrid.appendChild(card));
  }

  // Обработчики событий
  searchInput.addEventListener("input", updateCards);
  categoryFilter.addEventListener("change", updateCards);
  priceSort.addEventListener("change", updateCards);
});
