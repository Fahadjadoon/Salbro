// ========== PRELOADER ==========
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('active');
        }
      });
    }, 300);
  }, 2200);
});

// ========== SCROLL PROGRESS ==========
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('scroll-progress').style.width = scrolled + '%';
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
const navInner = document.getElementById('nav-inner');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    navInner.classList.remove('h-24');
    navInner.classList.add('h-20');
  } else {
    navbar.classList.remove('scrolled');
    navInner.classList.remove('h-20');
    navInner.classList.add('h-24');
  }
});

// ========== MOBILE MENU ==========
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const icon = mobileBtn.querySelector('i');
  if (mobileMenu.classList.contains('open')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const icon = mobileBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// ========== LANGUAGE TOGGLE (EN/AR) ==========
const langToggle = document.getElementById('lang-toggle');
const htmlRoot = document.getElementById('html-root');
let currentLang = 'en';

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  htmlRoot.setAttribute('lang', currentLang);
  htmlRoot.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
  
  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', text);
      } else {
        el.textContent = text;
      }
    }
  });

  document.querySelectorAll('input[data-en][data-ar], textarea[data-en][data-ar]').forEach(el => {
    el.setAttribute('placeholder', el.getAttribute(`data-${currentLang}`));
  });

  const waTooltip = document.querySelector('.whatsapp-tooltip');
  if (waTooltip) {
    waTooltip.textContent = currentLang === 'ar' ? 'تحدث معنا' : 'Chat with us';
  }

  window.scrollTo({ top: window.scrollY, behavior: 'instant' });
});

// ========== INTERSECTION OBSERVER ==========
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          entry.target.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          entry.target.textContent = target;
        }
      };
      updateCounter();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ========== CUSTOM CURSOR ==========
const cursorDot = document.getElementById('cursor-dot');
if (window.matchMedia('(pointer: fine)').matches && cursorDot) {
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .premium-card, .iso-badge, .whatsapp-float').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(3)';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 100;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    if (!name || !email || !message) {
      formStatus.textContent = currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill in all required fields.';
      formStatus.className = 'text-center text-sm font-semibold text-red-400 mt-4';
      return;
    }

    formStatus.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
    formStatus.className = 'text-center text-sm font-semibold text-[#C9A961] mt-4';

    setTimeout(() => {
      formStatus.textContent = currentLang === 'ar' ? 'شكراً لك! تم إرسال رسالتك بنجاح.' : 'Thank you! Your message has been sent successfully.';
      formStatus.className = 'text-center text-sm font-semibold text-green-400 mt-4';
      contactForm.reset();
      
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'text-center text-sm font-semibold hidden';
      }, 5000);
    }, 1500);
  });
}

// ========== PARALLAX HERO ==========
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImg = document.querySelector('.kenburns');
  if (heroImg && scrolled < window.innerHeight) {
    heroImg.style.transform = `scale(1.12) translateY(${scrolled * 0.08}px)`;
  }
});