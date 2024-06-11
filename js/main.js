document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navLinks = document.querySelectorAll('nav ul li a');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const backToTopButton = document.createElement('button');
    const darkModeToggle = document.createElement('button');
    const searchBar = document.getElementById('search-bar');
    const searchResults = document.getElementById('search-results');
    const videoModal = document.createElement('div');
    const videoModalContent = document.createElement('div');
    const videoCloseButton = document.createElement('span');
    const teamCarousel = document.querySelector('.team-grid');
    const partnerSlider = document.querySelector('.partner-slider-inner');
    const hamburger = document.createElement('div');
    let isDown = false, startX, scrollLeft;

    // Initialize Back to Top Button
    backToTopButton.textContent = '↑';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    // Initialize Dark Mode Toggle
    darkModeToggle.textContent = '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    // Initialize Hamburger Menu
    hamburger.textContent = '☰';
    hamburger.classList.add('hamburger');
    document.body.appendChild(hamburger);

    // Initialize Video Modal
    videoModal.classList.add('video-modal');
    videoModalContent.classList.add('video-modal-content');
    videoCloseButton.classList.add('video-close-button');
    videoCloseButton.textContent = '×';
    videoModalContent.appendChild(videoCloseButton);
    videoModal.appendChild(videoModalContent);
    document.body.appendChild(videoModal);

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('active');
        hamburger.textContent = document.querySelector('nav ul').classList.contains('active') ? '✖' : '☰';
    });

    // Navigation Link Event Listener
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = event.target.getAttribute('href');
            navigate(targetUrl);
        });
    });

    function navigate(url) {
        window.location.href = url;
    }

    // Smooth Scroll Effect for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // FAQ Toggle Functionality
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Back to Top Button Functionality
    window.addEventListener('scroll', function() {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', function() {
        let offset = window.scrollY;
        heroSection.style.backgroundPositionY = `${offset * 0.5}px`;
    });

    // Video Modal Functionality
    const videos = document.querySelectorAll('.video-container video');
    videos.forEach(video => {
        video.addEventListener('click', function() {
            const videoClone = video.cloneNode(true);
            videoModalContent.appendChild(videoClone);
            videoModal.style.display = 'block';
        });
    });

    videoCloseButton.addEventListener('click', function() {
        videoModalContent.innerHTML = '';
        videoModalContent.appendChild(videoCloseButton);
        videoModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoModalContent.innerHTML = '';
            videoModalContent.appendChild(videoCloseButton);
            videoModal.style.display = 'none';
        }
    });

    // Carousel Functionality for Team Highlights
    teamCarousel.addEventListener('mousedown', (e) => {
        isDown = true;
        teamCarousel.classList.add('active');
        startX = e.pageX - teamCarousel.offsetLeft;
        scrollLeft = teamCarousel.scrollLeft;
    });

    teamCarousel.addEventListener('mouseleave', () => {
        isDown = false;
        teamCarousel.classList.remove('active');
    });

    teamCarousel.addEventListener('mouseup', () => {
        isDown = false;
        teamCarousel.classList.remove('active');
    });

    teamCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - teamCarousel.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast
        teamCarousel.scrollLeft = scrollLeft - walk;
    });

    // Dark Mode Toggle Functionality
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        updateDarkModeStyles();
    });

    // Function to update dark mode styles
    function updateDarkModeStyles() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const root = document.documentElement;

        if (isDarkMode) {
            root.style.setProperty('--primary-color', '#121212');
            root.style.setProperty('--secondary-color', '#444444');
            root.style.setProperty('--background-color', '#1f1f1f');
            root.style.setProperty('--text-color', '#ffffff');
        } else {
            root.style.setProperty('--primary-color', '#2c3e50');
            root.style.setProperty('--secondary-color', '#18bc9c');
            root.style.setProperty('--background-color', '#ecf0f1');
            root.style.setProperty('--text-color', '#2c3e50');
        }
    }

    // Enhanced Search Functionality with Debounce
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    searchBar.addEventListener('input', debounce(function() {
        const query = sanitizeInput(this.value.toLowerCase());
        handleSearch(query);
    }, 300));

    searchResults.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            navigate(event.target.getAttribute('href'));
            searchResults.innerHTML = ''; // Clear search results
            searchBar.value = ''; // Reset search input
        }
    });

    // Function to handle the search and reset for multiple searches
    function handleSearch(query) {
        if (query) {
            searchResults.style.display = 'block';
            searchResults.innerHTML = '';
            const results = searchContent(query);
            results.forEach(result => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${result.url}">${highlightQuery(result.title, query)}</a>`;
                searchResults.appendChild(li);
            });
        } else {
            searchResults.style.display = 'none';
        }
    }

    // Highlight search query in results
    function highlightQuery(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Enhanced Search Content Functionality
    function searchContent(query) {
        const content = [
            { title: 'Welcome to Jackal Tech Ltd.', url: 'index.html#hero-section' },
            { title: 'About Us', url: 'about.html' },
            { title: 'Services', url: 'services.html' },
            { title: 'Careers', url: 'careers.html' },
            { title: 'FAQs', url: 'faqs.html' },
            { title: 'Contact Us', url: 'contact.html' },
            { title: 'Innovating for a Better Future', url: 'index.html#welcome-message' },
            { title: 'Latest Videos', url: 'index.html#latest-videos' },
            { title: 'Upcoming Events', url: 'index.html#upcoming-events' },
            { title: 'Team Highlights', url: 'index.html#team-highlights' },
            { title: 'Success Stories', url: 'index.html#success-stories' },
            { title: 'Recent News', url: 'index.html#recent-news' },
            { title: 'Join Our Team at Jackal Tech Ltd.', url: 'careers.html#hero-section' },
            { title: 'Why Join Us', url: 'careers.html#why-join-us' },
            { title: 'Job Openings', url: 'careers.html#job-openings' },
            { title: 'Internship Program', url: 'careers.html#internship-program' },
            { title: 'Employee Stories', url: 'careers.html#employee-stories' },
            { title: 'Application Process', url: 'careers.html#application-process' }
        ];
        return content.filter(item => item.title.toLowerCase().includes(query) || item.url.toLowerCase().includes(query));
    }

    // Additional Security Enhancements
    // Prevent XSS by sanitizing search input
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.innerText = input;
        return div.innerHTML;
    }

    // Enhanced Animations for Benefits and Stories Sections
    document.querySelectorAll('.benefit-item, .story-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Apply animations on scroll
    window.addEventListener('scroll', function() {
        animatedElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (position < screenPosition) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    });

    // Enhanced Scroll Effects
    const scrollElements = document.querySelectorAll('.scroll-element');
    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // Parallax effect for sections with data-speed attribute
    const parallaxSections = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', function() {
        parallaxSections.forEach(section => {
            const speed = section.getAttribute('data-speed');
            const yPos = -(window.scrollY * speed / 100);
            section.style.backgroundPosition = `50% ${yPos}px`;
        });
    });

    // Partner Companies Slider Animation
    function startPartnerSlider() {
        partnerSlider.style.animation = 'scroll 20s linear infinite';
    }

    startPartnerSlider();

    // Ensure dark mode toggle and hamburger menu are positioned correctly
    function updateHeaderLayout() {
        const header = document.querySelector('header');
        const toggleContainer = document.createElement('div');
        toggleContainer.classList.add('toggle-container');
        toggleContainer.appendChild(darkModeToggle);
        toggleContainer.appendChild(hamburger);
        header.appendChild(toggleContainer);
    }

    updateHeaderLayout();

    // Ensure dark mode toggle and hamburger menu only show on smaller screens
    function handleResize() {
        if (window.innerWidth <= 768) {
            darkModeToggle.style.display = 'block';
            hamburger.style.display = 'block';
        } else {
            darkModeToggle.style.display = 'none';
            hamburger.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});
