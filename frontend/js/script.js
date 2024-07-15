document.addEventListener("DOMContentLoaded", function () {
    // Navbar Toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarToggler.addEventListener('click', function () {
        navbarCollapse.classList.toggle('show');
        navbarToggler.classList.toggle('active');
    });

    // Initialize Google Map
    function initMap() {
        const location = { lat: -1.9441, lng: 30.0619 };
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location
        });
        new google.maps.Marker({
            position: location,
            map: map
        });
    }

    window.initMap = initMap;

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('#darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }

    // Highlight Current Page in Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active-page');
        }
    });

    // Elements Animation on Hover
    document.querySelectorAll('.footer-column, .nav-link').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('animated');
        });
        element.addEventListener('mouseleave', () => {
            element.classList.remove('animated');
        });
    });

    // Advanced Search Form Functionality
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form input');
    const searchResultsSection = document.getElementById('search-results');
    const searchResultsList = document.getElementById('search-results-list');
    const searchHistoryContainer = document.getElementById('search-history');

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function updateSearchHistory(query) {
        if (!searchHistory.includes(query)) {
            searchHistory.push(query);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    }

    function displaySearchHistory() {
        searchHistoryContainer.innerHTML = '<h3>Search History</h3>';
        const historyList = document.createElement('ul');
        searchHistory.forEach(query => {
            const listItem = document.createElement('li');
            listItem.textContent = query;
            historyList.appendChild(listItem);
        });
        searchHistoryContainer.appendChild(historyList);
    }

    function performSearch(query) {
        const data = [
            "About Us - Jackal Tech Ltd.",
            "Services - Jackal Tech Ltd.",
            "Careers - Jackal Tech Ltd.",
            "Contact Us - Jackal Tech Ltd.",
            "Our Team - Jackal Tech Ltd.",
            "Partner - Afribot Robotics",
            "Partner - Agahozo-Shalom Youth Village"
        ];

        return data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    }

    function displaySearchResults(results) {
        searchResultsList.innerHTML = '';
        if (results.length === 0) {
            searchResultsList.innerHTML = '<li>No results found.</li>';
        } else {
            results.forEach(result => {
                const listItem = document.createElement('li');
                listItem.textContent = result;
                searchResultsList.appendChild(listItem);
            });
        }
        searchResultsSection.style.display = 'block';
    }

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query === '') return;

        updateSearchHistory(query);
        const results = performSearch(query);
        displaySearchResults(results);
        displaySearchHistory();
    });

    displaySearchHistory();

    // Modal Functionality
    document.querySelectorAll('.modal').forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    });

    document.querySelectorAll('[data-toggle="modal"]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const target = document.querySelector(trigger.getAttribute('data-target'));
            target.classList.add('show');
        });
    });

    // Image Slideshow for Partners
    const partnersImages = document.querySelectorAll('.partners-slide');
    let currentSlide = 0;

    function showSlide(index) {
        partnersImages.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % partnersImages.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000);
    showSlide(currentSlide);

    // Section Fade-in on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade');
            } else {
                entry.target.classList.remove('fade');
            }
        });
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Lazy Load Images
    const lazyLoadImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyLoadImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Number Counter for Impacts
    const impacts = {
        students: 25000,
        businesses: 50,
        countries: 20,
        partners: 10
    };

    function initCounter(id, target) {
        const element = document.getElementById(id);
        let count = 0;
        const increment = Math.ceil(target / 100);
        const counter = setInterval(() => {
            count += increment;
            if (count > target) {
                count = target;
                clearInterval(counter);
            }
            element.textContent = count.toLocaleString() + '+';
        }, 30);
    }

    for (const [id, target] of Object.entries(impacts)) {
        initCounter(id, target);
    }

    // Sanitize User Input
    function sanitizeInput(input) {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = input;
        return tempDiv.innerHTML;
    }

    window.addEventListener('scroll', debounce(function () {
        console.log('Scroll event triggered');
    }, 200));

    // Advanced Loading for Sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                sectionObserver.unobserve(entry.target);
            }
        });
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initialize Slick Slider for Partners Logos
    $('.partners-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });


    // Smooth Scrolling for Internal Links on Career Page
    document.querySelectorAll('.scroll-to-section').forEach(button => {
        button.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Career Page - Job Openings Click Event to Show Job Requirements
    const jobLinks = document.querySelectorAll('.job-listing li a');
    jobLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const jobTitle = this.textContent;
            const jobRequirements = document.querySelector('.job-requirements');
            jobRequirements.scrollIntoView({
                behavior: 'smooth'
            });
            jobRequirements.innerHTML = getJobRequirements(jobTitle);
        });
    });

    function getJobRequirements(title) {
        const jobData = {
            'Software Engineer': `
                <h3>Software Engineer</h3>
                <ul>
                    <li>Bachelor's degree in Computer Science or related field</li>
                    <li>3+ years of experience in software development</li>
                    <li>Proficiency in programming languages such as Java, Python, or C++</li>
                    <li>Experience with front-end technologies like HTML, CSS, and JavaScript</li>
                    <li>Strong problem-solving and communication skills</li>
                </ul>
                <a href="#apply" class="btn btn-primary">Apply</a>
            `,
            'Project Manager': `
                <h3>Project Manager</h3>
                <ul>
                    <li>Bachelor's degree in Business Administration or related field</li>
                    <li>5+ years of experience in project management</li>
                    <li>PMP or similar project management certification</li>
                    <li>Excellent organizational and leadership skills</li>
                    <li>Strong knowledge of project management tools and software</li>
                </ul>
                <a href="#apply" class="btn btn-primary">Apply</a>
            `,
            'Data Analyst': `
                <h3>Data Analyst</h3>
                <ul>
                    <li>Bachelor's degree in Data Science, Statistics, or related field</li>
                    <li>2+ years of experience in data analysis</li>
                    <li>Proficiency in data analysis tools such as SQL, R, or Python</li>
                    <li>Experience with data visualization tools like Tableau or Power BI</li>
                    <li>Strong analytical and critical thinking skills</li>
                </ul>
                <a href="#apply" class="btn btn-primary">Apply</a>
            `,
            'UX/UI Designer': `
                <h3>UX/UI Designer</h3>
                <ul>
                    <li>Bachelor's degree in Design, Fine Arts, or related field</li>
                    <li>3+ years of experience in UX/UI design</li>
                    <li>Proficiency in design tools like Adobe XD, Sketch, or Figma</li>
                    <li>Strong portfolio showcasing design projects</li>
                    <li>Excellent visual design skills with a keen eye for detail</li>
                </ul>
                <a href="#apply" class="btn btn-primary">Apply</a>
            `,
            'Technical Support Specialist': `
                <h3>Technical Support Specialist</h3>
                <ul>
                    <li>Bachelor's degree in Information Technology or related field</li>
                    <li>2+ years of experience in technical support</li>
                    <li>Strong knowledge of computer systems, networks, and software</li>
                    <li>Excellent problem-solving and communication skills</li>
                    <li>Ability to provide technical support and training to end-users</li>
                </ul>
                <a href="#apply" class="btn btn-primary">Apply</a>
            `
        };
        return jobData[title] || '<p>No job requirements found for this position.</p>';
    }

    // FAQ Section - Toggle Answers
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });

    // Animate on Scroll
    const scrollElements = document.querySelectorAll('.scroll-element');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Load More Button for Job Openings
    const loadMoreBtn = document.getElementById('load-more');
    let currentItems = 5;
    loadMoreBtn.addEventListener('click', () => {
        const jobItems = [...document.querySelectorAll('.job-listing li')];
        for (let i = currentItems; i < currentItems + 5; i++) {
            if (jobItems[i]) {
                jobItems[i].style.display = 'list-item';
            }
        }
        currentItems += 5;
        if (currentItems >= jobItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const formEntries = Object.fromEntries(formData.entries());
       
        console.log('Form Data Submitted:', formEntries);
        alert('Your message has been sent successfully!');
        contactForm.reset();
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Career Details - Animations on Scroll
    const elementsToShow = document.querySelectorAll('.career-details-section h2, .career-details-section p, .career-details-section ol');
    function loop() {
        elementsToShow.forEach(function (element) {
            if (isElementInViewport(element)) {
                element.classList.add('fadeInUp');
            } else {
                element.classList.remove('fadeInUp');
            }
        });

        requestAnimationFrame(loop);
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    loop();

    // FAQ Toggle Function
    document.querySelectorAll('.faq-item h3').forEach(item => {
        item.addEventListener('click', event => {
            const content = item.nextElementSibling;
            content.classList.toggle('hidden');
        });
    });

    // Policies - Show Content Based on Sidebar Link Clicked
    function showContent(id) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.add('active');
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                section.classList.remove('active');
            }
        });

        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            const linkId = link.getAttribute('onclick').match(/'([^']+)'/)[1];
            if (linkId === id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Add Event Listeners to Sidebar Links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const id = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showContent(id);
        });
    });

    // Display the First Section by Default
    showContent('faqs');

    // Toggle Sidebar for Mobile View
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });

        // Detect Click Outside Sidebar to Close It
        document.addEventListener('click', function (event) {
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('open');
            }
        });

        // Responsive Adjustments
        window.addEventListener('resize', function () {
            if (window.innerWidth > 992) {
                sidebar.classList.remove('open');
            }
        });
    }

    // Animation for Showing Content
    function animateContent(id) {
        const content = document.getElementById(id);
        content.classList.add('fade-in');
        setTimeout(() => {
            content.classList.remove('fade-in');
        }, 500);
    }

    // Smooth Scroll to Top of Content When Changing Sections
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add Smooth Scrolling to Links
    links.forEach(link => {
        link.addEventListener('click', function () {
            scrollToTop();
            const id = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            animateContent(id);
        });
    });

    // Highlight Active Sidebar Link on Scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                const id = section.id;
                links.forEach(link => {
                    const linkId = link.getAttribute('onclick').match(/'([^']+)'/)[1];
                    if (linkId === id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    });

    // Add Active Class to the First Visible Section on Page Load
    function addActiveClassOnLoad() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                section.classList.add('active');
                const id = section.id;
                links.forEach(link => {
                    const linkId = link.getAttribute('onclick').match(/'([^']+)'/)[1];
                    if (linkId === id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    // Call the Function to Add Active Class on Page Load
    addActiveClassOnLoad();
});
