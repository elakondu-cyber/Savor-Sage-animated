document.addEventListener("DOMContentLoaded", () => {


    // CURRENT YEAR

    document.querySelectorAll("[data-year]").forEach(element => {

        element.textContent = new Date().getFullYear();

    });



    // MOBILE NAVIGATION

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");

    if (toggle && nav) {

        toggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            toggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    // SCROLL REVEAL ANIMATIONS

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }

        );

        revealItems.forEach(item => {

            observer.observe(item);

        });

    } else {

        revealItems.forEach(item => {

            item.classList.add("is-visible");

        });

    }



    // MENU SEARCH AND CATEGORY FILTERING

    const menuGrid = document.querySelector("#menuGrid");

    if (menuGrid) {

        const cards = [
            ...menuGrid.querySelectorAll(".menu-card")
        ];

        const search = document.querySelector("#menuSearch");

        const filterButtons = [
            ...document.querySelectorAll(".filter-btn")
        ];

        const emptyState = document.querySelector("#emptyState");

        let activeFilter = "all";


        function updateMenu() {

            const term = search.value
                .trim()
                .toLowerCase();

            let visibleCount = 0;


            cards.forEach(card => {

                const categoryMatch =
                    activeFilter === "all" ||
                    card.dataset.category === activeFilter;


                const searchMatch =
                    card.dataset.name.toLowerCase().includes(term) ||
                    card.textContent.toLowerCase().includes(term);


                const shouldShow =
                    categoryMatch && searchMatch;


                card.hidden = !shouldShow;


                if (shouldShow) {

                    visibleCount++;

                }

            });


            emptyState.hidden = visibleCount !== 0;

        }


        search.addEventListener("input", updateMenu);


        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                activeFilter = button.dataset.filter;

                filterButtons.forEach(item => {

                    item.classList.toggle(
                        "active",
                        item === button
                    );

                });

                updateMenu();

            });

        });

    }



    // FOOD DETAIL POP-UP

    const dialog = document.querySelector("#dishDialog");

    if (dialog && typeof dialog.showModal === "function") {

        document.querySelectorAll(".dish-detail").forEach(button => {

            button.addEventListener("click", () => {

                document.querySelector("#dialogTitle").textContent =
                    button.dataset.title;

                document.querySelector("#dialogDescription").textContent =
                    button.dataset.description;

                document.querySelector("#dialogPrice").textContent =
                    button.dataset.price;

                dialog.showModal();

            });

        });


        dialog.querySelector(".dialog-close").addEventListener(
            "click",
            () => dialog.close()
        );


        dialog.addEventListener("click", event => {

            if (event.target === dialog) {

                dialog.close();

            }

        });

    }



    // PREVENT PAST RESERVATION DATES

    const dateInput = document.querySelector("#bookingDate");

    if (dateInput) {

        const today = new Date();

        const localDate = new Date(
            today.getTime() -
            today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localDate;

    }



    // RESERVATION FORM VALIDATION

    const reservationForm =
        document.querySelector("#reservationForm");


    if (reservationForm) {

        reservationForm.addEventListener("submit", event => {

            event.preventDefault();


            if (!reservationForm.reportValidity()) {

                return;

            }


            const status =
                document.querySelector("#formStatus");


            const formData = new FormData(reservationForm);

            const booking = Object.fromEntries(
                formData.entries()
            );


            status.textContent =
                `Thank you, ${booking.name}. Your details have passed browser validation. This is a demo: your request has NOT been sent to the restaurant.`;


            reservationForm.reset();


        });

    }

});

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CURRENT YEAR
    ========================= */

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (navToggle && mainNav) {

        navToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            navToggle.setAttribute("aria-expanded", isOpen);

        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =========================
       MENU SEARCH AND FILTERS
    ========================= */

    const searchInput = document.getElementById("menuSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuCards = document.querySelectorAll(".menu-card");
    const noResults = document.getElementById("noResults");

    let activeFilter = "all";

    function filterMenu() {

        const searchTerm = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        let visibleCount = 0;

        menuCards.forEach(card => {

            const category = card.dataset.category;
            const name = card.dataset.name.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();

            const matchesCategory =
                activeFilter === "all" || category === activeFilter;

            const matchesSearch =
                name.includes(searchTerm) ||
                description.includes(searchTerm);

            const shouldShow = matchesCategory && matchesSearch;

            card.classList.toggle("hidden", !shouldShow);

            if (shouldShow) {
                visibleCount++;
            }

        });

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }

    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            activeFilter = button.dataset.filter;

            filterMenu();

        });

    });


    if (searchInput) {

        searchInput.addEventListener("input", filterMenu);

    }


    /* =========================
       DISH DETAILS MODAL
    ========================= */

    const modal = document.getElementById("dishModal");

    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalDescription = document.getElementById("modalDescription");
    const modalCategory = document.getElementById("modalCategory");

    const detailButtons = document.querySelectorAll(".details-btn");
    const closeButtons = document.querySelectorAll("[data-close-modal]");

    let lastFocusedElement = null;

    function openModal(button) {

        if (!modal) return;

        lastFocusedElement = button;

        modalTitle.textContent = button.dataset.title;
        modalPrice.textContent = button.dataset.price;
        modalDescription.textContent = button.dataset.description;
        modalCategory.textContent = button.dataset.category;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        modal.querySelector(".modal-close").focus();

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

    }


    detailButtons.forEach(button => {

        button.addEventListener("click", () => {
            openModal(button);
        });

    });


    closeButtons.forEach(button => {

        button.addEventListener("click", closeModal);

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && modal?.classList.contains("open")) {
            closeModal();
        }

    });

});