

//for smaller screen responsiveness

document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const content = document.querySelector('main'); // Assuming main contains the main content

    // Create three lines for the hamburger icon
    const line1 = document.createElement('span');
    const line2 = document.createElement('span');
    const line3 = document.createElement('span');

    // Style the lines
    [line1, line2, line3].forEach(line => {
        line.style.display = 'block';
        line.style.width = '30px';
        line.style.height = '4px';
        line.style.margin = '5px auto';
        line.style.backgroundColor = '#fff';
    });

    // Append lines to the navbar toggler
    navbarToggler.appendChild(line1);
    navbarToggler.appendChild(line2);
    navbarToggler.appendChild(line3);

    // Apply initial styles to navbar items
    navbarCollapse.style.backgroundColor = '#343a40'; // Ensure the background color is set
    navbarCollapse.style.display = 'none';

    // Toggle menu visibility on hamburger click
    navbarToggler.addEventListener('click', function() {
        if (navbarCollapse.style.display === 'none') {
            navbarCollapse.style.display = 'block';
            line1.style.transform = 'rotate(45deg) translate(5px, 5px)';
            line2.style.transform = 'rotate(-45deg) translate(5px, -5px)';
            line3.style.display = 'none';
            content.style.paddingTop = '80px'; // Adjust this value to push the content down
        } else {
            navbarCollapse.style.display = 'none';
            line1.style.transform = 'rotate(0) translate(0, 0)';
            line2.style.transform = 'rotate(0) translate(0, 0)';
            line3.style.display = 'block';
            content.style.paddingTop = '0'; // Reset the padding
        }
    });

    // Ensure the menu closes when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target) && navbarCollapse.style.display === 'block') {
            navbarCollapse.style.display = 'none';
            line1.style.transform = 'rotate(0) translate(0, 0)';
            line2.style.transform = 'rotate(0) translate(0, 0)';
            line3.style.display = 'block';
            content.style.paddingTop = '0'; // Reset the padding
        }
    });
    navbarCollapse.style.marginTop = '40px'; // Adjust this value to push the menu down

    // Apply responsive styles using JavaScript
    function applyResponsiveStyles() {
        if (window.innerWidth <= 992) {
            // Styles for small screens
            navbarToggler.style.display = 'block';
        } else {
            // Styles for larger screens
            navbarToggler.style.display = 'none';
            navbarCollapse.style.display = 'none';
            line1.style.transform = 'rotate(0) translate(0, 0)';
            line2.style.transform = 'rotate(0) translate(0, 0)';
            line3.style.display = 'block';
            content.style.paddingTop = '0'; // Reset the padding
        }
    }

    // Initial check
    applyResponsiveStyles();

    // Add event listener for window resize
    window.addEventListener('resize', applyResponsiveStyles);
});




//Dropdown Toggle


document.addEventListener('DOMContentLoaded', function() {
    // Select the policies link and the dropdown menu
    const policiesLink = document.querySelector('.nav-link.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Add click event listener to the policies link
    policiesLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action
        dropdownMenu.classList.toggle('show'); // Toggle the 'show' class on the dropdown menu
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!policiesLink.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});





 //dark mode advanced search
 document.addEventListener('DOMContentLoaded', function () {
    // Dark Mode Toggle Icon
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.className = 'position-fixed';
    darkModeToggle.style.top = '10px';
    darkModeToggle.style.right = '10px';
    darkModeToggle.style.background = '#155724'; // green background
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.padding = '5px';
    darkModeToggle.style.zIndex = '1000';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }

    // Scroll to Top Icon
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.className = 'position-fixed';
    scrollToTopBtn.style.bottom = '10px';
    scrollToTopBtn.style.left = '10px';
    scrollToTopBtn.style.background = '#28a745'; // Green background
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.padding = '5px';
    scrollToTopBtn.style.zIndex = '1000';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Enhanced Search Functionality
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('input');
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
            listItem.addEventListener('click', () => {
                performSearch(query);
            });
            historyList.appendChild(listItem);
        });
        searchHistoryContainer.appendChild(historyList);
    }

    function performSearch(query) {
        const sections = document.querySelectorAll('section');
        let results = [];

        sections.forEach(section => {
            if (section.textContent.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    sectionId: section.id,
                    text: section.querySelector('h2') ? section.querySelector('h2').textContent : 'Section'
                });
            }
        });

        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        searchResultsList.innerHTML = '';
        if (results.length === 0) {
            searchResultsList.innerHTML = '<li>No results found.</li>';
        } else {
            results.forEach(result => {
                const listItem = document.createElement('li');
                listItem.textContent = result.text;
                listItem.addEventListener('click', () => {
                    document.getElementById(result.sectionId).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
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
        performSearch(query);
        displaySearchHistory();
    });

    displaySearchHistory();
});









 //search readability && marks the current screen
            
            
 document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('input');
    const searchResultsSection = document.getElementById('search-results');
    const searchResultsList = document.getElementById('search-results-list');
    const searchHistoryContainer = document.getElementById('search-history');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Highlight the current page in the navigation
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active-page');
        }
    });

    // Function to update search history
    function updateSearchHistory(query) {
        if (!searchHistory.includes(query)) {
            searchHistory.push(query);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    }

    // Function to display search history
    function displaySearchHistory() {
        searchHistoryContainer.innerHTML = '<h3>Search History</h3>';
        const historyList = document.createElement('ul');
        searchHistory.forEach(query => {
            const listItem = document.createElement('li');
            listItem.textContent = query;
            listItem.addEventListener('click', () => {
                performSearch(query);
            });
            historyList.appendChild(listItem);
        });
        searchHistoryContainer.appendChild(historyList);
    }

    // Function to perform search
    function performSearch(query) {
        const sections = document.querySelectorAll('section');
        let results = [];
        sections.forEach(section => {
            if (section.textContent.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    sectionId: section.id,
                    text: section.querySelector('h2') ? section.querySelector('h2').textContent : 'Section'
                });
            }
        });
        displaySearchResults(results);
    }

    // Function to display search results
    function displaySearchResults(results) {
        searchResultsList.innerHTML = '';
        if (results.length === 0) {
            searchResultsList.innerHTML = '<li>No results found.</li>';
        } else {
            results.forEach(result => {
                const listItem = document.createElement('li');
                listItem.textContent = result.text;
                listItem.addEventListener('click', () => {
                    document.getElementById(result.sectionId).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
                searchResultsList.appendChild(listItem);
            });
        }
        searchResultsSection.style.display = 'block';
    }

    // Event listener for search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query === '') return;
        updateSearchHistory(query);
        performSearch(query);
        displaySearchHistory();
    });

    displaySearchHistory();
});







 //partner's logo sliding
 document.addEventListener("DOMContentLoaded", function() {
    const partnerLogos = document.querySelector('.partner-logos');
    const logos = document.querySelectorAll('.logo');

    let clonedLogos = [];
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clonedLogos.push(clone);
        partnerLogos.appendChild(clone);
    });

    function startSlideShow() {
        partnerLogos.style.animation = 'slide 10s linear infinite';
    }

    function resetSlideShow() {
        partnerLogos.style.animation = 'none';
        void partnerLogos.offsetWidth; // trigger reflow
        partnerLogos.style.animation = 'slide 10s linear infinite';
    }

    startSlideShow();

    partnerLogos.addEventListener('animationiteration', resetSlideShow);
});












//Just to be safe
  //for search results 
  document.addEventListener('DOMContentLoaded', function() {
    const searchForms = document.querySelectorAll('.search-form');
    const searchInput = document.querySelectorAll('input[type="search"]');
    const searchSuggestions = document.createElement('ul');
    searchSuggestions.classList.add('search-suggestions');
    document.body.appendChild(searchSuggestions);

    searchForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = form.querySelector('input[type="search"]').value.trim();
            if (query) {
                saveSearchHistory(query);
                localStorage.setItem('searchQuery', query);
                window.location.href = 'search.html';
            }
        });
    });

    searchInput.forEach(input => {
        input.addEventListener('input', function() {
            const query = input.value.trim();
            if (query) {
                showSuggestions(query);
            } else {
                searchSuggestions.style.display = 'none';
            }
        });

        input.addEventListener('focus', function() {
            const query = input.value.trim();
            if (query) {
                showSuggestions(query);
            }
        });

        input.addEventListener('blur', function() {
            setTimeout(() => {
                searchSuggestions.style.display = 'none';
            }, 100);
        });
    });

    function saveSearchHistory(query) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!searchHistory.includes(query)) {
            searchHistory.push(query);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    }

    function showSuggestions(query) {
        const results = [
            { title: 'Service 1', description: 'Description of Service 1', link: 'services.html' },
            { title: 'Service 2', description: 'Description of Service 2', link: 'services.html' },
            { title: 'About Us', description: 'Learn more about our company.', link: 'about.html' },
            { title: 'Privacy Policy', description: 'Read our privacy policy.', link: 'policies.html#privacy-policy' },
            { title: 'Terms of Use', description: 'Understand our terms of use.', link: 'policies.html#terms-of-use' },
            { title: 'Contact Us', description: 'Get in touch with us.', link: 'contact.html' },
            { title: 'Careers', description: 'Join our team.', link: 'careers.html' },
            { title: 'Healthcare Solutions', description: 'Our healthcare services.', link: 'services.html#healthcare' },
            { title: 'Education Programs', description: 'Our education services.', link: 'services.html#education' },
            { title: 'Financial Tools', description: 'Our financial services.', link: 'services.html#finance' },
            { title: 'Manufacturing Solutions', description: 'Our manufacturing services.', link: 'services.html#manufacturing' },
            { title: 'Agriculture Solutions', description: 'Our agriculture services.', link: 'services.html#agriculture' },
            { title: 'Retail Solutions', description: 'Our retail services.', link: 'services.html#retail' },
            { title: 'Smart Solutions', description: 'Our smart solutions.', link: 'services.html#smart-solutions' },
            { title: 'Consulting Services', description: 'Our consulting services.', link: 'services.html#consulting' },
            { title: 'Technology Solutions', description: 'Our technology solutions.', link: 'services.html#technology-solutions' },
            // Add more results as needed
        ];

        const filteredResults = results.filter(result =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        );

        searchSuggestions.innerHTML = '';
        filteredResults.forEach(result => {
            const suggestionItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = result.link;
            link.textContent = result.title;
            suggestionItem.appendChild(link);
            searchSuggestions.appendChild(suggestionItem);
        });

        searchSuggestions.style.display = filteredResults.length ? 'block' : 'none';
        const inputRect = searchInput[0].getBoundingClientRect();
        searchSuggestions.style.left = `${inputRect.left}px`;
        searchSuggestions.style.top = `${inputRect.bottom}px`;
        searchSuggestions.style.width = `${inputRect.width}px`;
    }
});


//Enabling all links to work

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();  // Prevent the default link behavior
            const targetUrl = link.getAttribute('href');
            if (targetUrl) {
                window.location.href = targetUrl;  // Redirect to the target URL
            }
        });
    });
});










//for displaying message when you hit submit on sign in


document.addEventListener('DOMContentLoaded', function () {
    // Handle sign-in form submission
    document.querySelector('#signinModal form').addEventListener('submit', function (event) {
        event.preventDefault();
        
        var email = document.querySelector('#signin-email').value;
        var messageContainer = document.createElement('div');
        messageContainer.className = 'alert alert-danger mt-3';
        messageContainer.textContent = "You're not authorized. Only for Jackal Tech employees.";
        
        if (email.endsWith('@jackaltech.com')) {
            messageContainer.className = 'alert alert-success mt-3';
            messageContainer.textContent = "Welcome, " + email.split('@')[0] + "!";
        }
        
        // Remove any previous message
        var previousMessage = document.querySelector('#signinModal .alert');
        if (previousMessage) {
            previousMessage.remove();
        }
        
        // Show the message
        document.querySelector('#signinModal .modal-body').appendChild(messageContainer);
    });

    // Handle sign-up form submission
    document.querySelector('#signupModal form').addEventListener('submit', function (event) {
        event.preventDefault();
        
        var messageContainer = document.createElement('div');
        messageContainer.className = 'alert alert-info mt-3';
        messageContainer.textContent = "Please use jackal tech associated email. Contact admin@jackaltechltd.com for help";
        
        // Remove any previous message
        var previousMessage = document.querySelector('#signupModal .alert');
        if (previousMessage) {
            previousMessage.remove();
        }
        
        // Show the message
        document.querySelector('#signupModal .modal-body').appendChild(messageContainer);
    });
});








//For subscription thank you message
document.addEventListener('DOMContentLoaded', function () {
    // Handle newsletter subscription form submission
    document.querySelector('.footer-column form').addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Create the message container
        var messageContainer = document.createElement('div');
        messageContainer.className = 'subscription-message';
        messageContainer.innerHTML = `
            <div class="message-box">
                <h2>Subscription Confirmed!</h2>
                <p>Thank you for subscribing to Jackal Tech's newsletter. Stay tuned for the latest updates, exclusive offers, and insights from our team.</p>
            </div>
        `;
        
        // Remove any previous message
        var previousMessage = document.querySelector('.subscription-message');
        if (previousMessage) {
            previousMessage.remove();
        }
        
        // Append the message container to the body
        document.body.appendChild(messageContainer);
        
        // Remove the message after 4 seconds and then submit the form
        setTimeout(function () {
            messageContainer.remove();
            event.target.submit();
        }, 3000);
    });
});







//Services Contact us


document.addEventListener('DOMContentLoaded', function () {
    // Handle contact form submission
    document.querySelector('form[action="https://formspree.io/f/xdknkejz"]').addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Create the message container
        var messageContainer = document.createElement('div');
        messageContainer.className = 'contact-message';
        messageContainer.innerHTML = `
           <div class="message-box">
                <h2>Message Received!</h2>
                <p>Thank you for reaching out to Jackal Tech. Our team has received your message and will get back to you as soon as possible. We appreciate your interest in our company.</p>
            </div>
        `;
        
        // Remove any previous message
        var previousMessage = document.querySelector('.contact-message');
        if (previousMessage) {
            previousMessage.remove();
        }
        
        // Append the message container to the body
        document.body.appendChild(messageContainer);
        
        // Remove the message after 3 seconds and then submit the form
        setTimeout(function () {
            messageContainer.remove();
            event.target.submit();
        }, 3000);
    });
});




//For careers Message Us



document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission for the provided form
    document.querySelector('form[action="https://formspree.io/f/meojoadn"]').addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Create the message container
        var messageContainer = document.createElement('div');
        messageContainer.className = 'contact-message';
        messageContainer.innerHTML = `
            <div class="message-box">
                <h2>Message Received!</h2>
                <p>Thank you for reaching out to Jackal Tech. Our team has received your message and will get back to you as soon as possible. We appreciate your interest in our company.</p>
            </div>
        `;
        
        // Remove any previous message
        var previousMessage = document.querySelector('.contact-message');
        if (previousMessage) {
            previousMessage.remove();
        }
        
        // Append the message container to the body
        document.body.appendChild(messageContainer);
        
        // Remove the message after 4 seconds and then submit the form
        setTimeout(function () {
            messageContainer.remove();
            event.target.submit();
        }, 4000);
    });
});






//Contact us- Contact Page



document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission for the provided form
    document.querySelector('form[action="https://formspree.io/f/mrbzbpvb"]').addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Create the message container
        var messageContainer = document.createElement('div');
        messageContainer.className = 'contact-message';
        messageContainer.innerHTML = `
            <div class="message-box">
                <h2>Message Received!</h2>
                <p>Thank you for reaching out to Jackal Tech. Our team has received your message and will get back to you as soon as possible. We appreciate your interest in our company.</p>
            </div>
        `;
        
        // Remove any previous message
        var previousMessage = document.querySelector('.contact-message');
        if (previousMessage) {
            previousMessage.remove();
        }
        
        // Append the message container to the body
        document.body.appendChild(messageContainer);
        
        // Remove the message after 4 seconds and then submit the form
        setTimeout(function () {
            messageContainer.remove();
            event.target.submit();
        }, 4000);
    });
});








  //chatbot section
document.addEventListener('DOMContentLoaded', function () {
    // Sanitize user input to prevent XSS attacks
    function sanitizeInput(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    // Chatbot Functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const sendButton = document.querySelector('.send-btn');
    const voiceButton = document.querySelector('.voice-btn');
    const fileButton = document.querySelector('.upload-file-btn');
    const pictureButton = document.querySelector('.upload-picture-btn');
    const takePictureButton = document.querySelector('.take-picture-btn');
    const fileInput = document.getElementById('fileInput');
    const recordingControls = document.querySelector('.recording-controls');
    const stopRecordButton = document.querySelector('.stop-record-btn');
    const audioElement = document.querySelector('audio');
    const sendRecordingButton = document.querySelector('.send-recording-btn');
    const recordingTime = document.getElementById('recording-time');
    const recordingIndicator = document.getElementById('recording-indicator');

    let mediaRecorder;
    let audioChunks = [];
    let recordingInterval;

    // Load chat history from localStorage
    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
        history.forEach(entry => {
            addMessage(entry.sender, entry.message, entry.type);
        });
    }

    // Save chat message to localStorage
    function saveChatMessage(sender, message, type) {
        const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
        history.push({ sender, message, type });
        localStorage.setItem('chatHistory', JSON.stringify(history));
    }

    // Show chatbot on hover
    chatbotToggle.addEventListener('mouseover', function () {
        chatbotWindow.style.display = 'flex';
        chatbotWindow.classList.add('fadeIn');
    });

    // Keep chatbot visible as long as cursor is on it
    chatbotWindow.addEventListener('mouseover', function () {
        chatbotWindow.style.display = 'flex';
    });

    chatbotToggle.addEventListener('mouseleave', function () {
        setTimeout(() => {
            if (!chatbotWindow.matches(':hover') && !isInteractionActive()) {
                chatbotWindow.style.display = 'none';
            }
        }, 500);
    });

    chatbotWindow.addEventListener('mouseleave', function () {
        setTimeout(() => {
            if (!chatbotToggle.matches(':hover') && !isInteractionActive()) {
                chatbotWindow.style.display = 'none';
            }
        }, 500);
    });

    // Close chatbot on 'Esc' key press
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            chatbotWindow.style.display = 'none';
        }
    });

    // Send message on 'Enter' key press
    chatbotInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    document.querySelector('.close-btn').addEventListener('click', function () {
        chatbotWindow.style.display = 'none';
    });

    // Add event listener for send button
    sendButton.addEventListener('click', function () {
        sendMessage();
    });

    // Handle voice recording
    voiceButton.addEventListener('click', function () {
        startVoiceRecording();
    });

    stopRecordButton.addEventListener('click', function () {
        stopVoiceRecording();
    });

    sendRecordingButton.addEventListener('click', function () {
        sendVoiceRecording();
    });

    // Handle file upload
    fileButton.addEventListener('click', function () {
        fileInput.accept = '*/*';
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        handleFileUpload(this.files[0]);
    });

    // Handle picture upload
    pictureButton.addEventListener('click', function () {
        fileInput.accept = 'image/*';
        fileInput.click();
    });

    // Handle taking a picture
    takePictureButton.addEventListener('click', function () {
        takePicture();
    });

    // Send a message
    function sendMessage() {
        const message = sanitizeInput(chatbotInput.value.trim());
        if (message === '') return;

        addMessage('user', message, 'text');
        saveChatMessage('user', message, 'text');
        chatbotInput.value = '';

        showTypingIndicator();

        setTimeout(() => {
            hideTypingIndicator();
            getResponse(message);
        }, 500);
    }

    // Add a message to the chat
    function addMessage(sender, message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', `${sender}-message`);
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        if (type === 'text') {
            messageContent.textContent = message;
        } else if (type === 'image') {
            const img = document.createElement('img');
            img.src = message;
            img.alt = 'Uploaded image';
            img.style.maxWidth = '100%';
            messageContent.appendChild(img);
        } else if (type === 'file') {
            const link = document.createElement('a');
            link.href = message;
            link.textContent = 'Uploaded file';
            link.target = '_blank';
            messageContent.appendChild(link);
        } else if (type === 'audio') {
            const audio = document.createElement('audio');
            audio.src = message;
            audio.controls = true;
            messageContent.appendChild(audio);
        }

        messageElement.appendChild(messageContent);
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function normalizeMessage(message) {
        const punctuationPattern = /[?.,!;:'"(){}\[\]<>@#$%^&*_\-+=|\\/~©®™¢§¶«»°±¿¡¤¥€₹฿₽₿]+/g;
        return message
            .replace(punctuationPattern, '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    // Fetch response from predefined responses or online sources
    async function getResponse(message) {
        const responses = {
            'hello': 'Hi there! How can I help you?',
            'are you sure':"Yes, I'm sure. How can I assist you today?",
            'hi' :'Hello! How can I assist you today? If you have any questions about Jackal Tech Ltd or need help, feel free to ask!',
            'hey' :'Hello! How can I assist you today? If you have any questions about Jackal Tech Ltd or need help, feel free to ask!',
            "what's up" :"What's up! How can I assist you today? If you have any questions about Jackal Tech Ltd or need help, feel free to ask!",
            'help': 'Sure, what do you need help with? You can also contact us at info@jackaltechltd.com.',
            'who are you': "I am Jackal Tech's customer service chatbot, here to assist you with any questions or information you need about our company and services. How can I help you today?",
            'services': 'We offer healthcare, education, finance, manufacturing, agriculture, and retail services.',
            'team': 'Our team consists of Ignace Kwizera (CEO), Emmanuel Ahishakiye (CTO), and Placide Shema (General Manager).',
            'events': 'We have events scheduled on 1st August, 15th August, and 30th August 2024.',
            'who created you': 'I was created by Emmanuel Ahishakiye.',
            'who made you': 'I was created by Emmanuel Ahishakiye.',
            'about emmanuel ahishakiye': 'Emmanuel Ahishakiye is the Founder, Spokesperson and CTO of Jackal Tech. He is a skilled software engineer with a passion for technology and innovation.',
            'who is emmanuel ahishakiye': 'Emmanuel Ahishakiye is the Founder, Spokesperson and CTO of Jackal Tech. He is a skilled software engineer with a passion for technology and innovation.',
            'tell me about emmanuel ahishakiye': 'Emmanuel Ahishakiye is the Founder, Spokesperson and CTO of Jackal Tech. He is a skilled software engineer with a passion for technology and innovation.',
            'tell me more about emmanuel ahishakiye': 'Emmanuel Ahishakiye is the Founder, Spokesperson and CTO of Jackal Tech. He is a skilled software engineer with a passion for technology and innovation.',
            'location': 'Jackal Tech is located in Kigali, Rwanda.',
            'founded': 'Jackal Tech was founded in late 2019.',
            'mission': 'Our mission is to drive technological innovation that addresses global challenges.',
            'vision': 'Our vision is to be a leader in technology, consistently creating impactful innovations that elevate scientific understanding, transform societies, and improve lives worldwide.',
            'values': 'Our core values are Innovation, Collaboration, Integrity, Empowerment, and Inclusivity.',
            'phone number': 'You can call us at +250 123 456 789.',
            'linkedin': 'Follow us on LinkedIn at [Jackal Tech Ltd](https://www.linkedin.com/company/100128722/admin/feed/posts/).',
            'instagram': 'Follow us on Instagram at [@jackal_tech](https://www.instagram.com/jackal_tech/).',
            'x': 'Follow us on X (formerly Twitter) at [@jackaltechltd](https://twitter.com/jackaltechltd).',
            'youtube': 'Subscribe to our YouTube channel at [Jackal Tech](https://www.youtube.com/channel/UC123456789).',
            'email for branding': 'For branding inquiries, please email us at branding@jackaltechltd.com.',
            'follow us': 'You can follow us on LinkedIn, Instagram, X (formerly Twitter), and YouTube for the latest updates.',
            'what is your email address': 'You can reach us at info@jackaltechltd.com.',
            'how can I contact you': 'You can contact us via email at info@jackaltechltd.com or call us at +250 123 456 789.',
            'ceo': 'The CEO of Jackal Tech Ltd is Ignace Kwizera.',
            'cto': 'The CTO of Jackal Tech Ltd is Emmanuel Ahishakiye.',
            'general manager': 'The General Manager of Jackal Tech Ltd is Placide Shema.',
            'cfo': 'The CFO of Jackal Tech Ltd is Fifi Gisele Nyampinga.',
            'where is jackal tech located': 'Jackal Tech is located in Kigali, Rwanda.',
            'what is jackal tech': 'Jackal Tech Ltd is a technology company focused on innovative solutions in various sectors including healthcare, education, finance, manufacturing, agriculture, retail, transportation, and energy.',
            'how to apply for a job at jackal tech': 'You can apply for a job at Jackal Tech by visiting our Careers page and submitting an online application.',
            'current job openings': 'You can view our current job openings on the Careers page of our website.',
            'how to contact support': 'You can contact support by emailing support@jackaltechltd.com or calling +250 123 456 789.',
            'customer service email': 'You can reach our customer service at support@jackaltechltd.com.',
            'partnership inquiries': 'For partnership inquiries, please email us at partnerships@jackaltechltd.com.',
            'media inquiries': 'For media inquiries, please email us at media@jackaltechltd.com.',
            'how to become a partner': 'To become a partner, please reach out to us at partnerships@jackaltechltd.com.',
            'upcoming events': 'We have events scheduled on 1st August, 15th August, and 30th August 2024. For more details, visit our Events page.',
            'how to register for events': 'You can register for our events through the Events page on our website.',
            'latest news': 'For the latest news, visit the News section on our website or follow us on our social media channels.',
            'how to request a demo': 'To request a demo, please email us at demo@jackaltechltd.com.',
            'pricing information': 'For pricing information, please visit our Services page or contact us at pricing@jackaltechltd.com.',
            'how to get a quote': 'To get a quote, please email us at quotes@jackaltechltd.com with your requirements.',
            'request a callback': 'To request a callback, please fill out the form on our Contact Us page.',
            'support hours': 'Our support team is available from 9 AM to 5 PM, Monday to Friday.',
            'technical support email': 'For technical support, please email us at techsupport@jackaltechltd.com.',
            'how to reset password': 'To reset your password, go to the login page and click on "Forgot Password?". Follow the instructions to reset your password.',
            'privacy policy': 'You can read our privacy policy on the Privacy Policy page of our website.',
            'terms of use': 'You can read our terms of use on the Terms of Use page of our website.',
            'cookie policy': 'You can read our cookie policy on the Cookie Policy page of our website.',
            'accessibility statement': 'You can read our accessibility statement on the Accessibility Statement page of our website.',
            'copyright policy': 'You can read our copyright policy on the Copyright Policy page of our website.',
            'faq': 'You can find answers to frequently asked questions on the FAQs page of our website.',
            'refund policy': 'You can read our refund policy on the Refund Policy page of our website.',
            'cancellation policy': 'You can read our cancellation policy on the Cancellation Policy page of our website.',
            'how to update account information': 'To update your account information, log in to your account and go to the account settings page.',
            'how to delete account': 'To delete your account, please contact us at support@jackaltechltd.com.',
            'how to subscribe to newsletter': 'To subscribe to our newsletter, enter your email address in the subscription form at the bottom of our homepage.',
            'how to unsubscribe from newsletter': 'To unsubscribe from our newsletter, click the unsubscribe link at the bottom of any of our emails.',
            'do you offer remote work': 'Yes, we offer remote work opportunities for certain positions. The availability of remote work will be specified in the job description.',
            'what is your cancellation policy': 'Customers can cancel for an automatic full refund of their booking fee 24 hours prior to the start of the appointment. In the event of an emergency or the business not delivering the service at the set time, a refund request will require a review and approval process which could take a couple of days.',
            'how do i receive my booking fee refund': 'Refunds are rewarded as a balance in the customer’s account and can be used by the customer at the next appointment. We do not offer a cash refund at the moment.',
            'how long does it take to get booking fee refund': 'Instant refund is provided if cancellation happens 24 hours prior to the appointment time. In any other case, it could take a few days to review the refund request and approve it.',
            'Estimate Emmanuel Ahishakiye net worth': "Estimating Emmanuel Ahishakiye's net worth is challenging due to limited publicly available information. While Emmanuel's achievements are impressive, there is no specific data on his net worth. Given his current roles and ongoing education, it is likely that his primary focus is on building his career and gaining experience, rather than accumulating significant wealth at this stage.",
            'Estimate the Emmanuel Ahishakiye net worth': "Estimating Emmanuel Ahishakiye's net worth is challenging due to limited publicly available information. While Emmanuel's achievements are impressive, there is no specific data on his net worth. Given his current roles and ongoing education, it is likely that his primary focus is on building his career and gaining experience, rather than accumulating significant wealth at this stage.",
            
             'Emmanuel Ahishakiye net worth': "Estimating Emmanuel Ahishakiye's net worth is challenging due to limited publicly available information. While Emmanuel's achievements are impressive, there is no specific data on his net worth. Given his current roles and ongoing education, it is likely that his primary focus is on building his career and gaining experience, rather than accumulating significant wealth at this stage.",
              'Net worth of Emmanuel Ahishakiye': "Estimating Emmanuel Ahishakiye's net worth is challenging due to limited publicly available information. While Emmanuel's achievements are impressive, there is no specific data on his net worth. Given his current roles and ongoing education, it is likely that his primary focus is on building his career and gaining experience, rather than accumulating significant wealth at this stage.",
               'what is the net worth Emmanuel Ahishakiye': "Estimating Emmanuel Ahishakiye's net worth is challenging due to limited publicly available information. While Emmanuel's achievements are impressive, there is no specific data on his net worth. Given his current roles and ongoing education, it is likely that his primary focus is on building his career and gaining experience, rather than accumulating significant wealth at this stage.",
               'the net worth Emmanuel Ahishakiye': "Estimating Emmanuel Ahishakiye's net worth is challenging due to limited publicly available information. While Emmanuel's achievements are impressive, there is no specific data on his net worth. Given his current roles and ongoing education, it is likely that his primary focus is on building his career and gaining experience, rather than accumulating significant wealth at this stage.",
            'what if the business cancels': 'The customer gets an automatic full refund of the booking fee regardless of the time the business cancelled.',
            'can i contact support via phone': 'Yes, you can call our support team at +250 123 456 789.',
            'how to track my order': 'You can track your order by logging into your account and checking the order status under "My Orders".',
            'do you offer training programs': 'Yes, we offer various training programs. For more information, please visit the Training section on our website.',
            'how to request a training program': 'To request a training program, please contact us at training@jackaltechltd.com.',
            'how to request a proposal': 'To request a proposal, please email us at proposals@jackaltechltd.com.',
            'how to join your team': 'To join our team, please visit our Careers page and apply for the open positions.',
            'what is your return policy': 'You can read our return policy on the Return Policy page of our website.',
            'how to update billing information': 'To update your billing information, log in to your account and go to the billing settings page.',
            'do you have a mobile app': 'Yes, we have a mobile app available on both iOS and Android platforms. You can download it from the App Store or Google Play.',
            'how to download your mobile app': 'You can download our mobile app from the App Store for iOS devices or Google Play for Android devices.',
            'can i visit your office': 'Yes, you can visit our office. Our address is Kigali, Rwanda. Please contact us to schedule an appointment.',
            'what are your office hours': 'Our office hours are from 9 AM to 5 PM, Monday to Friday.',
            'how to book a consultation': 'To book a consultation, please visit the Contact Us page and fill out the consultation request form.',
            'how to apply for internship': 'To apply for an internship, please visit our Careers page and submit your application under the Internship section.',
            'what are the internship requirements': 'The internship requirements vary by position. Please refer to the job description for specific requirements.',
            'how to report a problem': 'To report a problem, please contact our support team at support@jackaltechltd.com.',
            'what is your social media policy': 'You can read our social media policy on the Social Media Policy page of our website.',
            'how to provide feedback': 'To provide feedback, please fill out the feedback form on our Contact Us page.',
            'do you offer customer support on social media': 'Yes, you can reach out to us on LinkedIn, Instagram, X (formerly Twitter), and YouTube for customer support.',
            'how to reset my password': 'To reset your password, go to the login page and click on "Forgot Password?". Follow the instructions to reset your password.',
            'how to update my email address': 'To update your email address, log in to your account and go to the account settings page.',
            'how to change my subscription plan': 'To change your subscription plan, log in to your account and go to the subscription settings page.',
            'what payment methods do you accept': 'We accept various payment methods including credit cards, debit cards, and online payment platforms. For more information, please visit the Payment Methods page on our website.',
            'how to upgrade my plan': 'To upgrade your plan, log in to your account and go to the subscription settings page. Select the desired plan and follow the instructions to upgrade.',
            'do you offer discounts': 'Yes, we offer various discounts and promotions. Please visit our Promotions page for current offers.',
            'how to apply a discount code': 'To apply a discount code, enter the code during the checkout process on the payment page.',
            'do you offer gift cards': 'Yes, we offer gift cards. You can purchase them from the Gift Cards page on our website.',
            'how to redeem a gift card': 'To redeem a gift card, enter the gift card code during the checkout process on the payment page.',
            'do you offer free trials': 'Yes, we offer free trials for certain services. Please visit the Free Trials page on our website for more information.',
            'how to sign up for a free trial': 'To sign up for a free trial, visit the Free Trials page on our website and fill out the sign-up form.',
            'do you have a referral program': 'Yes, we have a referral program. You can learn more about it on the Referral Program page on our website.',
            'how to refer a friend': 'To refer a friend, log in to your account and go to the Referral Program page. Follow the instructions to refer your friend.',
            'what is your affiliate program': 'You can learn about our affiliate program on the Affiliate Program page of our website.',
            'how to join the affiliate program': 'To join the affiliate program, visit the Affiliate Program page and fill out the sign-up form.',
            'do you offer bulk discounts': 'Yes, we offer bulk discounts for large orders. Please contact us at sales@jackaltechltd.com for more information.',
            'how to place a bulk order': 'To place a bulk order, please contact our sales team at sales@jackaltechltd.com.',
            'do you offer customization services': 'Yes, we offer customization services. For more information, please visit the Customization Services page on our website.',
            'how to request customization': 'To request customization, please contact us at customization@jackaltechltd.com with your requirements.',
            'do you offer white-label solutions': 'Yes, we offer white-label solutions. For more information, please visit the White-Label Solutions page on our website.',
            'how to request a white-label solution': 'To request a white-label solution, please contact us at whitelabel@jackaltechltd.com with your requirements.',
            'do you offer API access': 'Yes, we offer API access for developers. For more information, please visit the API Access page on our website.',
            'how to request API access': 'To request API access, please contact us at api@jackaltechltd.com with your requirements.',
            'do you offer consulting services': 'Yes, we offer consulting services. For more information, please visit the Consulting Services page on our website.',
            'how to request consulting services': 'To request consulting services, please contact us at consulting@jackaltechltd.com with your requirements.',
            'do you offer training for your products': 'Yes, we offer training for our products. For more information, please visit the Training page on our website.',
            'how to request product training': 'To request product training, please contact us at training@jackaltechltd.com with your requirements.',
            'do you offer support in multiple languages': 'Yes, we offer support in multiple languages. For more information, please contact us at support@jackaltechltd.com.',
            'how to change language settings': 'To change language settings, log in to your account and go to the language settings page.',
            'what languages do you support': 'We support multiple languages. For more information, please visit the Language Support page on our website.',
            'do you offer internships': 'Yes, we offer internships. For more information, please visit the Internships page on our website.',
            'how to apply for an internship': 'To apply for an internship, please visit our Careers page and submit your application under the Internship section.',
            'do you offer job shadowing opportunities': 'Yes, we offer job shadowing opportunities. For more information, please visit the Job Shadowing page on our website.',
            'how to request job shadowing': 'To request job shadowing, please contact us at jobshadowing@jackaltechltd.com with your requirements.',
            'do you offer mentorship programs': 'Yes, we offer mentorship programs. For more information, please visit the Mentorship Programs page on our website.',
            'how to request a mentor': 'To request a mentor, please contact us at mentorship@jackaltechltd.com with your requirements.',
            'do you offer sponsorship opportunities': 'Yes, we offer sponsorship opportunities. For more information, please visit the Sponsorship Opportunities page on our website.',
            'how to request sponsorship': 'To request sponsorship, please contact us at sponsorship@jackaltechltd.com with your requirements.',
            'do you offer scholarships': 'Yes, we offer scholarships. For more information, please visit the Scholarships page on our website.',
            'how to apply for a scholarship': 'To apply for a scholarship, please visit the Scholarships page and follow the application instructions.',
            'what are the scholarship requirements': 'The scholarship requirements vary by program. Please refer to the Scholarship page for specific requirements.',
            'do you offer relocation assistance': 'Yes, we offer relocation assistance for certain positions. For more information, please visit the Relocation Assistance page on our website.',
            'how to request relocation assistance': 'To request relocation assistance, please contact us at relocation@jackaltechltd.com with your requirements.',
            'do you offer health benefits': 'Yes, we offer health benefits to our employees. For more information, please visit the Health Benefits page on our website.',
            'what health benefits do you offer': 'We offer various health benefits including medical, dental, and vision coverage. For more information, please visit the Health Benefits page on our website.',
            'do you offer retirement plans': 'Yes, we offer retirement plans to our employees. For more information, please visit the Retirement Plans page on our website.',
            'what retirement plans do you offer': 'We offer various retirement plans including 401(k) and pension plans. For more information, please visit the Retirement Plans page on our website.',
            'do you offer tuition reimbursement': 'Yes, we offer tuition reimbursement for certain programs. For more information, please visit the Tuition Reimbursement page on our website.',
            'how to request tuition reimbursement': 'To request tuition reimbursement, please contact us at tuition@jackaltechltd.com with your requirements.',
            'do you offer volunteer opportunities': 'Yes, we offer volunteer opportunities. For more information, please visit the Volunteer Opportunities page on our website.',
            'how to volunteer': 'To volunteer, please visit the Volunteer Opportunities page and follow the application instructions.',
            'do you offer employee discounts': 'Yes, we offer employee discounts on various products and services. For more information, please visit the Employee Discounts page on our website.',
            'how to access employee discounts': 'To access employee discounts, log in to your account and go to the Employee Discounts page.',
            'do you offer relocation packages': 'Yes, we offer relocation packages for certain positions. For more information, please visit the Relocation Packages page on our website.',
            'how to request a relocation package': 'To request a relocation package, please contact us at relocation@jackaltechltd.com with your requirements.',
            'do you offer performance bonuses': 'Yes, we offer performance bonuses to our employees. For more information, please visit the Performance Bonuses page on our website.',
            'how to earn performance bonuses': 'Performance bonuses are awarded based on individual and company performance. For more information, please visit the Performance Bonuses page on our website.',
            'do you offer flexible working hours': 'Yes, we offer flexible working hours for certain positions. For more information, please visit the Flexible Working Hours page on our website.',
            'how to request flexible working hours': 'To request flexible working hours, please contact us at flexiblehours@jackaltechltd.com with your requirements.',
            'do you offer remote work options': 'Yes, we offer remote work options for certain positions. For more information, please visit the Remote Work page on our website.',
            'how to request remote work': 'To request remote work, please contact us at remotework@jackaltechltd.com with your requirements.',
            'do you offer wellness programs': 'Yes, we offer wellness programs to our employees. For more information, please visit the Wellness Programs page on our website.',
            'how to participate in wellness programs': 'To participate in wellness programs, log in to your account and go to the Wellness Programs page.',
            'do you offer travel assistance': 'Yes, we offer travel assistance for certain positions. For more information, please visit the Travel Assistance page on our website.',
            'how to request travel assistance': 'To request travel assistance, please contact us at travel@jackaltechltd.com with your requirements.',
            'do you offer legal assistance': 'Yes, we offer legal assistance to our employees. For more information, please visit the Legal Assistance page on our website.',
            'how to request legal assistance': 'To request legal assistance, please contact us at legal@jackaltechltd.com with your requirements.',
            'do you offer financial planning services': 'Yes, we offer financial planning services to our employees. For more information, please visit the Financial Planning page on our website.',
            'how to request financial planning services': 'To request financial planning services, please contact us at financial@jackaltechltd.com with your requirements.',
            'do you offer career development programs': 'Yes, we offer career development programs to our employees. For more information, please visit the Career Development page on our website.',
            'how to participate in career development programs': 'To participate in career development programs, log in to your account and go to the Career Development page.',
            'do you offer employee assistance programs': 'Yes, we offer employee assistance programs to our employees. For more information, please visit the Employee Assistance page on our website.',
            'how to request employee assistance': 'To request employee assistance, please contact us at assistance@jackaltechltd.com with your requirements.',
            'do you offer relocation support': 'Yes, we offer relocation support for certain positions. For more information, please visit the Relocation Support page on our website.',
            'how to request relocation support': 'To request relocation support, please contact us at relocation@jackaltechltd.com with your requirements.',
            'do you offer professional development programs': 'Yes, we offer professional development programs to our employees. For more information, please visit the Professional Development page on our website.',
            'how to participate in professional development programs': 'To participate in professional development programs, log in to your account and go to the Professional Development page.',
            'do you offer mentorship opportunities': 'Yes, we offer mentorship opportunities. For more information, please visit the Mentorship Opportunities page on our website.',
            'how to request a mentorship': 'To request a mentorship, please contact us at mentorship@jackaltechltd.com with your requirements.',
            'do you offer sabbatical leave': 'Yes, we offer sabbatical leave for certain positions. For more information, please visit the Sabbatical Leave page on our website.',
            'how to request sabbatical leave': 'To request sabbatical leave, please contact us at sabbatical@jackaltechltd.com with your requirements.',
            'do you offer parental leave': 'Yes, we offer parental leave to our employees. For more information, please visit the Parental Leave page on our website.',
            'how to request parental leave': 'To request parental leave, please contact us at parental@jackaltechltd.com with your requirements.',
            'do you offer paid time off': 'Yes, we offer paid time off to our employees. For more information, please visit the Paid Time Off page on our website.',
            'how to request paid time off': 'To request paid time off, log in to your account and go to the Paid Time Off page.',
            'do you offer bereavement leave': 'Yes, we offer bereavement leave to our employees. For more information, please visit the Bereavement Leave page on our website.',
            'how to request bereavement leave': 'To request bereavement leave, please contact us at bereavement@jackaltechltd.com with your requirements.',
            'do you offer diversity and inclusion programs': 'Yes, we offer diversity and inclusion programs. For more information, please visit the Diversity and Inclusion page on our website.',
            'how to participate in diversity and inclusion programs': 'To participate in diversity and inclusion programs, log in to your account and go to the Diversity and Inclusion page.',
            'do you offer wellness workshops': 'Yes, we offer wellness workshops to our employees. For more information, please visit the Wellness Workshops page on our website.',
            'how to participate in wellness workshops': 'To participate in wellness workshops, log in to your account and go to the Wellness Workshops page.',
            'do you offer gym memberships': 'Yes, we offer gym memberships to our employees. For more information, please visit the Gym Memberships page on our website.',
            'how to request a gym membership': 'To request a gym membership, please contact us at gym@jackaltechltd.com with your requirements.',
            'do you offer meal plans': 'Yes, we offer meal plans to our employees. For more information, please visit the Meal Plans page on our website.',
            'how to request a meal plan': 'To request a meal plan, please contact us at meals@jackaltechltd.com with your requirements.',
            'do you offer relocation bonuses': 'Yes, we offer relocation bonuses for certain positions. For more information, please visit the Relocation Bonuses page on our website.',
            'how to request a relocation bonus': 'To request a relocation bonus, please contact us at relocation@jackaltechltd.com with your requirements.',
            'do you offer home office setups': 'Yes, we offer home office setups for remote workers. For more information, please visit the Home Office Setups page on our website.',
            'how to request a home office setup': 'To request a home office setup, please contact us at homeoffice@jackaltechltd.com with your requirements.',
            'do you offer pet insurance': 'Yes, we offer pet insurance to our employees. For more information, please visit the Pet Insurance page on our website.',
            'how to request pet insurance': 'To request pet insurance, please contact us at petinsurance@jackaltechltd.com with your requirements.',
            'do you offer travel insurance': 'Yes, we offer travel insurance to our employees. For more information, please visit the Travel Insurance page on our website.',
            'how to request travel insurance': 'To request travel insurance, please contact us at travelinsurance@jackaltechltd.com with your requirements.',
            'do you offer rental car services': 'Yes, we offer rental car services for business travel. For more information, please visit the Rental Car Services page on our website.',
            'how to request rental car services': 'To request rental car services, please contact us at rentalcars@jackaltechltd.com with your requirements.',
            'do you offer company cars': 'Yes, we offer company cars for certain positions. For more information, please visit the Company Cars page on our website.',
            'how to request a company car': 'To request a company car, please contact us at companycars@jackaltechltd.com with your requirements.',
            'do you offer commuter benefits': 'Yes, we offer commuter benefits to our employees. For more information, please visit the Commuter Benefits page on our website.',
            'how to request commuter benefits': 'To request commuter benefits, please contact us at commuter@jackaltechltd.com with your requirements.',
            'do you offer childcare services': 'Yes, we offer childcare services to our employees. For more information, please visit the Childcare Services page on our website.',
            'how to request childcare services': 'To request childcare services, please contact us at childcare@jackaltechltd.com with your requirements.',
            'do you offer educational resources': 'Yes, we offer educational resources to our employees. For more information, please visit the Educational Resources page on our website.',
            'how to access educational resources': 'To access educational resources, log in to your account and go to the Educational Resources page.',
            'do you offer career coaching': 'Yes, we offer career coaching to our employees. For more information, please visit the Career Coaching page on our website.',
            'how to request career coaching': 'To request career coaching, please contact us at careercoaching@jackaltechltd.com with your requirements.',
            'do you offer financial assistance': 'Yes, we offer financial assistance to our employees. For more information, please visit the Financial Assistance page on our website.',
            'how to request financial assistance': 'To request financial assistance, please contact us at financialassistance@jackaltechltd.com with your requirements.',
            'do you offer legal advice': 'Yes, we offer legal advice to our employees. For more information, please visit the Legal Advice page on our website.',
            'how to request legal advice': 'To request legal advice, please contact us at legaladvice@jackaltechltd.com with your requirements.',
            'do you offer employee recognition programs': 'Yes, we offer employee recognition programs. For more information, please visit the Employee Recognition page on our website.',
            'how to participate in employee recognition programs': 'To participate in employee recognition programs, log in to your account and go to the Employee Recognition page.',
            'do you offer professional certifications': 'Yes, we offer professional certifications. For more information, please visit the Professional Certifications page on our website.',
            'how to request professional certifications': 'To request professional certifications, please contact us at certifications@jackaltechltd.com with your requirements.',
            'do you offer team-building activities': 'Yes, we offer team-building activities. For more information, please visit the Team-Building Activities page on our website.',
            'how to participate in team-building activities': 'To participate in team-building activities, log in to your account and go to the Team-Building Activities page.',
            'do you offer leadership development programs': 'Yes, we offer leadership development programs. For more information, please visit the Leadership Development page on our website.',
            'how to participate in leadership development programs': 'To participate in leadership development programs, log in to your account and go to the Leadership Development page.',
            'do you offer networking opportunities': 'Yes, we offer networking opportunities. For more information, please visit the Networking Opportunities page on our website.',
            'how to participate in networking opportunities': 'To participate in networking opportunities, log in to your account and go to the Networking Opportunities page.',
            'do you offer innovation workshops': 'Yes, we offer innovation workshops. For more information, please visit the Innovation Workshops page on our website.',
            'how to participate in innovation workshops': 'To participate in innovation workshops, log in to your account and go to the Innovation Workshops page.',
            'do you offer mindfulness programs': 'Yes, we offer mindfulness programs. For more information, please visit the Mindfulness Programs page on our website.',
            'how to participate in mindfulness programs': 'To participate in mindfulness programs, log in to your account and go to the Mindfulness Programs page.',
            'do you offer diversity training': 'Yes, we offer diversity training. For more information, please visit the Diversity Training page on our website.',
            'how to participate in diversity training': 'To participate in diversity training, log in to your account and go to the Diversity Training page.',
            'do you offer conflict resolution programs': 'Yes, we offer conflict resolution programs. For more information, please visit the Conflict Resolution Programs page on our website.',
            'how to participate in conflict resolution programs': 'To participate in conflict resolution programs, log in to your account and go to the Conflict Resolution Programs page.',
            'do you offer sustainability initiatives': 'Yes, we offer sustainability initiatives. For more information, please visit the Sustainability Initiatives page on our website.',
            'how to participate in sustainability initiatives': 'To participate in sustainability initiatives, log in to your account and go to the Sustainability Initiatives page.',
            'do you offer technical certifications': 'Yes, we offer technical certifications. For more information, please visit the Technical Certifications page on our website.',
            'how to request technical certifications': 'To request technical certifications, please contact us at technicalcertifications@jackaltechltd.com with your requirements.',
            'do you offer green initiatives': 'Yes, we offer green initiatives. For more information, please visit the Green Initiatives page on our website.',
            'how to participate in green initiatives': 'To participate in green initiatives, log in to your account and go to the Green Initiatives page.',
            'do you offer remote work equipment': 'Yes, we offer remote work equipment for remote employees. For more information, please visit the Remote Work Equipment page on our website.',
            'how to request remote work equipment': 'To request remote work equipment, please contact us at remotework@jackaltechltd.com with your requirements.',
            'do you offer career growth opportunities': 'Yes, we offer career growth opportunities to our employees. For more information, please visit the Career Growth page on our website.',
            'how to participate in career growth programs': 'To participate in career growth programs, log in to your account and go to the Career Growth page.',
            'do you offer community engagement programs': 'Yes, we offer community engagement programs. For more information, please visit the Community Engagement page on our website.',
            'how to participate in community engagement programs': 'To participate in community engagement programs, log in to your account and go to the Community Engagement page.',
            'do you offer mental health support': 'Yes, we offer mental health support to our employees. For more information, please visit the Mental Health Support page on our website.',
            'how to request mental health support': 'To request mental health support, please contact us at mentalhealth@jackaltechltd.com with your requirements.',
            'do you offer crisis management services': 'Yes, we offer crisis management services. For more information, please visit the Crisis Management page on our website.',
            'how to request crisis management services': 'To request crisis management services, please contact us at crisismanagement@jackaltechltd.com with your requirements.',
            'do you offer cultural exchange programs': 'Yes, we offer cultural exchange programs. For more information, please visit the Cultural Exchange page on our website.',
            'how to participate in cultural exchange programs': 'To participate in cultural exchange programs, log in to your account and go to the Cultural Exchange page.',
            'do you offer flexible work schedules': 'Yes, we offer flexible work schedules for certain positions. For more information, please visit the Flexible Work Schedules page on our website.',
            'how to request a flexible work schedule': 'To request a flexible work schedule, please contact us at flexiblework@jackaltechltd.com with your requirements.',
            'do you offer job rotation programs': 'Yes, we offer job rotation programs to our employees. For more information, please visit the Job Rotation Programs page on our website.',
            'how to participate in job rotation programs': 'To participate in job rotation programs, log in to your account and go to the Job Rotation Programs page.',
            'do you offer digital wellness programs': 'Yes, we offer digital wellness programs. For more information, please visit the Digital Wellness Programs page on our website.',
            'how to participate in digital wellness programs': 'To participate in digital wellness programs, log in to your account and go to the Digital Wellness Programs page.',
            'do you offer global mobility programs': 'Yes, we offer global mobility programs. For more information, please visit the Global Mobility Programs page on our website.',
            'how to request global mobility': 'To request global mobility, please contact us at globalmobility',
            
        'what does jackal tech do': 'Jackal Tech Ltd focuses on innovative technology solutions across various sectors, including healthcare, education, finance, manufacturing, agriculture, retail, transportation, and energy.',
        'how to apply for a job at jackal tech': 'You can apply for a job at Jackal Tech by visiting our Careers page and submitting an online application.',
        'what is jackal tech': 'Jackal Tech Ltd is a technology company known for its innovative solutions and impactful projects.',
        'where is jackal tech located': 'Jackal Tech is located in Kigali, Rwanda.',
        'who are the founders of jackal tech': 'The founders of Jackal Tech are Ignace Kwizera, Emmanuel Ahishakiye, and Placide Shema.',
        'what is the mission of jackal tech': 'Our mission is to drive technological innovation that addresses global challenges.',
        'what is the vision of jackal tech': 'Our vision is to be a leader in technology, consistently creating impactful innovations that elevate scientific understanding, transform societies, and improve lives worldwide.',
        'what are the values of jackal tech': 'Our core values are Innovation, Collaboration, Integrity, Empowerment, and Inclusivity.',
        'how to contact jackal tech': 'You can contact us via email at info@jackaltechltd.com or call us at +250 123 456 789.',
        'what services does jackal tech offer': 'We offer services in healthcare, education, finance, manufacturing, agriculture, retail, transportation, and energy sectors.',
        'how to request a quote from jackal tech': 'To request a quote, please email us at quotes@jackaltechltd.com with your requirements.',
        'how to get a demo of jackal tech products': 'To request a demo, please email us at demo@jackaltechltd.com.',
        'how to partner with jackal tech': 'For partnership inquiries, please email us at partnerships@jackaltechltd.com.',
        'how to follow jackal tech on social media': 'You can follow us on LinkedIn, Instagram, X (formerly Twitter), and YouTube for the latest updates.',
        'what is the hiring process at jackal tech': 'Our hiring process typically involves submitting an online application, completing an initial screening, attending interviews, and receiving an offer if selected.',
        'does jackal tech offer internships': 'Yes, we offer internships. For more information, please visit the Internships page on our website.',
        'how to apply for an internship at jackal tech': 'To apply for an internship, please visit our Careers page and submit your application under the Internship section.',
        'who is the ceo of jackal tech': 'The CEO of Jackal Tech Ltd is Ignace Kwizera.',
        'who is the cto of jackal tech': 'The CTO of Jackal Tech Ltd is Emmanuel Ahishakiye.',
        'who is the general manager of jackal tech': 'The General Manager of Jackal Tech Ltd is Placide Shema.',
        'how to subscribe to jackal tech newsletter': 'To subscribe to our newsletter, enter your email address in the subscription form at the bottom of our homepage.',
        'how to join jackal tech team': 'To join our team, please visit our Careers page and apply for the open positions.',
        'what are jackal tech policies': 'You can read our policies on the Policies page of our website, including Privacy Policy, Terms of Use, and more.',
        'how to reset jackal tech account password': 'To reset your password, go to the login page and click on "Forgot Password?". Follow the instructions to reset your password.',
        'how to update jackal tech account information': 'To update your account information, log in to your account and go to the account settings page.',
        'how to contact jackal tech support': 'You can contact support by emailing support@jackaltechltd.com or calling +250 123 456 789.',
        'what is jackal tech refund policy': 'You can read our refund policy on the Refund Policy page of our website.',
        'how to report a problem to jackal tech': 'To report a problem, please contact our support team at support@jackaltechltd.com.',
        'how to follow jackal tech on linkedin': 'Follow us on LinkedIn at [Jackal Tech Ltd](https://www.linkedin.com/company/100128722/admin/feed/posts/).',
        'how to follow jackal tech on instagram': 'Follow us on Instagram at [@jackal_tech](https://www.instagram.com/jackal_tech/).',
        'how to follow jackal tech on x': 'Follow us on X (formerly Twitter) at [@jackaltechltd](https://twitter.com/jackaltechltd).',
        'how to subscribe to jackal tech youtube channel': 'Subscribe to our YouTube channel at [Jackal Tech](https://www.youtube.com/channel/UC123456789).',
        'does jackal tech offer remote work opportunities': 'Yes, we offer remote work opportunities for certain positions. The availability of remote work will be specified in the job description.',
        'how to book a consultation with jackal tech': 'To book a consultation, please visit the Contact Us page and fill out the consultation request form.',
        'how to request jackal tech training program': 'To request a training program, please contact us at training@jackaltechltd.com.',
        'how to get jackal tech pricing information': 'For pricing information, please visit our Services page or contact us at pricing@jackaltechltd.com.',
        'how to request jackal tech proposal': 'To request a proposal, please email us at proposals@jackaltechltd.com.',
        'how to contact jackal tech for media inquiries': 'For media inquiries, please email us at media@jackaltechltd.com.',
        'how to request jackal tech customer support': 'You can contact customer support by emailing support@jackaltechltd.com or calling +250 123 456 789.',
        'what is jackal tech cancellation policy': 'You can read our cancellation policy on the Cancellation Policy page of our website.',
        'what are jackal tech office hours': 'Our office hours are from 9 AM to 5 PM, Monday to Friday.',
        'how to visit jackal tech office': 'You can visit our office. Our address is Kigali, Rwanda. Please contact us to schedule an appointment.',
        'how to access jackal tech career development programs': 'To participate in career development programs, log in to your account and go to the Career Development page.',
        'how to access jackal tech employee benefits': 'For more information on employee benefits, please visit the Employee Benefits page on our website.',
        'what are jackal tech employee benefits': 'We offer various benefits including health insurance, retirement plans, and professional development programs. For more information, visit the Employee Benefits page on our website.',
        'how to get involved in jackal tech community programs': 'To get involved, visit the Community Engagement page on our website or contact us for more details.',
        'how to stay updated with jackal tech news': 'For the latest news, visit the News section on our website or follow us on our social media channels.',
        'how to provide feedback to jackal tech': 'To provide feedback, please fill out the feedback form on our Contact Us page.',
        'how to track jackal tech order': 'You can track your order by logging into your account and checking the order status under "My Orders".',
        'how to join jackal tech affiliate program': 'To join the affiliate program, visit the Affiliate Program page and fill out the sign-up form.',
        'how to participate in jackal tech events': 'To participate in our events, visit the Events page on our website and follow the registration instructions.',
        'what is jackal tech company culture': 'Our company culture is built on collaboration, innovation, and employee well-being. We value diversity, integrity, and a commitment to excellence.',
        'does jackal tech offer scholarships': 'Yes, we offer scholarships. For more information, please visit the Scholarships page on our website.',
        'how to apply for jackal tech scholarship': 'To apply for a scholarship, please visit the Scholarships page and follow the application instructions.',
        'what is jackal tech diversity policy': 'You can read our diversity policy on the Diversity and Inclusion page of our website.',
        'does jackal tech support open source': 'Yes, we support and contribute to open-source projects. For more information, visit our Open Source Contributions page.',
        'how to contribute to jackal tech open source projects': 'To contribute, visit our Open Source Contributions page for guidelines and details.',
        'does jackal tech offer project management services': 'Yes, we offer project management services. For more information, please visit the Services page on our website.',
        'how to request jackal tech project management services': 'To request project management services, please contact us at projects@jackaltechltd.com.',
        'does jackal tech offer software development services': 'Yes, we offer software development services. For more information, please visit the Services page on our website.',
        'how to request jackal tech software development services': 'To request software development services, please contact us at software@jackaltechltd.com.',
        'does jackal tech offer data analytics services': 'Yes, we offer data analytics services. For more information, please visit the Services page on our website.',
        'how to request jackal tech data analytics services': 'To request data analytics services, please contact us at data@jackaltechltd.com.',
        'does jackal tech offer cybersecurity services': 'Yes, we offer cybersecurity services. For more information, please visit the Services page on our website.',
        'how to request jackal tech cybersecurity services': 'To request cybersecurity services, please contact us at cybersecurity@jackaltechltd.com.',
        'does jackal tech offer cloud solutions': 'Yes, we offer cloud solutions. For more information, please visit the Services page on our website.',
        'how to request jackal tech cloud solutions': 'To request cloud solutions, please contact us at cloud@jackaltechltd.com.',
        'does jackal tech offer AI and machine learning services': 'Yes, we offer AI and machine learning services. For more information, please visit the Services page on our website.',
        'how to request jackal tech AI services': 'To request AI and machine learning services, please contact us at ai@jackaltechltd.com.',
        'does jackal tech offer IT consulting services': 'Yes, we offer IT consulting services. For more information, please visit the Services page on our website.',
        'how to request jackal tech IT consulting services': 'To request IT consulting services, please contact us at consulting@jackaltechltd.com.',
        'what are jackal tech upcoming projects': 'For information on upcoming projects, please visit the Projects page on our website or contact us directly.',
        'how to collaborate with jackal tech': 'To collaborate with us, please contact us at collaborations@jackaltechltd.com with your proposal.',
        'does jackal tech offer digital marketing services': 'Yes, we offer digital marketing services. For more information, please visit the Services page on our website.',
        'how to request jackal tech digital marketing services': 'To request digital marketing services, please contact us at marketing@jackaltechltd.com.',
        'does jackal tech offer ecommerce solutions': 'Yes, we offer ecommerce solutions. For more information, please visit the Services page on our website.',
        'how to request jackal tech ecommerce solutions': 'To request ecommerce solutions, please contact us at ecommerce@jackaltechltd.com.',
        'does jackal tech offer mobile app development services': 'Yes, we offer mobile app development services. For more information, please visit the Services page on our website.',
        'how to request jackal tech mobile app development services': 'To request mobile app development services, please contact us at mobileapps@jackaltechltd.com.',
        'does jackal tech offer web development services': 'Yes, we offer web development services. For more information, please visit the Services page on our website.',
        'how to request jackal tech web development services': 'To request web development services, please contact us at webdevelopment@jackaltechltd.com.',
        'does jackal tech offer blockchain solutions': 'Yes, we offer blockchain solutions. For more information, please visit the Services page on our website.',
        'how to request jackal tech blockchain solutions': 'To request blockchain solutions, please contact us at blockchain@jackaltechltd.com.',
        'does jackal tech offer fintech solutions': 'Yes, we offer fintech solutions. For more information, please visit the Services page on our website.',
        'how to request jackal tech fintech solutions': 'To request fintech solutions, please contact us at fintech@jackaltechltd.com.',
        'does jackal tech offer IoT solutions': 'Yes, we offer IoT solutions. For more information, please visit the Services page on our website.',
        'how to request jackal tech IoT solutions': 'To request IoT solutions, please contact us at iot@jackaltechltd.com.',
        'does jackal tech offer big data solutions': 'Yes, we offer big data solutions. For more information, please visit the Services page on our website.',
        'how to request jackal tech big data solutions': 'To request big data solutions, please contact us at bigdata@jackaltechltd.com.',
        'does jackal tech offer ERP solutions': 'Yes, we offer ERP solutions. For more information, please visit the Services page on our website.',
        'how to request jackal tech ERP solutions': 'To request ERP solutions, please contact us at erp@jackaltechltd.com.',
        'does jackal tech offer CRM solutions': 'Yes, we offer CRM solutions. For more information, please visit the Services page on our website.',
        'how to request jackal tech CRM solutions': 'To request CRM solutions, please contact us at crm@jackaltechltd.com.',
        'does jackal tech offer IT infrastructure services': 'Yes, we offer IT infrastructure services. For more information, please visit the Services page on our website.',
        'how to request jackal tech IT infrastructure services': 'To request IT infrastructure services, please contact us at infrastructure@jackaltechltd.com.',
        'how to learn about jackal tech projects': 'To learn about our projects, please visit the Projects page on our website.',
        'how to submit a proposal to jackal tech': 'To submit a proposal, please contact us at proposals@jackaltechltd.com with your details.',
        'does jackal tech offer technical support': 'Yes, we offer technical support. For more information, please visit the Support page on our website.',
        'how to request jackal tech technical support': 'To request technical support, please contact us at techsupport@jackaltechltd.com.',
        'how to download jackal tech mobile app': 'You can download our mobile app from the App Store for iOS devices or Google Play for Android devices.',
        'does jackal tech offer product customization': 'Yes, we offer product customization services. For more information, please visit the Customization Services page on our website.',
        'how to request jackal tech product customization': 'To request product customization, please contact us at customization@jackaltechltd.com.',
        'does jackal tech offer white-label solutions': 'Yes, we offer white-label solutions. For more information, please visit the White-Label Solutions page on our website.',
        'how to request jackal tech white-label solutions': 'To request white-label solutions, please contact us at whitelabel@jackaltechltd.com.',
        'does jackal tech offer API access': 'Yes, we offer API access for developers. For more information, please visit the API Access page on our website.',
        'how to request jackal tech API access': 'To request API access, please contact us at api@jackaltechltd.com.',
        'does jackal tech offer consulting services': 'Yes, we offer consulting services. For more information, please visit the Consulting Services page on our website.',
        'how to request jackal tech consulting services': 'To request consulting services, please contact us at consulting@jackaltechltd.com.',
        'does jackal tech offer support in multiple languages': 'Yes, we offer support in multiple languages. For more information, please contact us at support@jackaltechltd.com.',
        'what languages does jackal tech support': 'We support multiple languages. For more information, please visit the Language Support page on our website.',
        'how to join jackal tech mentorship program': 'To join our mentorship program, please visit the Mentorship Programs page and follow the application instructions.',
        'does jackal tech offer sponsorship opportunities': 'Yes, we offer sponsorship opportunities. For more information, please visit the Sponsorship Opportunities page on our website.',
        'how to request jackal tech sponsorship': 'To request sponsorship, please contact us at sponsorship@jackaltechltd.com.',
        'does jackal tech offer professional development programs': 'Yes, we offer professional development programs. For more information, please visit the Professional Development page on our website.',
        'how to join jackal tech professional development programs': 'To join our professional development programs, log in to your account and go to the Professional Development page.',
        'does jackal tech offer sabbatical leave': 'Yes, we offer sabbatical leave for certain positions. For more information, please visit the Sabbatical Leave page on our website.',
        'how to request jackal tech sabbatical leave': 'To request sabbatical leave, please contact us at sabbatical@jackaltechltd.com with your requirements.',
        'does jackal tech offer parental leave': 'Yes, we offer parental leave to our employees. For more information, please visit the Parental Leave page on our website.',
        'how to request jackal tech parental leave': 'To request parental leave, please contact us at parental@jackaltechltd.com with your requirements.',
        'does jackal tech offer paid time off': 'Yes, we offer paid time off to our employees. For more information, please visit the Paid Time Off page on our website.',
        'how to request jackal tech paid time off': 'To request paid time off, log in to your account and go to the Paid Time Off page.',
        'does jackal tech offer bereavement leave': 'Yes, we offer bereavement leave to our employees. For more information, please visit the Bereavement Leave page on our website.',
        'how to request jackal tech bereavement leave': 'To request bereavement leave, please contact us at bereavement@jackaltechltd.com with your requirements.',
        'does jackal tech offer diversity and inclusion programs': 'Yes, we offer diversity and inclusion programs. For more information, please visit the Diversity and Inclusion page on our website.',
        'how to join jackal tech diversity and inclusion programs': 'To join our diversity and inclusion programs, log in to your account and go to the Diversity and Inclusion page.',
        'does jackal tech offer wellness workshops': 'Yes, we offer wellness workshops to our employees. For more information, please visit the Wellness Workshops page on our website.',
        'how to participate in jackal tech wellness workshops': 'To participate in wellness workshops, log in to your account and go to the Wellness Workshops page.',
        'does jackal tech offer gym memberships': 'Yes, we offer gym memberships to our employees. For more information, please visit the Gym Memberships page on our website.',
        'how to request jackal tech gym memberships': 'To request a gym membership, please contact us at gym@jackaltechltd.com with your requirements.',
        'does jackal tech offer meal plans': 'Yes, we offer meal plans to our employees. For more information, please visit the Meal Plans page on our website.',
        'how to request jackal tech meal plans': 'To request a meal plan, please contact us at meals@jackaltechltd.com with your requirements.',
        'does jackal tech offer relocation bonuses': 'Yes, we offer relocation bonuses for certain positions. For more information, please visit the Relocation Bonuses page on our website.',
        'how to request jackal tech relocation bonuses': 'To request a relocation bonus, please contact us at relocation@jackaltechltd.com with your requirements.',
        'does jackal tech offer home office setups': 'Yes, we offer home office setups for remote workers. For more information, please visit the Home Office Setups page on our website.',
        'how to request jackal tech home office setups': 'To request a home office setup, please contact us at homeoffice@jackaltechltd.com with your requirements.',
        'does jackal tech offer pet insurance': 'Yes, we offer pet insurance to our employees. For more information, please visit the Pet Insurance page on our website.',
        'how to request jackal tech pet insurance': 'To request pet insurance, please contact us at petinsurance@jackaltechltd.com with your requirements.',
        'does jackal tech offer travel insurance': 'Yes, we offer travel insurance to our employees. For more information, please visit the Travel Insurance page on our website.',
        'how to request jackal tech travel insurance': 'To request travel insurance, please contact us at travelinsurance@jackaltechltd.com with your requirements.',
        'does jackal tech offer rental car services': 'Yes, we offer rental car services for business travel. For more information, please visit the Rental Car Services page on our website.',
        'how to request jackal tech rental car services': 'To request rental car services, please contact us at rentalcars@jackaltechltd.com with your requirements.',
        'does jackal tech offer company cars': 'Yes, we offer company cars for certain positions. For more information, please visit the Company Cars page on our website.',
        'how to request jackal tech company cars': 'To request a company car, please contact us at companycars@jackaltechltd.com with your requirements.',
        'does jackal tech offer commuter benefits': 'Yes, we offer commuter benefits to our employees. For more information, please visit the Commuter Benefits page on our website.',
        'how to request jackal tech commuter benefits': 'To request commuter benefits, please contact us at commuter@jackaltechltd.com with your requirements.',
        'does jackal tech offer childcare services': 'Yes, we offer childcare services to our employees. For more information, please visit the Childcare Services page on our website.',
        'how to request jackal tech childcare services': 'To request childcare services, please contact us at childcare@jackaltechltd.com with your requirements.',
        'does jackal tech offer educational resources': 'Yes, we offer educational resources to our employees. For more information, please visit the Educational Resources page on our website.',
        'how to access jackal tech educational resources': 'To access educational resources, log in to your account and go to the Educational Resources page.',
        'does jackal tech offer career coaching': 'Yes, we offer career coaching to our employees. For more information, please visit the Career Coaching page on our website.',
        'how to request jackal tech career coaching': 'To request career coaching, please contact us at careercoaching@jackaltechltd.com with your requirements.',
        'does jackal tech offer financial assistance': 'Yes, we offer financial assistance to our employees. For more information, please visit the Financial Assistance page on our website.',
        'how to request jackal tech financial assistance': 'To request financial assistance, please contact us at financialassistance@jackaltechltd.com with your requirements.',
        'what does jackal tech do': 'Jackal Tech Ltd focuses on innovative technology solutions across various sectors, including healthcare, education, finance, manufacturing, agriculture, retail, transportation, and energy.',
        'how to apply for a job at jackal tech': 'You can apply for a job at Jackal Tech by visiting our Careers page and submitting an online application.',
        'what is jackal tech': 'Jackal Tech Ltd is a technology company known for its innovative solutions and impactful projects.',
        'where is jackal tech located': 'Jackal Tech is located in Kigali, Rwanda.',
        'who are the founders of jackal tech': 'The founders of Jackal Tech are Ignace Kwizera, Emmanuel Ahishakiye, and Placide Shema.',
        'what is the mission of jackal tech': 'Our mission is to drive technological innovation that addresses global challenges.',
        'what is the vision of jackal tech': 'Our vision is to be a leader in technology, consistently creating impactful innovations that elevate scientific understanding, transform societies, and improve lives worldwide.',
        'what are the values of jackal tech': 'Our core values are Innovation, Collaboration, Integrity, Empowerment, and Inclusivity.',
        'how to contact jackal tech': 'You can contact us via email at info@jackaltechltd.com or call us at +250 123 456 789.',
        'what services does jackal tech offer': 'We offer services in healthcare, education, finance, manufacturing, agriculture, retail, transportation, and energy sectors.',
        'how to request a quote from jackal tech': 'To request a quote, please email us at quotes@jackaltechltd.com with your requirements.',
        'how to get a demo of jackal tech products': 'To request a demo, please email us at demo@jackaltechltd.com.',
        'how to partner with jackal tech': 'For partnership inquiries, please email us at partnerships@jackaltechltd.com.',
        'how to follow jackal tech on social media': 'You can follow us on LinkedIn, Instagram, X (formerly Twitter), and YouTube for the latest updates.',
    
        };

        const keywords = {
            'hello': ['hi', 'hey', 'greetings', 'hola', 'howdy', "what's up"],
            'help': ['support', 'assistance', 'aid', 'help me', 'need help'],
            'who are you': ['who is this', 'identify yourself', 'your name', 'who', 'introduce yourself'],
            'services': ['our services', 'offerings', 'what you do', 'what services', 'what do you offer'],
            'team': ['your team', 'who are your team members', 'team members', 'staff', 'employees'],
            'events': ['upcoming events', 'future events', 'event schedule', 'next events', 'events list'],
            'who created you': ['who made you', 'your creator', 'developer', 'creator', 'who built you'],
            'about emmanuel ahishakiye': ['emmanuel ahishakiye', 'emmanuel', 'tell me about emmanuel', 'who is emmanuel', 'emmanuel ahishakiye details'],
            'location': ['where are you located', 'office location', 'your location', 'address', 'where is your office'],
            'founded': ['when founded', 'establishment year', 'started', 'when was jackal tech founded', 'founding year'],
            'mission': ['your mission', 'mission statement', 'purpose', 'company mission', 'what is your mission'],
            'vision': ['your vision', 'vision statement', 'company vision', 'what is your vision', 'future vision'],
            'values': ['company values', 'your values', 'core values', 'what are your values', 'values'],
            'phone number': ['contact number', 'telephone number', 'your number', 'how to call you', 'phone'],
            'linkedin': ['linkedin profile', 'follow on linkedin', 'linkedin page', 'linkedin link', 'jackal tech linkedin'],
            'instagram': ['instagram profile', 'follow on instagram', 'instagram page', 'instagram link', 'jackal tech instagram'],
            'x': ['twitter', 'x profile', 'follow on x', 'x page', 'x link'],
            'youtube': ['youtube channel', 'subscribe on youtube', 'youtube link', 'youtube page', 'jackal tech youtube'],
            'email for branding': ['branding email', 'contact for branding', 'branding inquiries', 'email for branding inquiries', 'branding contact'],
            'follow us': ['social media', 'follow on social media', 'our social media', 'follow jackal tech', 'social channels'],
            'what is your email address': ['your email', 'contact email', 'email address', 'how to email', 'email'],
            'how can I contact you': ['contact methods', 'how to reach you', 'get in touch', 'how to contact', 'contact'],
            'ceo': ['who is the ceo', 'your ceo', 'company ceo', 'ceo name', 'ceo of jackal tech'],
            'cto': ['who is the cto', 'your cto', 'company cto', 'cto name', 'cto of jackal tech'],
            'general manager': ['who is the general manager', 'your general manager', 'company general manager', 'general manager name', 'general manager of jackal tech'],
            'cfo': ['who is the cfo', 'your cfo', 'company cfo', 'cfo name', 'cfo of jackal tech'],
            'where is jackal tech located': ['jackal tech location', 'company location', 'office address', 'location details', 'address of jackal tech'],
            'what is jackal tech': ['company description', 'what does jackal tech do', 'about jackal tech', 'company overview', 'company info'],
            'how to apply for a job at jackal tech': ['job application', 'apply for a job', 'career opportunities', 'join jackal tech', 'job openings'],
            'current job openings': ['job vacancies', 'open positions', 'available jobs', 'job listings', 'current vacancies'],
            'how to contact support': ['support contact', 'customer support', 'contact for support', 'how to reach support', 'support email'],
            'customer service email': ['service email', 'support email', 'customer email', 'contact customer service', 'email for support'],
            'partnership inquiries': ['partnership contact', 'become a partner', 'partnership email', 'partner with jackal tech', 'partner inquiries'],
            'media inquiries': ['media contact', 'press contact', 'media email', 'media relations', 'contact for media'],
            'how to become a partner': ['partner with us', 'join as a partner', 'become a partner', 'partnership process', 'how to partner'],
            'upcoming events': ['future events', 'events calendar', 'event schedule', 'next events', 'events list'],
            'how to register for events': ['event registration', 'sign up for events', 'register for events', 'event sign up', 'how to join events'],
            'latest news': ['company news', 'news updates', 'latest updates', 'recent news', 'jackal tech news'],
            'how to request a demo': ['request demo', 'demo request', 'demo inquiry', 'get a demo', 'product demo'],
            'pricing information': ['cost details', 'price list', 'product pricing', 'pricing details', 'service pricing'],
            'how to get a quote': ['request a quote', 'quote inquiry', 'get a quote', 'quote request', 'pricing quote'],
            'request a callback': ['call request', 'schedule a call', 'callback request', 'request phone call', 'get a call back'],
            'support hours': ['working hours', 'service hours', 'customer support hours', 'business hours', 'operating hours'],
            'technical support email': ['tech support', 'tech support contact', 'technical email', 'support email', 'technical assistance'],
            'how to reset password': ['password reset', 'forgot password', 'reset account', 'account recovery', 'recover password'],
            'privacy policy': ['data privacy', 'privacy terms', 'privacy info', 'data protection policy', 'privacy statement'],
            'terms of use': ['usage terms', 'terms and conditions', 'terms of service', 'service terms', 'legal terms'],
            'cookie policy': ['cookies info', 'cookie usage', 'cookies policy', 'cookie details', 'cookies terms'],
            'accessibility statement': ['accessibility info', 'accessibility policy', 'accessibility details', 'accessibility terms', 'accessibility statement'],
            'copyright policy': ['intellectual property', 'copyright info', 'copyright terms', 'copyright details', 'copyright statement'],
            'faq': ['frequently asked questions', 'common questions', 'faq page', 'faq section', 'questions and answers'],
            'refund policy': ['refund terms', 'refund details', 'money back policy', 'return policy', 'refund information'],
            'cancellation policy': ['cancel terms', 'cancellation terms', 'cancellation details', 'cancellation info', 'cancel policy'],
            'how to update account information': ['update account', 'change account details', 'account settings', 'modify account info', 'account update'],
            'how to delete account': ['delete my account', 'remove account', 'close account', 'account deletion', 'delete profile'],
            'how to subscribe to newsletter': ['join newsletter', 'newsletter sign up', 'newsletter subscription', 'subscribe to updates', 'get newsletter'],
            'how to unsubscribe from newsletter': ['leave newsletter', 'unsubscribe from updates', 'newsletter removal', 'remove subscription', 'unsubscribe link'],
            'do you offer remote work': ['remote job', 'telecommute', 'work from home', 'remote position', 'remote opportunities'],
            'how to contact support via phone': ['call support', 'phone support', 'support hotline', 'customer support phone', 'support telephone'],
            'how to track my order': ['order tracking', 'track order', 'order status', 'shipment status', 'order progress'],
            'do you offer training programs': ['training courses', 'employee training', 'professional development', 'training services', 'training opportunities'],
            'how to request a training program': ['training request', 'sign up for training', 'enroll in training', 'training inquiry', 'training program'],
            'how to request a proposal': ['proposal request', 'proposal inquiry', 'get a proposal', 'request a proposal', 'business proposal'],
            'how to join your team': ['job application', 'career at jackal tech', 'apply for a job', 'join jackal tech', 'work with us'],
            'what is your return policy': ['return terms', 'return details', 'return info', 'return conditions', 'return policy'],
            'how to update billing information': ['change billing', 'update billing', 'billing details', 'billing info', 'billing update'],
            'do you have a mobile app': ['mobile application', 'app download', 'app details', 'use mobile app', 'app availability'],
            'how to download your mobile app': ['get the app', 'app download link', 'app store link', 'download application', 'mobile app link'],
            'can I visit your office': ['office visit', 'come to your office', 'visit location', 'schedule office visit', 'office address'],
            'what are your office hours': ['working hours', 'office time', 'business hours', 'office schedule', 'operation hours'],
            'how to book a consultation': ['consultation request', 'schedule consultation', 'consultation booking', 'book appointment', 'consultation details'],
            'how to apply for internship': ['internship application', 'apply for internship', 'internship opportunities', 'join as intern', 'internship details'],
            'what are the internship requirements': ['internship qualifications', 'internship criteria', 'internship eligibility', 'internship requirements', 'internship prerequisites'],
            'how to report a problem': ['problem report', 'issue report', 'report an issue', 'trouble report', 'report problem'],
            'what is your social media policy': ['social media terms', 'social media rules', 'social media guidelines', 'social media usage', 'social media policy'],
            'how to provide feedback': ['give feedback', 'send feedback', 'feedback form', 'feedback submission', 'feedback details'],
            'do you offer customer support on social media': ['social media support', 'customer service on social media', 'help on social media', 'support via social media', 'social media assistance'],
            'how to reset my password': ['password reset', 'forgot password', 'recover password', 'reset account', 'account recovery'],
            'how to update my email address': ['change email', 'update email', 'email change', 'modify email', 'update email address'],
            'how to change my subscription plan': ['subscription change', 'update subscription', 'change plan', 'modify subscription', 'update plan'],
            'what payment methods do you accept': ['accepted payments', 'payment options', 'payment methods', 'how to pay', 'payment types'],
            'how to upgrade my plan': ['plan upgrade', 'upgrade subscription', 'change plan', 'subscription upgrade', 'upgrade details'],
            'do you offer discounts': ['discounts available', 'current discounts', 'special offers', 'promotions', 'discount deals'],
            'how to apply a discount code': ['use discount code', 'enter promo code', 'apply promo code', 'discount code usage', 'apply discount'],
            'do you offer gift cards': ['gift card availability', 'buy gift card', 'purchase gift card', 'gift card details', 'get gift card'],
            'how to redeem a gift card': ['use gift card', 'apply gift card', 'redeem code', 'gift card redemption', 'redeem gift card'],
            'do you offer free trials': ['trial offer', 'free trial', 'try for free', 'trial details', 'trial availability'],
            'how to sign up for a free trial': ['trial sign up', 'get a free trial', 'trial registration', 'sign up for trial', 'trial application'],
            'do you have a referral program': ['referral program details', 'refer a friend', 'referral benefits', 'referral rewards', 'referral program'],
            'how to refer a friend': ['send referral', 'refer someone', 'how to refer', 'referral details', 'referral process'],
            'what is your affiliate program': ['affiliate program details', 'affiliate benefits', 'join affiliate', 'affiliate rewards', 'affiliate program'],
            'how to join the affiliate program': ['affiliate sign up', 'become an affiliate', 'join affiliate', 'affiliate registration', 'affiliate application'],
            'do you offer bulk discounts': ['bulk order discount', 'bulk pricing', 'volume discount', 'discount for large orders', 'bulk purchase discount'],
            'how to place a bulk order': ['bulk order process', 'order in bulk', 'place large order', 'bulk purchase', 'bulk order details'],
            'do you offer customization services': ['customization options', 'customize products', 'customization details', 'custom services', 'product customization'],
            'how to request customization': ['customization request', 'custom order', 'request custom service', 'customization inquiry', 'custom order details'],
             // Careers-related keywords
    'careers': ['jobs', 'employment', 'work opportunities', 'career opportunities', 'job openings'],
    'apply for a job': ['job application', 'apply now', 'career application', 'submit application', 'job opportunities'],
    'current openings': ['available positions', 'open jobs', 'hiring now', 'job vacancies', 'job listings'],
    'internships': ['intern opportunities', 'internship program', 'apply for internship', 'student opportunities', 'intern positions'],
    'internship requirements': ['intern qualifications', 'internship criteria', 'internship eligibility', 'intern prerequisites', 'internship standards'],
    'job requirements': ['job qualifications', 'position criteria', 'job eligibility', 'job prerequisites', 'job standards'],
    'job application process': ['how to apply', 'application steps', 'application instructions', 'job application guide', 'application process'],
    'career development': ['professional growth', 'career growth', 'career advancement', 'skill development', 'career training'],
    'career benefits': ['job benefits', 'employment perks', 'career perks', 'job advantages', 'employee benefits'],

    // Services-related keywords
    'our services': ['services offered', 'what we do', 'service offerings', 'company services', 'available services'],
    'healthcare services': ['medical services', 'health services', 'health solutions', 'healthcare solutions', 'medical solutions'],
    'education services': ['educational solutions', 'learning services', 'education solutions', 'teaching services', 'academic services'],
    'finance services': ['financial solutions', 'financial services', 'banking services', 'finance solutions', 'monetary services'],
    'manufacturing services': ['production services', 'manufacturing solutions', 'industrial services', 'manufacturing support', 'factory services'],
    'agriculture services': ['farming services', 'agricultural solutions', 'farm services', 'agriculture solutions', 'crop services'],
    'retail services': ['store services', 'retail solutions', 'retail support', 'shop services', 'retail offerings'],
    'transportation services': ['logistics services', 'transport solutions', 'transport services', 'shipping services', 'transportation solutions'],
    'energy services': ['power services', 'energy solutions', 'energy support', 'electricity services', 'energy offerings'],

    // About Jackal Tech-related keywords
    'about jackal tech': ['company overview', 'company information', 'about us', 'company background', 'company details'],
    'company mission': ['mission statement', 'our mission', 'purpose', 'company goals', 'mission objectives'],
    'company vision': ['vision statement', 'our vision', 'future goals', 'company aspirations', 'vision objectives'],
    'company values': ['core values', 'company principles', 'our values', 'company ethics', 'values statement'],
    'company founders': ['founding team', 'company creators', 'who founded', 'founder details', 'company originators'],
    'company history': ['company background', 'company past', 'how we started', 'company timeline', 'history of Jackal Tech'],
    'company culture': ['work culture', 'company environment', 'our culture', 'workplace culture', 'company ethos'],

    // Social media platforms-related keywords
    'linkedin': ['linkedin profile', 'linkedin page', 'linkedin account', 'company linkedin', 'follow on linkedin'],
    'instagram': ['instagram profile', 'instagram page', 'instagram account', 'company instagram', 'follow on instagram'],
    'x': ['twitter profile', 'x page', 'x account', 'company x', 'follow on x'],
    'youtube': ['youtube channel', 'youtube profile', 'youtube page', 'company youtube', 'subscribe on youtube'],
    'social media': ['follow us', 'social profiles', 'social accounts', 'connect with us', 'social media channels'],
    'follow us': ['connect with us', 'join us', 'follow on social media', 'social media links', 'social connections'],

    // Additional company contact-related keywords
    'contact us': ['get in touch', 'reach out', 'contact information', 'contact details', 'how to contact'],
    'support email': ['customer support', 'help email', 'support contact', 'assistance email', 'support team email'],
    'phone number': ['contact number', 'telephone', 'call us', 'phone contact', 'company phone'],
    'office location': ['visit us', 'office address', 'where we are', 'office directions', 'location details'],
    'working hours': ['business hours', 'office hours', 'when we are open', 'opening hours', 'hours of operation'],

        };

const normalizedMessage = normalizeMessage(message);
let response = null;

for (const [key, value] of Object.entries(responses)) {
    if (normalizedMessage.includes(key)) {
        response = value;
        break;
    }
}

if (!response) {
    response = await fetchOnlineResponse(normalizedMessage);
}

addMessage('bot', response || 'I am not sure how to respond to that. Can you rephrase?', 'text');
saveChatMessage('bot', response || 'I am not sure how to respond to that. Can you rephrase?', 'text');
}

// Fetch response from online sources
async function fetchOnlineResponse(query) {
try {
    const googleApiKey = 'YOUR_GOOGLE_API_KEY';
    const googleCx = 'YOUR_GOOGLE_CUSTOM_SEARCH_ENGINE_ID';
    const searchQuery = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCx}&q=${encodeURIComponent(query)}`;
    const response = await fetch(searchQuery);
    const data = await response.json();
    const result = data.items && data.items.length ? data.items[0].snippet : 'I am having trouble fetching information at the moment. Please try again later.';
    return result;
} catch (error) {
    return 'I am having trouble fetching information at the moment. Please try again later.';
}
}

// Voice recording functionality
function startVoiceRecording() {
if (!('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)) {
    alert('Voice recording is not supported in your browser.');
    return;
}

const constraints = { audio: true };
navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        audioChunks = [];
        let startTime = Date.now();

        recordingInterval = setInterval(() => {
            let currentTime = Date.now();
            let elapsedTime = currentTime - startTime;
            let minutes = Math.floor(elapsedTime / 60000);
            let seconds = Math.floor((elapsedTime % 60000) / 1000);
            recordingTime.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            recordingIndicator.style.display = 'inline-block';
        }, 1000);

        mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
            clearInterval(recordingInterval);
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioElement.src = audioUrl;
            audioElement.style.display = 'block';
            sendRecordingButton.style.display = 'block';
            recordingIndicator.style.display = 'none';
        });

        recordingControls.style.display = 'flex';
        voiceButton.style.display = 'none';
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });
}

function stopVoiceRecording() {
mediaRecorder.stop();
stopRecordButton.style.display = 'none';
}

function sendVoiceRecording() {
const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
const audioUrl = URL.createObjectURL(audioBlob);
addMessage('user', audioUrl, 'audio');
saveChatMessage('user', audioUrl, 'audio');

recordingControls.style.display = 'none';
voiceButton.style.display = 'block';
audioElement.style.display = 'none';
sendRecordingButton.style.display = 'none';
recordingTime.textContent = '00:00';

showTypingIndicator();

setTimeout(() => {
    hideTypingIndicator();
    getResponse('Recording');
}, 500);
}

// Handle file upload functionality
function handleFileUpload(file) {
if (!file) return;

const reader = new FileReader();
reader.onload = function (e) {
    const fileUrl = e.target.result;
    addMessage('user', fileUrl, 'file');
    saveChatMessage('user', fileUrl, 'file');

    showTypingIndicator();
    addMessage('bot', 'Analyzing the uploaded file...', 'text');

    setTimeout(() => {
        hideTypingIndicator();
        getResponse('Upload');
    }, 2000);
};
reader.readAsDataURL(file);
}

// Handle taking a picture
function takePicture() {
if (!('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)) {
    alert('Taking picture is not supported in your browser.');
    return;
}

const constraints = { video: true };
navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        const captureButton = document.createElement('button');
        captureButton.innerHTML = '📷';
        captureButton.style.position = 'absolute';
        captureButton.style.bottom = '20px';
        captureButton.style.left = '50%';
        captureButton.style.transform = 'translateX(-50%)';
        captureButton.style.padding = '10px 20px';
        captureButton.style.backgroundColor = '#007bff';
        captureButton.style.color = '#fff';
        captureButton.style.border = 'none';
        captureButton.style.borderRadius = '5px';
        captureButton.style.cursor = 'pointer';

        captureButton.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageUrl = canvas.toDataURL('image/png');
            stream.getTracks().forEach(track => track.stop());
            video.remove();
            captureButton.remove();
            addMessage('user', imageUrl, 'image');
            saveChatMessage('user', imageUrl, 'image');

            showTypingIndicator();
            addMessage('bot', 'Analyzing the picture...', 'text');

            setTimeout(() => {
                hideTypingIndicator();
                getResponse('Picture');
            }, 2000);
        });

        chatbotWindow.appendChild(video);
        chatbotWindow.appendChild(captureButton);
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });
}

function isInteractionActive() {
return recordingControls.style.display === 'flex' || fileInput.style.display === 'block';
}

chatbotToggle.style.display = 'block';
chatbotWindow.style.display = 'none';

// Apply animations
chatbotToggle.addEventListener('mouseover', () => {
chatbotWindow.style.animation = 'fadeIn 0.5s ease-in-out';
});

chatbotWindow.addEventListener('mouseleave', () => {
chatbotWindow.style.animation = 'fadeOut 0.5s ease-in-out';
setTimeout(() => {
    if (!isInteractionActive()) {
        chatbotWindow.style.display = 'none';
    }
}, 500);
});

// Ensure smooth performance
chatbotWindow.style.willChange = 'opacity, transform';
chatbotToggle.style.willChange = 'transform';

// Debounce function to improve performance
function debounce(func, wait) {
let timeout;
return function (...args) {
    const later = () => {
        clearTimeout(timeout);
        func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
};
}

// Load chat history on page load
loadChatHistory();
});





//Part 2: Advanced Features

// External NLP API integration for contextual understanding and sentiment analysis
async function analyzeMessage(message) {
    const apiKey = 'YOUR_NLP_API_KEY';
    const apiUrl = 'https://api.nlp-service.com/analyze';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ text: message })
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { sentiment: 'neutral', context: [] };
    }
}

// Advanced message handling with context and sentiment
async function getAdvancedResponse(message) {
    const analysis = await analyzeMessage(message);
    const context = analysis.context;
    const sentiment = analysis.sentiment;

    // Example responses based on context and sentiment
    const contextualResponses = {
        'greeting': {
            'positive': 'Hello! It’s great to hear from you! How can I assist you today?',
            'neutral': 'Hello. How can I help you today?',
            'negative': 'Hello. It seems like you’re having a tough time. How can I assist?'
        },
        'support': {
            'positive': 'We’re here to help! What do you need assistance with?',
            'neutral': 'How can we support you today?',
            'negative': 'We’re sorry to hear you’re having trouble. Let us know how we can help.'
        }
        // Add more contextual responses...
    };

    for (const [key, response] of Object.entries(contextualResponses)) {
        if (context.includes(key)) {
            return response[sentiment];
        }
    }

    // Default response if no context matches
    return 'I’m here to help. Can you provide more details?';
}

// Enhanced response function
async function getResponse(message) {
    const predefinedResponses = {
        'hello': 'Hi there! How can I help you?',
        // ... (other predefined responses)
    };

    const normalizedMessage = normalizeMessage(message);
    let response = null;

    for (const [key, value] of Object.entries(predefinedResponses)) {
        if (normalizedMessage.includes(key)) {
            response = value;
            break;
        }
    }

    if (!response) {
        response = await getAdvancedResponse(message);
    }

    addMessage('bot', response || 'I am not sure how to respond to that. Can you rephrase?');
    saveChatMessage('bot', response || 'I am not sure how to respond to that. Can you rephrase?');
}

//if it sees atleast two kewords

const keywords = {
    'hello': ['hi', 'hey', 'greetings', 'hola', 'howdy', "what's up"],
    'careers': ['jobs', 'employment', 'work opportunities', 'career opportunities', 'job openings'],
    'apply for a job': ['job application', 'apply now', 'career application', 'submit application', 'job opportunities'],
    'current openings': ['available positions', 'open jobs', 'hiring now', 'job vacancies', 'job listings'],
    'internships': ['intern opportunities', 'internship program', 'apply for internship', 'student opportunities', 'intern positions'],
    'internship requirements': ['intern qualifications', 'internship criteria', 'internship eligibility', 'intern prerequisites', 'internship standards'],
    'job requirements': ['job qualifications', 'position criteria', 'job eligibility', 'job prerequisites', 'job standards'],
    'job application process': ['how to apply', 'application steps', 'application instructions'],
    'who created you': ['who made you', 'who developed you', 'who designed you'],
    'who are you': ['who is this', 'who am i talking to', 'who are you'],
    'services': ['our services', 'what services', 'services offered', 'service list'],
    'partner': ['partnership', 'partners', 'collaborate', 'partner with'],
    'contact': ['reach out', 'contact info', 'get in touch', 'call', 'email'],
    'social media': ['linkedin', 'instagram', 'twitter', 'youtube', 'social media links'],
    // add more keywords as needed
};

async function getResponse(message) {
    const messageWords = message.toLowerCase().split(' ');

    for (const [key, synonyms] of Object.entries(keywords)) {
        const matchCount = synonyms.filter(synonym => messageWords.includes(synonym)).length;
        if (matchCount >= 2) {
            return responses[key];
        }
    }

    return "I'm sorry, I didn't understand that. Can you please provide more details or ask another question?";
}




//Part 3: Multi-language Support and Learning from Interactions




// External Translation API integration for multi-language support
async function translateMessage(message, targetLanguage) {
    const apiKey = 'YOUR_TRANSLATION_API_KEY';
    const apiUrl = 'https://api.translation-service.com/translate';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ text: message, target: targetLanguage })
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { translatedText: message };
    }
}

// Enhanced response function with translation
async function getResponse(message) {
    const userLanguage = 'en'; // Example: detect user language dynamically
    const predefinedResponses = {
        'hello': 'Hi there! How can I help you?',
        // ... (other predefined responses)
    };

    const normalizedMessage = normalizeMessage(message);
    let response = null;

    for (const [key, value] of Object.entries(predefinedResponses)) {
        if (normalizedMessage.includes(key)) {
            response = value;
            break;
        }
    }

    if (!response) {
        response = await getAdvancedResponse(message);
    }

    const translatedResponse = await translateMessage(response, userLanguage);
    addMessage('bot', translatedResponse.translatedText || 'I am not sure how to respond to that. Can you rephrase?');
    saveChatMessage('bot', translatedResponse.translatedText || 'I am not sure how to respond to that. Can you rephrase?');
}



//Part 4: Machine Learning Integration for Personalization and Continuous Improvement



// Mock implementation of a machine learning model
let userPreferences = {};

function updateUserPreferences(user, message) {
    // Example: track user preferences based on interactions
    if (!userPreferences[user]) {
        userPreferences[user] = {};
    }

    const keywords = message.split(' ');
    keywords.forEach(word => {
        if (userPreferences[user][word]) {
            userPreferences[user][word]++;
        } else {
            userPreferences[user][word] = 1;
        }
    });
}

function personalizeResponse(user, response) {
    // Example: modify response based on user preferences
    if (userPreferences[user]) {
        const preferences = userPreferences[user];
        if (preferences['services']) {
            response += ' Would you like to know more about our services?';
        }
        // Add more personalization logic...
    }
    return response;
}

// Enhanced response function with personalization
async function getResponse(message) {
    const user = 'user1'; // Example: identify user dynamically
    const predefinedResponses = {
        'hello': 'Hi there! How can I help you?',
        // ... (other predefined responses)
    };

    const normalizedMessage = normalizeMessage(message);
    let response = null;

    for (const [key, value] of Object.entries(predefinedResponses)) {
        if (normalizedMessage.includes(key)) {
            response = value;
            break;
        }
    }

    if (!response) {
        response = await getAdvancedResponse(message);
    }

    response = personalizeResponse(user, response);
    const translatedResponse = await translateMessage(response, 'en');
    addMessage('bot', translatedResponse.translatedText || 'I am not sure how to respond to that. Can you rephrase?');
    saveChatMessage('bot', translatedResponse.translatedText || 'I am not sure how to respond to that. Can you rephrase?');
    updateUserPreferences(user, message);
}





//Part 5: Integration with External Systems and Advanced Analytics

// Example function to integrate with external API (CRM/ERP systems)
async function fetchUserData(userId) {
    const apiUrl = `https://api.crm-system.com/users/${userId}`;
    const response = await fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer YOUR_API_TOKEN`
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
}

// Example function to send data to an external system
async function updateUserData(userId, data) {
    const apiUrl = `https://api.crm-system.com/users/${userId}`;
    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_TOKEN`
        },
        body: JSON.stringify(data)
    });

    return response.ok;
}

// Example function to log analytics data
function logAnalytics(event, data) {
    const apiUrl = 'https://api.analytics-service.com/log';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_TOKEN`
        },
        body: JSON.stringify({ event, data })
    });
}

// Enhanced response function with external system integration
async function getResponse(message) {
    const user = 'user1'; // Example: identify user dynamically
    const predefinedResponses = {
        'hello': 'Hi there! How can I help you?',
        // ... (other predefined responses)
    };

    const normalizedMessage = normalizeMessage(message);
    let response = null;

    for (const [key, value] of Object.entries(predefinedResponses)) {
        if (normalizedMessage.includes(key)) {
            response = value;
            break;
        }
    }

    if (!response) {
        response = await getAdvancedResponse(message);
    }

    response = personalizeResponse(user, response);
    const translatedResponse = await translateMessage(response, 'en');
    addMessage('bot', translatedResponse.translatedText || 'I am not sure how to respond to that. Can you rephrase?');
    saveChatMessage('bot', translatedResponse.translatedText || 'I am not sure how to respond to that. Can you rephrase?');
    updateUserPreferences(user, message);

    // Fetch and update user data from an external CRM system
    const userData = await fetchUserData(user);
    if (userData) {
        // Update user data logic...
        await updateUserData(user, { lastInteraction: new Date().toISOString() });
    }

    // Log interaction analytics
    logAnalytics('message', { user, message, response });
}



//Part 6: Final Touches and Deployment

// Ensuring the chatbot is ready for deployment
document.addEventListener('DOMContentLoaded', function () {
    // Initialization and loading chat history
    loadChatHistory();

    // Event listeners and other setup...
    // ...

    // Enhanced sendMessage function with advanced features
    function sendMessage() {
        const message = sanitizeInput(chatbotInput.value.trim());
        if (message === '') return;

        addMessage('user', message);
        saveChatMessage('user', message);
        chatbotInput.value = '';

        showTypingIndicator();

        setTimeout(async () => {
            hideTypingIndicator();
            await getResponse(message);
        }, 500);
    }

    // More code...
    // ...
});







// Function to clear chat history
function clearChatHistory() {
    localStorage.removeItem('chatHistory');
    chatbotMessages.innerHTML = '';
    addMessage('bot', 'Chat history has been cleared.');
}

// Enhanced response function with clear chat feature
async function getResponse(message) {
    const predefinedResponses = {
        'hello': 'Hi there! How can I help you?',
        // ... (other predefined responses)
        'clear': 'clear', // Add command for clearing chat
        'delete': 'clear' // Alias for clearing chat
    };

    const normalizedMessage = normalizeMessage(message);
    let response = null;

    for (const [key, value] of Object.entries(predefinedResponses)) {
        if (normalizedMessage.includes(key)) {
            response = value;
            break;
        }
    }

    if (response === 'clear') {
        clearChatHistory();
        return;
    }

    if (!response) {
        response = await getAdvancedResponse(message);
    }

    response = personalizeResponse('user1', response); // Example: static user for personalization
    const translatedResponse = await translateMessage(response, 'en');
    addMessage('bot', translatedResponse.translatedText || 'I am not sure how to respond to that. Can you rephrase?');
    saveChatMessage('bot', translatedResponse.translatedText || 'I am not sure how to respond to that. Can you rephrase?');
    updateUserPreferences('user1', message); // Example: static user for updating preferences

    // Fetch and update user data from an external CRM system
    const userData = await fetchUserData('user1');
    if (userData) {
        await updateUserData('user1', { lastInteraction: new Date().toISOString() });
    }

    // Log interaction analytics
    logAnalytics('message', { user: 'user1', message, response });
}





























//for routing, fetching, easy loading 

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const loadingDiv = createLoadingIndicator();
    document.body.appendChild(loadingDiv);
    const navLinks = document.querySelectorAll('.nav-link');
    const pageCache = JSON.parse(localStorage.getItem('pageCache')) || {};
    const apiKey = 'YOUR_IPINFO_API_KEY'; // Replace with your actual IPinfo API key

    // Setup routing
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('href');
            loadPage(page);
            history.pushState({page: page}, '', page);
        });
    });

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            loadPage(event.state.page);
        } else {
            loadPage('/');
        }
    });

    // Create loading indicator
    function createLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading';
        loadingDiv.style.display = 'none';
        loadingDiv.style.position = 'fixed';
        loadingDiv.style.top = '0';
        loadingDiv.style.left = '0';
        loadingDiv.style.width = '100%';
        loadingDiv.style.height = '100%';
        loadingDiv.style.background = 'rgba(255, 255, 255, 0.8)';
        loadingDiv.style.zIndex = '1000';
        loadingDiv.style.display = 'flex';
        loadingDiv.style.justifyContent = 'center';
        loadingDiv.style.alignItems = 'center';
        loadingDiv.innerHTML = '<div class="spinner" style="border: 0.4rem solid #f3f3f3; border-top: 0.4rem solid #3498db; border-radius: 50%; width: 2rem; height: 2rem; animation: spin 1s linear infinite;"></div>';
        const style = document.createElement('style');
        style.innerHTML = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
        return loadingDiv;
    }

    // Show and hide loading indicator
    const showLoading = () => {
        loadingDiv.style.display = 'flex';
    };

    const hideLoading = () => {
        loadingDiv.style.display = 'none';
    };

    // Fetch and display page content
    const loadPage = (page) => {
        if (pageCache[page]) {
            displayContent(pageCache[page]);
        } else {
            showLoading();
            fetch(page + '.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    pageCache[page] = data;
                    localStorage.setItem('pageCache', JSON.stringify(pageCache));
                    displayContent(data);
                })
                .catch(error => {
                    console.error('Error loading page:', error);
                    contentDiv.innerHTML = '<p>Page not found.</p>';
                })
                .finally(hideLoading);
        }
    };

    // Display content with fade-in animation
    const displayContent = (content) => {
        contentDiv.classList.remove('fade-in');
        void contentDiv.offsetWidth;  // Trigger reflow to restart animation
        contentDiv.innerHTML = content;
        contentDiv.classList.add('fade-in');
        updateTitle(window.location.pathname);
    };

    // Update page title based on URL
    const updateTitle = (page) => {
        let title;
        switch (page) {
            case '/about':
                title = 'About Us';
                break;
            case '/contact':
                title = 'Contact Us';
                break;
            default:
                title = 'Home';
        }
        document.title = title;
    };

    // Fetch user's IP address
    const fetchIPAddress = () => {
        fetch(`https://ipinfo.io/json?token=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log('User IP Information:', data);
                alert(`Your IP address is: ${data.ip}`);
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });
    };

    // Initial page load
    const initialPage = window.location.pathname === '/' ? '/' : window.location.pathname;
    loadPage(initialPage);

    // Fetch IP address on load
    fetchIPAddress();

    // Accessibility enhancements
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = document.querySelectorAll(focusableElements)[0]; 
    const focusableContent = document.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
        if (!isTabPressed) return;

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
            }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        }
    });
});







//Emoji picking

function toggleEmojiPicker() {
    const emojiPicker = document.getElementById('emojiPicker');
    if (emojiPicker.style.display === 'none' || emojiPicker.style.display === '') {
        emojiPicker.style.display = 'flex';
    } else {
        emojiPicker.style.display = 'none';
    }
}

document.querySelectorAll('.emoji-picker span').forEach(emoji => {
    emoji.addEventListener('click', () => {
        const input = document.getElementById('chatbotInput');
        input.value += emoji.textContent;
        document.getElementById('emojiPicker').style.display = 'none';
    });
});

// Example recording logic (simplified for demonstration)
document.querySelector('.voice-btn').addEventListener('click', () => {
    document.querySelector('.recording-controls').style.display = 'flex';
    startRecording();
});

document.querySelector('.stop-record-btn').addEventListener('click', () => {
    stopRecording();
    document.querySelector('.recording-controls').style.display = 'none';
});

function startRecording() {
    const recordingIndicator = document.getElementById('recording-indicator');
    const recordingTime = document.getElementById('recording-time');
    let seconds = 0;
    recordingIndicator.style.display = 'block';
    const interval = setInterval(() => {
        seconds += 1;
        recordingTime.textContent = `00:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);

    // Placeholder function to simulate recording logic
    function simulateRecordingStop() {
        clearInterval(interval);
        recordingIndicator.style.display = 'none';
        document.querySelector('audio').style.display = 'block'; // Show audio control for demo
        document.querySelector('.send-recording-btn').style.display = 'block'; // Show send button
    }

    setTimeout(simulateRecordingStop, 5000); // Stop recording after 5 seconds for demo
}

function stopRecording() {
    // Placeholder function to stop recording logic
}












//More advanced code for security





//manage routing, caching, service workers, dynamic content loading, accessibility, performance monitoring, security headers, notifications, and a live chat widget.

// Utility Functions
const Utils = {
    fetchData: async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error fetching ${url}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    fetchText: async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error fetching ${url}`);
            return await response.text();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    sanitizeHTML: (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    debounce: (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    },

    throttle: (func, limit) => {
        let lastFunc;
        let lastRan;
        return (...args) => {
            if (!lastRan) {
                func(...args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if ((Date.now() - lastRan) >= limit) {
                        func(...args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    },

    fetchIPAddress: async (apiKey) => {
        try {
            const data = await Utils.fetchData(`https://ipinfo.io/json?token=${apiKey}`);
            console.log('User IP Information:', data);
            alert(`Your IP address is: ${data.ip}`);
        } catch (error) {
            console.error('Error fetching IP address:', error);
        }
    }
};

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

// App Class
class App {
    constructor() {
        this.contentDiv = document.getElementById('content');
        this.loadingDiv = this.createLoadingIndicator();
        document.body.appendChild(this.loadingDiv);
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pageCache = JSON.parse(localStorage.getItem('pageCache')) || {};
        this.apiKey = 'YOUR_IPINFO_API_KEY'; // Replace with your actual IPinfo API key
        this.pages = [
            '/',
            '/about',
            '/contact',
            '/search',
            '/policies',
            '/services',
            '/careers'
        ];
    }

    init() {
        this.setupRouting();
        this.initialPageLoad();
        Utils.fetchIPAddress(this.apiKey);
        this.setupServiceWorker();
        this.setupAccessibility();
        this.setupAnalytics();
        this.monitorPerformance();
        this.setSecurityHeaders();
        this.setupLiveChat();
    }

    setupRouting() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const page = link.getAttribute('href');
                this.loadPage(page);
                history.pushState({page: page}, '', page);
                this.trackPageView();
            });
        });

        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.loadPage(event.state.page);
            } else {
                this.loadPage('/');
            }
            this.trackPageView();
        });
    }

    showLoading() {
        this.loadingDiv.style.display = 'flex';
    }

    hideLoading() {
        this.loadingDiv.style.display = 'none';
    }

    async loadPage(page) {
        if (this.pageCache[page]) {
            this.displayContent(this.pageCache[page]);
        } else {
            this.showLoading();
            try {
                const data = await Utils.fetchText(`${page}.html`);
                this.pageCache[page] = data;
                localStorage.setItem('pageCache', JSON.stringify(this.pageCache));
                this.displayContent(data);
            } catch (error) {
                console.error('Error loading page:', error);
                this.contentDiv.innerHTML = '<p>Page not found.</p>';
            } finally {
                this.hideLoading();
            }
        }
    }

    displayContent(content) {
        this.contentDiv.classList.remove('fade-in');
        void this.contentDiv.offsetWidth;  // Trigger reflow to restart animation
        this.contentDiv.innerHTML = Utils.sanitizeHTML(content);
        this.contentDiv.classList.add('fade-in');
        this.updateTitle(window.location.pathname);
    }

    updateTitle(page) {
        let title;
        switch (page) {
            case '/about':
                title = 'About Us';
                break;
            case '/contact':
                title = 'Contact Us';
                break;
            case '/search':
                title = 'Search';
                break;
            case '/policies':
                title = 'Policies';
                break;
            case '/services':
                title = 'Services';
                break;
            case '/careers':
                title = 'Careers';
                break;
            default:
                title = 'Home';
        }
        document.title = title;
    }

    initialPageLoad() {
        const initialPage = window.location.pathname === '/' ? '/' : window.location.pathname;
        this.loadPage(initialPage);
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                }).catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    setupAccessibility() {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = document.querySelectorAll(focusableElements)[0]; 
        const focusableContent = document.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            if (!isTabPressed) return;

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        });
    }

    setupAnalytics() {
        document.addEventListener('click', (event) => {
            if (event.target.matches('.trackable')) {
                this.trackEvent('Navigation', 'click', event.target.textContent);
            }
        });

        window.addEventListener('popstate', () => {
            this.trackPageView();
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.trackPageView();
            });
        });
    }

    trackPageView() {
        // Placeholder for page view tracking logic
        console.log('Page view tracked:', window.location.pathname);
    }

    trackEvent(category, action, label) {
        // Placeholder for event tracking logic
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
    }

    monitorPerformance() {
        const performanceEntries = performance.getEntriesByType('navigation');
        performanceEntries.forEach(entry => {
            console.log('Navigation Performance:', entry);
        });

        window.addEventListener('load', () => this.logPerformance());
        window.addEventListener('popstate', () => this.logPerformance());
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.logPerformance());
        });
    }

    logPerformance() {
        const entries = performance.getEntriesByType('navigation');
        entries.forEach(entry => {
            console.log('Performance entry:', entry);
        });
    }

    setSecurityHeaders() {
        const meta = document.createElement('meta');
        meta.httpEquiv = "Content-Security-Policy";
        meta.content = "default-src 'self'; script-src 'self' https://apis.google.com";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    setupLiveChat() {
        const chatWidget = new ChatWidget();
    }
}

// Service Worker for caching and offline support
// /service-worker.js
const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
    '/',
    '/styles.css',
    '/script.js',
    '/about.html',
    '/contact.html',
    '/search.html',
    '/policies.html',
    '/services.html',
    '/careers.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Notifications
if ("Notification" in window && navigator.serviceWorker) {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification("Welcome to Jackal Tech", {
                    body: "Thank you for visiting our site!",
                    icon: "/icon.png"
                });
            });
        }
    });
}




























//for updates



let showAlertsEnabled = true;
let askInterval = 30000; // Initial interval for asking if the user wants to continue seeing updates
let alertTimeouts = []; // Store timeout IDs to clear them if needed

// Utility function to create an alert box
function createAlert(id, message, arrow = false, link = null, position = 'bottom-center', backgroundColor = '#444', textColor = '#fff') {
    const alertBox = document.createElement('div');
    alertBox.id = id;
    alertBox.className = 'custom-alert';
    alertBox.style.backgroundColor = backgroundColor;
    alertBox.style.color = textColor;
    alertBox.style.position = 'fixed';
    alertBox.innerHTML = `
        <div class="alert-content">
            <p>${message}</p>
            ${link ? `<a href="${link}" target="_blank" class="alert-link">Learn more</a>` : ''}
            ${arrow ? '<div class="arrow"></div>' : ''}
        </div>
        <button class="close-btn">Close</button>
    `;
    document.body.appendChild(alertBox);

    // Position and animate the alert
    setAlertPosition(alertBox, position);
    animateAlert(alertBox);

    setTimeout(() => {
        alertBox.classList.add('show');
    }, 100);
    setTimeout(() => {
        closeAlert(id);
    }, 20000); // Auto close after 20 seconds
}

// Utility function to set alert position
function setAlertPosition(alertBox, position) {
    switch(position) {
        case 'bottom-left':
            alertBox.style.bottom = '10px';
            alertBox.style.left = '10px';
            break;
        case 'bottom-right':
            alertBox.style.bottom = '10px';
            alertBox.style.right = '10px';
            break;
        case 'bottom-center':
        default:
            alertBox.style.bottom = '10px';
            alertBox.style.left = '50%';
            alertBox.style.transform = 'translateX(-50%)';
            break;
    }
}

// Utility function to animate alerts
function animateAlert(alertBox) {
    alertBox.style.transition = 'transform 15s ease-in-out, background-color 15s ease-in-out';
    alertBox.style.transform = 'translateX(100vw)';
    alertBox.style.backgroundColor = getRandomColor();
    setTimeout(() => {
        alertBox.style.transform = 'translateX(0)';
        alertBox.style.backgroundColor = getRandomColor();
    }, 1000);
}

// Utility function to get a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Utility function to close an alert box
function closeAlert(id) {
    const alertBox = document.getElementById(id);
    if (alertBox) {
        alertBox.classList.remove('show');
        setTimeout(() => {
            if (alertBox.parentNode) {
                alertBox.parentNode.removeChild(alertBox);
            }
        }, 1000);
    }
}

//Event delegation for close buttons and continue alert buttons
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('close-btn')) {
        const alertBox = event.target.closest('.custom-alert');
        if (alertBox) {
            closeAlert(alertBox.id);
        }
    } else if (event.target.classList.contains('yes-btn')) {
        continueAlerts(true);
    } else if (event.target.classList.contains('no-btn')) {
        continueAlerts(false);
    }
});

// Create multiple alerts with different messages and positions
function showAlerts() {
    if (showAlertsEnabled) {
        alertTimeouts.push(setTimeout(() => createAlert('alert1', 'Remember to use our chatbot for assistance!', true, 'https://www.jackaltechltd.com/services.html', 'bottom-left', '#333', '#fff'), 0));
        alertTimeouts.push(setTimeout(() => createAlert('alert2', 'Check out our latest blog post on AI advancements!', false, 'https://www.jackaltechltd.com/about.html', 'bottom-right', '#444', '#fff'), 20000));
        alertTimeouts.push(setTimeout(() => createAlert('alert3', 'Sign up for our newsletter to stay updated!', false, 'https://www.jackaltechltd.com/contact.html', 'bottom-center', '#555', '#fff'), 40000));
        alertTimeouts.push(setTimeout(() => createAlert('alert4', 'Exclusive offer: 20% off on all services!', false, 'https://www.jackaltechltd.com/careers.html', 'bottom-left', '#666', '#fff'), 60000));
        alertTimeouts.push(setTimeout(() => createAlert('alert5', 'Join our upcoming webinar on tech trends!', false, 'https://www.jackaltechltd.com/index.html/#events', 'bottom-right', '#777', '#fff'), 80000));
        alertTimeouts.push(setTimeout(() => createAlert('alert6', 'Follow us on social media for more updates!', false, 'https://www.jackaltechltd.com/contact.html', 'bottom-center', '#888', '#fff'), 100000));
        alertTimeouts.push(setTimeout(() => createAlert('alert7', 'New feature: Real-time data analytics available now!', false, 'https://www.jackaltechltd.com/search', 'bottom-left', '#999', '#000'), 120000));
        alertTimeouts.push(setTimeout(() => createAlert('alert8', 'Read our latest case study on successful projects!', false, 'https://www.jackaltechltd.com/services.html', 'bottom-right', '#aaa', '#000'), 140000));
        alertTimeouts.push(setTimeout(() => createAlert('alert9', 'Get in touch with our support team for help!', false, 'https://www.jackaltechltd.com/contact.html', 'bottom-center', '#bbb', '#000'), 160000));
        alertTimeouts.push(setTimeout(() => createAlert('alert10', 'Explore our portfolio of innovative solutions!', false, 'https://www.jackaltechltd.com/about.html', 'bottom-left', '#ccc', '#000'), 180000));
        alertTimeouts.push(setTimeout(() => askToContinue(), askInterval)); // Ask the user after all alerts
    }
}

// Ask the user if they want to continue seeing alerts
function askToContinue() {
    const continueAlert = document.createElement('div');
    continueAlert.id = 'continueAlert';
    continueAlert.className = 'custom-alert';
    continueAlert.style.backgroundColor = '#444';
    continueAlert.style.color = '#fff';
    continueAlert.style.position = 'fixed';
    continueAlert.style.bottom = '10px';
    continueAlert.style.left = '50%';
    continueAlert.style.transform = 'translateX(-50%)';
    continueAlert.innerHTML = `
        <div class="alert-content">
            <p>Do you want to continue seeing updates?</p>
        </div>
        <div class="alert-buttons">
            <button class="yes-btn">Yes</button>
            <button class="no-btn">No</button>
        </div>
    `;
    document.body.appendChild(continueAlert);

    setTimeout(() => {
        continueAlert.classList.add('show');
    }, 900);
}

// Handle user response for continuing alerts
function continueAlerts(continueShowing) {
    const continueAlert = document.getElementById('continueAlert');
    if (continueAlert) {
        continueAlert.classList.remove('show');
        setTimeout(() => {
            if (continueAlert.parentNode) {
                continueAlert.parentNode.removeChild(continueAlert);
            }
        }, 700);
    }

    if (continueShowing) {
        showAlertsEnabled = true;
        askInterval *= 1.5; // Increase the interval each time the user clicks "Yes"
        showAlerts();
        createAlert('continueYes', 'You will continue to receive updates.', false, null, 'bottom-center', '#444', '#fff');
    } else {
        showAlertsEnabled = false;
        clearAllTimeouts(); // Clear all pending alert timeouts
        createAlert('continueNo', 'You have opted out of updates.', false, null, 'bottom-center', '#444', '#fff');
    }
}

// Utility function to clear all pending timeouts
function clearAllTimeouts() {
    alertTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    alertTimeouts = [];
}

// Initialize the alerts
showAlerts();

// CSS styles for alert boxes
const styles = `
    .custom-alert {
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 2s, transform 2s, background-color 15s;
        z-index: 1000;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background: linear-gradient(135deg, #444, #666);
    }
    .custom-alert.show {
        opacity: 1;
        transform: scale(1.05);
    }
    .custom-alert p {
        margin: 0;
        font-size: 1.1em;
    }
    .custom-alert .arrow {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid currentColor;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
    }
    .custom-alert button {
        background: none;
        border: none;
        color: #03dac6;
        margin-top: 10px;
        cursor: pointer;
        font-size: 0.9em;
    }
    .custom-alert button:hover {
        text-decoration: underline;
    }
    .custom-alert .alert-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .custom-alert .alert-buttons {
        display: flex;
        gap: 10px;
    }
    .custom-alert .close-btn {
        background: none;
        border: none;
        color: #03dac6;
        margin-top: 10px;
        cursor: pointer;
        font-size: 0.9em;
    }
    .custom-alert .close-btn:hover {
        text-decoration: underline;
    }
    .custom-alert .yes-btn,
    .custom-alert .no-btn {
        background: #03dac6;
        color: #121212;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
    }
    .custom-alert .yes-btn:hover,
    .custom-alert .no-btn:hover {
        background: #029b8a;
    }
    .custom-alert a.alert-link {
        color: #03dac6;
        text-decoration: underline;
        margin-top: 5px;
    }
    .custom-alert a.alert-link:hover {
        color: #e0e0e0;
    }
    /* Different styles for each alert */
    #alert1 { background-color: #333; }
    #alert2 { background-color: #444; }
    #alert3 { background-color: #555; }
    #alert4 { background-color: #666; }
    #alert5 { background-color: #777; }
    #alert6 { background-color: #888; }
    #alert7 { background-color: #999; color: #000; }
    #alert8 { background-color: #aaa; color: #000; }
    #alert9 { background-color: #bbb; color: #000; }
    #alert10 { background-color: #ccc; color: #000; }
    #continueAlert { background-color: #444; }
`;

// Append CSS styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);










//For header scroll up and down

document.addEventListener("DOMContentLoaded", function () {
    var lastScrollTop = 0;
    var header = document.querySelector(".header");
    var subnav = document.querySelector(".subnav");

    window.addEventListener("scroll", function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll down
            header.style.top = "-150px"; // Adjust based on the height of your header
            subnav.style.top = "-100px"; // Adjust based on the height of your header
        } else {
            // Scroll up
            header.style.top = "0";
            subnav.style.top = "50px"; // Adjust based on the height of your header
        }

        lastScrollTop = scrollTop;
    });
});
