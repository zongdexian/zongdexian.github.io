/* =====================
   Navigation
   ===================== */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

// Scroll: add scrolled class
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

/* =====================
   Scroll Reveal
   ===================== */
const revealElements = document.querySelectorAll(
  '.about-card, .work-card, .skill-item, .process-step, .testimonial-card, .contact-form, .contact-text'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay
      entry.target.style.transitionDelay = (i % 6) * 0.08 + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* =====================
   Work Filter
   ===================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    workCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Add fadeIn keyframe dynamically
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }';
document.head.appendChild(style);

/* =====================
   Contact Form
   ===================== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent = '发送中...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = '发送成功! ✓';
    btn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
    btn.style.opacity = '1';

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  }, 1200);
});

/* =====================
   Cursor Trail (Desktop)
   ===================== */
if (window.matchMedia('(pointer: fine)').matches) {
  const dots = [];
  const NUM_DOTS = 8;
  const colors = ['#f43f8b', '#6c63ff', '#3bcfff', '#f9c74f', '#43e97b', '#f8961e'];

  for (let i = 0; i < NUM_DOTS; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${10 - i}px;
      height: ${10 - i}px;
      border-radius: 50%;
      background: ${colors[i % colors.length]};
      pointer-events: none;
      z-index: 9999;
      opacity: ${0.6 - i * 0.06};
      transition: transform 0.1s;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateDots() {
    let x = mouseX, y = mouseY;
    dots.forEach((dot, i) => {
      dot.x += (x - dot.x) * (0.35 - i * 0.03);
      dot.y += (y - dot.y) * (0.35 - i * 0.03);
      dot.el.style.left = dot.x + 'px';
      dot.el.style.top = dot.y + 'px';
      x = dot.x;
      y = dot.y;
    });
    requestAnimationFrame(animateDots);
  }

  animateDots();
}

/* =====================
   Active Nav Link on Scroll
   ===================== */
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkItems.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? '#f0f0f5' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
