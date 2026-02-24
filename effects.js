// ===== ADVANCED EFFECTS =====

// Loading Bar
window.addEventListener('load', () => {
  const loadingBar = document.createElement('div');
  loadingBar.className = 'loading-bar';
  document.body.appendChild(loadingBar);
  
  setTimeout(() => {
    loadingBar.remove();
  }, 2000);
});

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-card').forEach(el => {
  observer.observe(el);
});

// Typewriter Effect for Hero Subtitle
function typewriterEffect(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';
  
  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };
  
  type();
}

// Apply typewriter to hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
  const originalText = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  typewriterEffect(heroSubtitle, originalText);
}

// Counter Animation for Skills
function animateCounter(element, target, duration = 1500) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '%';
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current) + '%';
    }
  }, 16);
}

// Trigger counter animation on scroll
const skillLevels = document.querySelectorAll('.skill-level');
let counterAnimated = false;

window.addEventListener('scroll', () => {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection || counterAnimated) return;
  
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    counterAnimated = true;
    
    document.querySelectorAll('.skill-name').forEach(skill => {
      const skillBar = skill.nextElementSibling;
      const width = skillBar.querySelector('.skill-level').style.width;
      const percentage = parseInt(width);
      
      const skillNameContent = skill.textContent;
      // Create a counter element if it doesn't exist
      let counterEl = skill.querySelector('.counter-value');
      if (!counterEl) {
        counterEl = document.createElement('span');
        counterEl.className = 'counter-value';
        counterEl.style.marginLeft = '10px';
        skill.appendChild(counterEl);
      }
      
      animateCounter(counterEl, percentage);
    });
  }
});

// Mouse Follow Glow Effect
const mouseGlow = document.createElement('div');
mouseGlow.className = 'mouse-glow';
document.body.appendChild(mouseGlow);

document.addEventListener('mousemove', (e) => {
  mouseGlow.style.left = (e.clientX - 20) + 'px';
  mouseGlow.style.top = (e.clientY - 20) + 'px';
  mouseGlow.style.width = '40px';
  mouseGlow.style.height = '40px';
});

// Copy to Clipboard Function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showCopyToast('Copied to clipboard!');
  });
}

function showCopyToast(message) {
  const toast = document.createElement('div');
  toast.className = 'copy-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Add copy functionality to contact items
document.querySelectorAll('.contact-item a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('mailto:')) {
      e.preventDefault();
      const email = href.replace('mailto:', '');
      copyToClipboard(email);
    }
  });
});

// Parallax Effect on Scroll
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const heroTitleBg = document.querySelector('.hero-title-bg');
  
  if (heroTitleBg) {
    heroTitleBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Active Section Indicator
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 200 && rect.bottom >= 200) {
      document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
      section.classList.add('active');
    }
  });
});

// Educational Items Expand/Collapse
document.querySelectorAll('.education-item.expandable').forEach(item => {
  const header = item.querySelector('.education-header');
  if (header) {
    header.style.cursor = 'pointer';
    header.addEventListener('click', function() {
      item.classList.toggle('expanded');
      this.style.borderBottom = item.classList.contains('expanded') 
        ? '2px solid #0066cc' 
        : 'none';
    });
  }
});

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add stagger effect to skill items
document.querySelectorAll('.skill-item').forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
});

// Fade in elements on page load
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach((el, index) => {
    setTimeout(() => {
      if (!el.classList.contains('active')) {
        el.classList.add('active');
      }
    }, index * 100);
  });
});

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}
