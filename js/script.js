// Additional JavaScript functionalities
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
    });
  
    // Scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.classList.add('scroll-to-top');
    scrollToTopButton.textContent = '↑';
    document.body.appendChild(scrollToTopButton);
  
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollToTopButton.classList.add('show');
      } else {
        scrollToTopButton.classList.remove('show');
      }
    });
  
    scrollToTopButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  