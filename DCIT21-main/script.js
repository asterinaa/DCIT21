    function switchForm(formId) {
            const loginForm = document.getElementById('logBox');
            const registerForm = document.getElementById('authBox');

            if (formId === 'authBox') {
                loginForm.classList.remove('active');
                registerForm.classList.add('active');
            } else {
                registerForm.classList.remove('active');
                loginForm.classList.add('active');
            }
        }
    
    const authForm = document.getElementById("authForm");
    if (authForm) {
        authForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("userName").value;
            const role = document.getElementById("userRole").value;


            localStorage.setItem("cvsuUser", name);
            localStorage.setItem("cvsuRole", role);

            alert("Welcome to CVSU MARKET, " + name + "!");
            window.location.href = role.includes("Vendor") ? "owner.html" : "home.html";
        });
    }   
    const welcomeBanner = document.getElementById("welcomeUser");
    if (welcomeBanner) {
        const savedUser = localStorage.getItem("cvsuUser");
        const savedRole = localStorage.getItem("cvsuRole");

        if (!savedUser) {
            window.location.href = "index.html";
        } else {
            welcomeBanner.textContent = "Welcome, " + savedUser + " (" + savedRole + ")";
        }
    }


    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem("cvsuUser");
            localStorage.removeItem("cvsuRole");
            window.location.href = "index.html";
        });
    }

    function createProductCard(item) {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-category", item.category);
        card.setAttribute("data-action", "Buy");

        const imgHTML = item.image ? `<img src="${item.image}" alt="${item.name}">` : "";

        card.innerHTML = `
            ${imgHTML}
            <span class="badge">${item.category}</span>
            <span class="badge badge-type">For Sale</span>
            <h3>${item.business}</h3>
            <p><strong>Product:</strong> ${item.name}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>About:</strong> ${item.desc}</p>
            <p><strong>Contact:</strong> ${item.contact}</p>
        `;
        return card;
    }

    const catalog = document.getElementById("businessCatalog");
    if (catalog) {
        const savedListings = JSON.parse(localStorage.getItem("cvsuListings") || "[]");
        savedListings.forEach(function(item) {
            catalog.prepend(createProductCard(item));
        });
    }

    const addProductForm = document.getElementById("addProductForm");
    if (addProductForm) {
        addProductForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const newItem = {
                business: document.getElementById("prodBusiness").value,
                name: document.getElementById("prodName").value,
                category: document.getElementById("prodCategory").value,
                price: document.getElementById("prodPrice").value,
                image: document.getElementById("prodImage").value,
                desc: document.getElementById("prodDesc").value,
                contact: document.getElementById("prodContact").value
            };

                const savedListings = JSON.parse(localStorage.getItem("cvsuListings") || "[]");
            savedListings.push(newItem);
            localStorage.setItem("cvsuListings", JSON.stringify(savedListings));

                catalog.prepend(createProductCard(newItem));
            addProductForm.reset();
            alert("Your business and product have been published to CVSU MARKET!");
        });
    }

    let selectedCategory = localStorage.getItem("cvsuCategory") || "All";
    let selectedAction = "All";

    function filterCatalog() {
        const searchInput = document.querySelector(".search-bar input");
        const searchText = searchInput ? searchInput.value.toLowerCase() : "";
        const cards = document.querySelectorAll("#businessCatalog .card");

        cards.forEach(function(card) {
            const cardCat = card.getAttribute("data-category");
            const cardAct = card.getAttribute("data-action");
            const cardText = card.textContent.toLowerCase();

            const matchCategory = (selectedCategory === "All" || cardCat === selectedCategory);
            const matchAction = (selectedAction === "All" || cardAct === selectedAction);
            const matchSearch = cardText.includes(searchText);

            card.style.display = (matchCategory && matchAction && matchSearch) ? "block" : "none";
        });
    }

    const catPillBtns = document.querySelectorAll(".cat-pill-btn");
    catPillBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            selectedCategory = btn.getAttribute("data-category");
            filterCatalog();
            document.getElementById("catalogSection").scrollIntoView({ behavior: "smooth" });
        });
    });

    const showAllBtn = document.getElementById("showAllCategories");
    if (showAllBtn) {
        showAllBtn.addEventListener("click", function() {
            selectedCategory = "All";
            filterCatalog();
        });
    }

    const actionBtns = document.querySelectorAll(".action-btn");
    actionBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            actionBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedAction = btn.getAttribute("data-action");
            filterCatalog();
        });
    });

    const searchInput = document.querySelector(".search-bar input");
        if (searchInput) {
            searchInput.addEventListener("input", filterCatalog);
        }

    if (catalog) {
        filterCatalog();
    }