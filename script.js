//*// Navegação suave, animações, dark mode e interações
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v1] Script inicializado ✅");

  // ======== ELEMENTOS DO DOM ========
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".header");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.getElementById("contactForm");
  const downloadCV = document.getElementById("downloadCV");
  const themeToggle = document.getElementById("themeToggle");
  const emailjs = window.emailjs;

  // ======== TEMA ESCURO / CLARO ========
  const currentTheme = localStorage.getItem("theme") || "light";

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem("theme", "dark");
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", "light");
      }
    });
  }

  // ======== MENU MOBILE ========
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // ======== NAVEGAÇÃO ATIVA NO SCROLL ========
  function updateActiveNav() {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  }

  // ======== EFEITO NO HEADER E BOTÃO VOLTAR AO TOPO ========
  function handleScroll() {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    if (window.scrollY > 300) backToTop.classList.add("show");
    else backToTop.classList.remove("show");

    updateActiveNav();
    animateOnScroll();
  }

  window.addEventListener("scroll", handleScroll);

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ======== ANIMAÇÕES DE ENTRADA ========
  function animateOnScroll() {
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  }

  function addAnimationClasses() {
    document.querySelectorAll(".section-header").forEach((el) => el.classList.add("fade-in"));

    document.querySelectorAll(".project-card").forEach((el, i) => {
      el.classList.add("fade-in");
      el.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll(".skill-item").forEach((el, i) => {
      el.classList.add("slide-in-right");
      el.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll(".stat-item").forEach((el, i) => {
      el.classList.add("fade-in");
      el.style.transitionDelay = `${i * 0.2}s`;
    });

    document.querySelector(".about-text")?.classList.add("slide-in-left");
    document.querySelector(".skills-container")?.classList.add("slide-in-right");
    document.querySelector(".contact-info")?.classList.add("slide-in-left");
    document.querySelector(".contact-form")?.classList.add("slide-in-right");
  }

  // ======== ANIMAÇÃO DAS BARRAS DE SKILL ========
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBar = entry.target;
            const width = skillBar.getAttribute("data-width");
            skillBar.style.width = width;
          }
        });
      },
      { threshold: 0.5 }
    );
    skillBars.forEach((bar) => observer.observe(bar));
  }

  // ======== FORMULÁRIO DE CONTATO (EMAILJS) ========
  contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');

    emailjs.init("YOUR_PUBLIC_KEY");

    btn.classList.add("loading");
    btn.disabled = true;

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status);
          showNotification("Mensagem enviada com sucesso para cvdinizramos@gmail.com!", "success");
          contactForm.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          showNotification("Erro ao enviar mensagem. Tente novamente.", "error");
        }
      )
      .finally(() => {
        btn.classList.remove("loading");
        btn.disabled = false;
      });
  });

  // ======== DOWNLOAD DO CURRÍCULO ========
  downloadCV?.addEventListener("click", (e) => {
    e.preventDefault();
    const resumeUrl =
      "https://docs.google.com/document/d/1_3CIDasNcO2HzBqKouM5YM72md6QwJckOqqopUGbICg/edit?usp=sharing";
    window.open(resumeUrl, "_blank");
    showNotification("Abrindo currículo em nova aba!", "info");
  });

  // ======== SISTEMA DE NOTIFICAÇÕES ========
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    if (!document.querySelector("#notification-styles")) {
      const styles = document.createElement("style");
      styles.id = "notification-styles";
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 10000;
          transform: translateX(400px);
          transition: transform 0.3s ease;
          max-width: 350px;
        }
        .notification.show { transform: translateX(0); }
        .notification-content {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .notification-success { border-left: 4px solid #10b981; }
        .notification-info { border-left: 4px solid #2563eb; }
        .notification-error { border-left: 4px solid #ef4444; }
        .notification-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
          margin-left: 1rem;
        }
      `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add("show"), 100);

    notification.querySelector(".notification-close").addEventListener("click", () => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // ======== EFEITO HOVER NOS PROJETOS ========
  function addProjectHoverEffects() {
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => (card.style.transform = "translateY(-10px) scale(1.02)"));
      card.addEventListener("mouseleave", () => (card.style.transform = "translateY(0) scale(1)"));
    });
  }

  // ======== CONTADOR ANIMADO ========
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number.parseInt(counter.textContent.replace("+", ""));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target + "+";
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current) + "+";
              }
            }, 30);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((counter) => observer.observe(counter));
  }

  // ======== INICIALIZAÇÃO ========
  function init() {
    addAnimationClasses();
    animateSkillBars();
    addProjectHoverEffects();
    animateCounters();
    handleScroll();
  }

  init();

  // ======== SCROLL SUAVE ========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ======== PRELOADER ========
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    setTimeout(() => {
      document.querySelectorAll(".hero-title, .hero-subtitle, .hero-description").forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * 200);
      });
    }, 500);
  });

  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .hero-title, .hero-subtitle, .hero-description {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
  `;
  document.head.appendChild(styleSheet);
});

// ======== FUNÇÕES EXTRAS ========
function isMobile() {
  return window.innerWidth <= 768;
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

window.addEventListener(
  "scroll",
  debounce(() => {}, 10)
);

// ======== TYPED ANIMAÇÃO ========
var typed = new Typed("#typed", {
  strings: ["Caio Diniz", "Desenvolvedor Fullstack", "Desenvolvedor FrontEnd", "Desenvolvedor BackEnd", "Programador Inovador"],
  typeSpeed: 80,
  backSpeed: 50,
  backDelay: 1500,
  loop: true,
  showCursor: true,
  cursorChar: "|",
});
