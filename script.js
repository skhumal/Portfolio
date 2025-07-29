// Mobile menu toggle functionality
const menuIcon = document.getElementById('menu-icon');
const navList = document.querySelector('.navlist');

if (menuIcon && navList) {
    menuIcon.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.navlist a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});