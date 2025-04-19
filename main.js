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
    const productPages = document.querySelectorAll('.carousel-page'); // Select pages instead of items
    const trademarks = document.querySelectorAll('.trademark-item[data-brand]');
    const productsSection = document.getElementById('products');
    let currentPageIndex = 0; // Renamed from currentProductIndex

    // Add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-arrow carousel-prev';
    prevButton.innerHTML = '❮';

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-arrow carousel-next';
    nextButton.innerHTML = '❯';

    productGrid.appendChild(prevButton);
    productGrid.appendChild(nextButton);

    function updateProductCarousel() {
        const translateX = -currentPageIndex * 100;
        productCarousel.style.transform = `translateX(${translateX}%)`;

        // Update button states based on pages
        prevButton.disabled = currentPageIndex === 0;
        nextButton.disabled = currentPageIndex === productPages.length - 1;
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }

    // Initialize carousel
    updateProductCarousel();

    prevButton.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            updateProductCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPageIndex < productPages.length - 1) {
            currentPageIndex++;
            updateProductCarousel();
        }
    });

    // Add touch support for mobile (page-based)
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
            if (swipeDistance > 0 && currentPageIndex > 0) { // Swipe right (previous page)
                currentPageIndex--;
            } else if (swipeDistance < 0 && currentPageIndex < productPages.length - 1) { // Swipe left (next page)
                currentPageIndex++;
            }
            updateProductCarousel();
        }
    }

    // Trademark click navigation
    trademarks.forEach(trademark => {
        trademark.addEventListener('click', () => {
            const brand = trademark.dataset.brand;
            const targetPageIndex = Array.from(productPages).findIndex(page => page.dataset.brand === brand);

            if (targetPageIndex !== -1) {
                // Scroll to the products section smoothly
                productsSection.scrollIntoView({ behavior: 'smooth' });

                // Wait a brief moment for scroll to start, then update carousel
                // This can sometimes help avoid visual glitches
                setTimeout(() => {
                    currentPageIndex = targetPageIndex;
                    updateProductCarousel();
                }, 100); // Adjust delay if needed
            }
        });
    });

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