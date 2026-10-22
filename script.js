/* =========================================
   SINCHANA M D - PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const header = document.getElementById("header");

    const menuToggle = document.getElementById("menu-toggle");

    const navLinks = document.getElementById("nav-links");

    const navItems = document.querySelectorAll(".nav-link");

    const typingText = document.getElementById("typing-text");

    const profileImage = document.getElementById("profile-image");

    const profileFallback = document.getElementById("profile-fallback");

    const contactForm = document.getElementById("contact-form");

    const formStatus = document.getElementById("form-status");

    const submitButton = contactForm.querySelector(".submit-btn");

    const submitText = document.getElementById("submit-text");

    const submitIcon = document.getElementById("submit-icon");

    // =====================================
    // CURRENT YEAR
    // =====================================

    document.getElementById("current-year").textContent =
        new Date().getFullYear();

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    function openMenu() {
        navLinks.classList.add("open");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute("aria-label", "Close navigation");

        menuToggle.innerHTML = '<i class="fas fa-times"></i>';

        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        document.body.classList.remove("menu-open");
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    // Close mobile menu when a navigation link is selected.

    navItems.forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });

    // Close menu when clicking outside the navigation.

    document.addEventListener("click", (event) => {

        const clickedInsideMenu = navLinks.contains(event.target);

        const clickedToggle = menuToggle.contains(event.target);

        if (
            navLinks.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMenu();
        }

    });

    // Close menu using the Escape key.

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    // Reset menu when switching back to desktop layout.

    window.addEventListener("resize", () => {

        if (window.innerWidth > 820) {
            closeMenu();
        }

    });

    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    function updateHeader() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

    // =====================================
    // ACTIVE NAVIGATION LINK
    // =====================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navItems.forEach((link) => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${currentId}`
                            );

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }

    // =====================================
    // TYPING ANIMATION
    // =====================================

    const words = [
        "Aspiring Developer",
        "BCA Student",
        "Web Enthusiast",
        "Future Full-Stack Developer"
    ];

    let wordIndex = 0;

    let characterIndex = 0;

    let isDeleting = false;

    let typingTimer;

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function typeWords() {

        if (!typingText) {
            return;
        }

        const currentWord = words[wordIndex];

        if (isDeleting) {

            characterIndex--;

        } else {

            characterIndex++;

        }

        typingText.textContent = currentWord.substring(
            0,
            characterIndex
        );

        let delay = isDeleting ? 35 : 75;

        if (!isDeleting && characterIndex === currentWord.length) {

            delay = 1500;

            isDeleting = true;

        } else if (isDeleting && characterIndex === 0) {

            isDeleting = false;

            wordIndex = (wordIndex + 1) % words.length;

            delay = 350;

        }

        typingTimer = setTimeout(typeWords, delay);

    }

    if (prefersReducedMotion) {

        typingText.textContent = "Aspiring Full-Stack Developer";

    } else {

        typingTimer = setTimeout(typeWords, 800);

    }

    // =====================================
    // PROFILE IMAGE FALLBACK
    // =====================================

    function showProfileFallback() {

        profileImage.style.display = "none";

        profileFallback.style.display = "flex";

    }

    profileImage.addEventListener("error", showProfileFallback);

    // Handle cached images that failed before the event listener was added.

    if (profileImage.complete && profileImage.naturalWidth === 0) {

        showProfileFallback();

    }

    // =====================================
    // SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }

    // =====================================
    // CONTACT FORM
    // =====================================

    function showFormStatus(message, type) {

        formStatus.textContent = message;

        formStatus.className = `form-status ${type}`;

    }

    function setSubmitting(isSubmitting) {

        submitButton.disabled = isSubmitting;

        if (isSubmitting) {

            submitText.textContent = "Sending Message...";

            submitIcon.className = "fas fa-spinner fa-spin";

        } else {

            submitText.textContent = "Send Message";

            submitIcon.className = "fas fa-paper-plane";

        }

    }

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        // Check browser validation.

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }

        // Collect form values.

        const formData = new FormData(contactForm);

        const contactData = {

            name: formData.get("name").trim(),

            email: formData.get("email").trim(),

            subject: formData.get("subject").trim(),

            message: formData.get("message").trim()

        };

        // Prevent empty submissions.

        if (
            !contactData.name ||
            !contactData.email ||
            !contactData.subject ||
            !contactData.message
        ) {

            showFormStatus(
                "Please complete all fields before sending.",
                "error"
            );

            return;

        }

        setSubmitting(true);

        showFormStatus("", "");

        try {

            /*
             * This request expects a POST /api/contact endpoint
             * in your existing Node.js server.
             *
             * Your backend should validate the submitted data,
             * save the contact to the database, and return JSON.
             */

            const response = await fetch("/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(contactData)

            });

            let result = {};

            try {

                result = await response.json();

            } catch {

                result = {};

            }

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to send your message. Please try again."
                );

            }

            showFormStatus(
                result.message ||
                "Thank you for reaching out! Your message has been sent successfully.",
                "success"
            );

            contactForm.reset();

        } catch (error) {

            console.error("Contact form error:", error);

            if (error instanceof TypeError) {

                showFormStatus(
                    "Could not connect to the server. Please check that the backend is running and try again.",
                    "error"
                );

            } else {

                showFormStatus(
                    error.message ||
                    "Something went wrong. Please try again later.",
                    "error"
                );

            }

        } finally {

            setSubmitting(false);

        }

    });

    // =====================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({

                    behavior: prefersReducedMotion ? "auto" : "smooth",

                    block: "start"

                });

                // Update the URL without causing a second jump.

                if (history.replaceState) {

                    history.replaceState(null, "", targetId);

                }

            }

        });

    });

});
