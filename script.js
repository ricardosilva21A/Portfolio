// Hero title shrink effect on scroll
const heroTitleBg = document.querySelector('.hero-title-bg');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSectionTop = heroSection.offsetTop;
  const heroSectionHeight = heroSection.offsetHeight;
  
  // Calculate scroll progress (0 to 1) - only while in hero section
  const scrollProgress = Math.max(0, Math.min((scrolled - heroSectionTop) / heroSectionHeight, 1));
  
  // Scale from 15vw to 2.5vw (approximately 3.5rem normal size)
  const minSize = 2.5;
  const maxSize = 15;
  const newSize = maxSize - (scrollProgress * (maxSize - minSize));
  
  heroTitleBg.style.fontSize = newSize + 'vw';
});

// Hide navbar on scroll down, show on scroll up
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 80) {
    if (scrollTop > lastScrollTop) {
      // Scrolling DOWN
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling UP
      navbar.style.transform = 'translateY(0)';
    }
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});
