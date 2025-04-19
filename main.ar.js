document.addEventListener('DOMContentLoaded', () => {
    // Hero Carousel
    const heroCarousel = document.querySelector('.carousel-inner');
    const heroSlides = document.querySelectorAll('.carousel-item');
    let currentHeroSlide = 0;

    function showHeroSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[index].classList.add('active');
    }

    function nextHeroSlide() {
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
    }

    // Auto-advance hero carousel
    setInterval(nextHeroSlide, 5000);

    // Product Carousel
    const productGrid = document.querySelector('.product-grid');
    const productCarousel = document.querySelector('.product-carousel');
    const productItems = document.querySelectorAll('.product-item');
    let currentProductIndex = 0;

    // Add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-arrow carousel-prev';
    prevButton.innerHTML = '❯';

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-arrow carousel-next';
    nextButton.innerHTML = '❮';

    productGrid.appendChild(prevButton);
    productGrid.appendChild(nextButton);

    function updateProductCarousel() {
        const translateX = -currentProductIndex * 100;
        productCarousel.style.transform = `translateX(${translateX}%)`;
        
        // Update button states
        prevButton.style.opacity = currentProductIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentProductIndex === productItems.length - 1 ? '0.5' : '1';
    }

    // Initialize carousel
    updateProductCarousel();

    nextButton.addEventListener('click', () => {
        if (currentProductIndex > 0) {
            currentProductIndex--;
            updateProductCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentProductIndex < productItems.length - 1) {
            currentProductIndex++;
            updateProductCarousel();
        }
    });

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    productCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    productCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && currentProductIndex > 0) {
                currentProductIndex--;
            } else if (swipeDistance < 0 && currentProductIndex < productItems.length - 1) {
                currentProductIndex++;
            }
            updateProductCarousel();
        }
    }

    // Mobile menu toggle
    const toggleBtn = document.querySelector('.toggle-btn');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    toggleBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a link
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // About Section Tabs
    const tabLinks = document.querySelectorAll('.tab-nav a');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabLinks.length > 0 && tabPanes.length > 0) { // Check if tabs exist
        tabLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default anchor behavior

                const targetTab = link.getAttribute('data-tab');

                // Deactivate all links and panes
                tabLinks.forEach(l => l.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Activate the clicked link and corresponding pane
                link.classList.add('active');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });

        // Ensure the first tab is active on load (redundant if HTML is set correctly, but safe)
        if (!document.querySelector('.tab-nav a.active')) {
            tabLinks[0]?.classList.add('active');
        }
        if (!document.querySelector('.tab-pane.active')) {
             const firstTabId = tabLinks[0]?.getAttribute('data-tab');
             if (firstTabId) {
                 document.getElementById(firstTabId)?.classList.add('active');
             }
        }
    }
});