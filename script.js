
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Script inicializado ✅")


  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const header = document.querySelector(".header")
  const backToTop = document.getElementById("backToTop")
  const contactForm = document.getElementById("contactForm")
  const downloadCV = document.getElementById("downloadCV")
  const themeToggle = document.getElementById("themeToggle")

  const currentTheme = localStorage.getItem("theme") || "light"

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
      card.addEventListener("mouseenter", () => (card.style.transform = "translateY(-10px) scale(1.02)"))
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

  function init() {
    addAnimationClasses()
    animateSkillBars()
    addProjectHoverEffects()
    animateCounters()
    handleScroll()
  }

  init()
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute("href"))
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  })
})
