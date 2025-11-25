document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const header = document.querySelector(".header")
  const backToTop = document.getElementById("backToTop")
  const themeToggle = document.getElementById("themeToggle")
  const languageToggle = document.getElementById("languageToggle")

  const currentTheme = localStorage.getItem("theme") || "light"
  let currentLanguage = localStorage.getItem("language") || "pt"

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode")
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode")

      if (document.body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "light")
      }
    })
  }

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  function updateActiveNav() {
    const sections = document.querySelectorAll("section")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        if (navLink) navLink.classList.add("active")
      }
    })
  }

  function handleScroll() {
    if (window.scrollY > 50) header.classList.add("scrolled")
    else header.classList.remove("scrolled")

    if (window.scrollY > 300) backToTop.classList.add("show")
    else backToTop.classList.remove("show")

    updateActiveNav()
    animateOnScroll()
  }

  window.addEventListener("scroll", handleScroll)

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })

  function animateOnScroll() {
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible")
      }
    })
  }

  function addAnimationClasses() {
    document.querySelectorAll(".section-header").forEach((el) => el.classList.add("fade-in"))

    document.querySelectorAll(".about-description").forEach((el) => el.classList.add("fade-in"))

    document.querySelectorAll(".project-card").forEach((el, i) => {
      el.classList.add("scale-in")
      el.style.transitionDelay = `${i * 0.1}s`
    })

    document.querySelectorAll(".stat-item").forEach((el, i) => {
      el.classList.add("scale-in")
      el.style.transitionDelay = `${i * 0.15}s`
    })

    document.querySelectorAll(".skill-item").forEach((el, i) => {
      el.classList.add("scale-in")
      el.style.transitionDelay = `${i * 0.05}s`
    })

    document.querySelector(".about-text")?.classList.add("slide-in-left")
    document.querySelector(".skills-container")?.classList.add("slide-in-right")
    document.querySelector(".contact-info")?.classList.add("slide-in-left")
    document.querySelector(".contact-form")?.classList.add("slide-in-right")

    document.querySelectorAll(".contact-item").forEach((el, i) => {
      el.classList.add("fade-in")
      el.style.transitionDelay = `${i * 0.1}s`
    })

    document.querySelectorAll(".social-link").forEach((el, i) => {
      el.classList.add("scale-in")
      el.style.transitionDelay = `${i * 0.1}s`
    })
  }

  function animateSkillBars() {
    const skillItems = document.querySelectorAll(".skill-item")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillItem = entry.target
            skillItem.classList.add("visible")

            const skillBar = skillItem.querySelector(".skill-progress")
            if (skillBar) {
              const width = skillBar.getAttribute("data-width")
              skillItem.style.setProperty("--skill-level", width)
            }
          }
        })
      },
      { threshold: 0.3 },
    )
    skillItems.forEach((item) => observer.observe(item))
  }

  function addProjectHoverEffects() {
    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => (card.style.transform = "translateY(-15px) rotateX(5deg) scale(1.02)"))
      card.addEventListener("mouseleave", () => (card.style.transform = "translateY(0) scale(1)"))
    })
  }

  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target
            const target = Number.parseInt(counter.textContent.replace("+", ""))
            let current = 0
            const increment = target / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                counter.textContent = target + "+"
                clearInterval(timer)
              } else {
                counter.textContent = Math.floor(current) + "+"
              }
            }, 30)
            observer.unobserve(counter)
          }
        })
      },
      { threshold: 0.5 },
    )
    counters.forEach((counter) => observer.observe(counter))
  }

  function addSocialTooltips() {
    const socialLinks = document.querySelectorAll('.social-link')
    
    socialLinks.forEach(link => {
      const title = link.getAttribute('title')
      let tooltipText = ''
      
      if (title === 'LinkedIn') {
        tooltipText = 'Venha conhecer meu LinkedIn'
      } else if (title === 'GitHub') {
        tooltipText = 'Veja meus projetos no GitHub'
      } else if (title === 'TikTok' || title === 'Twitter') {
        tooltipText = 'Siga-me no TikTok'
      } else if (title === 'Instagram') {
        tooltipText = 'Me siga no Instagram'
      } else if (title === 'WhatsApp') {
        tooltipText = 'Entre em contato via WhatsApp'
      }
      
      link.setAttribute('data-tooltip', tooltipText)
    })
  }

  function updateSocialTooltips(language) {
    const socialLinks = document.querySelectorAll('.social-link')
    
    socialLinks.forEach(link => {
      const title = link.getAttribute('title')
      let tooltipText = ''
      
      if (language === 'en') {
        if (title === 'LinkedIn') {
          tooltipText = 'Check out my LinkedIn'
        } else if (title === 'GitHub') {
          tooltipText = 'See my projects on GitHub'
        } else if (title === 'TikTok' || title === 'Twitter') {
          tooltipText = 'Follow me on TikTok'
        } else if (title === 'Instagram') {
          tooltipText = 'Follow me on Instagram'
        } else if (title === 'WhatsApp') {
          tooltipText = 'Contact me via WhatsApp'
        }
      } else {
        if (title === 'LinkedIn') {
          tooltipText = 'Venha conhecer meu LinkedIn'
        } else if (title === 'GitHub') {
          tooltipText = 'Veja meus projetos no GitHub'
        } else if (title === 'TikTok' || title === 'Twitter') {
          tooltipText = 'Siga-me no TikTok'
        } else if (title === 'Instagram') {
          tooltipText = 'Me siga no Instagram'
        } else if (title === 'WhatsApp') {
          tooltipText = 'Entre em contato via WhatsApp'
        }
        
      }
      
      link.setAttribute('data-tooltip', tooltipText)
    })
  }

  function updateLanguageToggleIcon() {
    if (languageToggle) {
      if (currentLanguage === "en") {
        languageToggle.setAttribute("title", "Traduzir para Português")
        languageToggle.innerHTML = '<i class="fas fa-globe" style="color: #fbbf24;"></i>'
      } else {
        languageToggle.setAttribute("title", "Translate to English")
        languageToggle.innerHTML = '<i class="fas fa-globe"></i>'
      }
    }
  }

  function translatePage(language) {
    const elements = document.querySelectorAll("[data-pt][data-en]")

    elements.forEach((element) => {
      const textContent = element.getAttribute(`data-${language}`)

      if (element.tagName === "P" || element.tagName === "SPAN" || element.tagName === "A" || element.tagName === "H2" || element.tagName === "H3" || element.tagName === "LABEL") {
        if (textContent && textContent.includes("&copy;")) {
          element.innerHTML = textContent
        } else if (textContent && (element.tagName === "P" || element.tagName === "LABEL")) {
          element.textContent = textContent
        } else if (textContent) {
          const childNodes = Array.from(element.childNodes)
          childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              node.textContent = textContent
            }
          })
          if (!element.textContent.trim() || element.textContent === element.getAttribute(`data-${language === "pt" ? "en" : "pt"}`)) {
            element.textContent = textContent
          }
        }
      }
    })

    document.title = language === "en" ? "Caio Diniz - FullStack Programmer" : "Caio Diniz - Programador FullStack"
    document.querySelector('meta[name="description"]').setAttribute(
      "content",
      language === "en"
        ? "Professional portfolio of Caio Diniz, a FullStack programmer specialized in modern web development."
        : "Portfólio profissional de Caio Diniz, programador FullStack especializado em desenvolvimento web moderno."
    )

    document.documentElement.lang = language
  }

  function init() {
    addAnimationClasses()
    animateSkillBars()
    addProjectHoverEffects()
    animateCounters()
    addSocialTooltips()
    handleScroll()

    if (currentLanguage === "en") {
      translatePage("en")
      updateLanguageToggleIcon()
      updateSocialTooltips(currentLanguage)
    }
  }

  init()

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute("href"))
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  })

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      currentLanguage = currentLanguage === "pt" ? "en" : "pt"
      localStorage.setItem("language", currentLanguage)
      translatePage(currentLanguage)
      updateLanguageToggleIcon()
      updateSocialTooltips(currentLanguage)
    })
  }
})



