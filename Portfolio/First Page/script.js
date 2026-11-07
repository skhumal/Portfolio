
// Select the menu icon and navigation list
const menu = document.querySelector('#menu-icon');
const navlist = document.querySelector('.navlist');

// Open and close the mobile navigation
menu.addEventListener('click', () => {
  menu.classList.toggle('bx-x');
  navlist.classList.toggle('active');

  const isOpen = navlist.classList.contains('active');
  menu.setAttribute('aria-expanded', isOpen);
});

// Close the mobile navigation after selecting a link
const navLinks = document.querySelectorAll('.navlist a');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
  });
});