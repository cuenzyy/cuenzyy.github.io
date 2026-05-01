// assets/app.js

// ---------- Helpers ----------
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

function lockBody(lock) {
  document.documentElement.classList.toggle("overflow-hidden", lock);
  document.body.classList.toggle("overflow-hidden", lock);
}

// ---------- Mobile Nav ----------
function initNav() {
  const btn = qs("[data-nav-toggle]");
  const panel = qs("[data-nav-panel]");
  const closeOnClickLinks = qsa("[data-nav-panel] a");

  if (!btn || !panel) return;

  const open = () => {
    panel.classList.remove("hidden");
    panel.classList.add("block");
    btn.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    panel.classList.add("hidden");
    panel.classList.remove("block");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    isOpen ? close() : open();
  });

  closeOnClickLinks.forEach(a => {
    a.addEventListener("click", () => close());
  });

  // Close menu on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// ---------- Smooth scroll for in-page links ----------
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = qs(id);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 84;
      const rect = target.getBoundingClientRect();
      const offsetTop = rect.top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetTop, behavior: "smooth" });

      // Update URL hash without jumping
      history.pushState(null, "", id);
    });
  });
}

// ---------- Scroll Reveal Animations ----------
function initReveal() {
  const els = qsa(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  els.forEach(el => io.observe(el));
}

// ---------- Project Modal (Work page) ----------
function initProjectModal() {
  const modal = qs("[data-modal]");
  const modalTitle = qs("[data-modal-title]");
  const modalBody = qs("[data-modal-body]");
  const closeBtn = qs("[data-modal-close]");
  const backdrop = qs("[data-modal-backdrop]");
  const triggers = qsa("[data-open-modal]");

  if (!modal || !triggers.length) return;

  const open = (payload) => {
    modalTitle.textContent = payload.title || "Project Details";
    modalBody.innerHTML = `
      <div class="space-y-4">
        <div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Goal</p>
          <p class="mt-1 text-slate-900 dark:text-slate-100">${payload.goal || "—"}</p>
        </div>
        <div>
          <p class="text-sm text-slate-500 dark:text-slate-400">What I did</p>
          <ul class="mt-1 list-disc pl-5 space-y-1 text-slate-900 dark:text-slate-100">
            ${(payload.did || []).map(x => `<li>${x}</li>`).join("") || "<li>—</li>"}
          </ul>
        </div>
        <div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Tools used</p>
          <div class="mt-2 flex flex-wrap gap-2">
            ${(payload.tools || []).map(t => `
              <span class="rounded-full border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-900 dark:text-slate-200">${t}</span>
            `).join("") || `<span class="text-slate-600 dark:text-slate-400 text-sm">—</span>`}
          </div>
        </div>
        <div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Output / Result</p>
          <p class="mt-1 text-slate-900 dark:text-slate-100">${payload.result || "—"}</p>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    lockBody(true);

    // focus close button for accessibility
    setTimeout(() => closeBtn?.focus(), 50);
  };

  const close = () => {
    modal.classList.add("hidden");
    lockBody(false);
  };

  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const data = btn.getAttribute("data-open-modal");
      try {
        const payload = JSON.parse(data);
        open(payload);
      } catch {
        open({ title: "Project Details" });
      }
    });
  });

  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) close();
  });
}

// ---------- Gallery Lightbox ----------
function initLightbox() {
  const lb = qs("[data-lightbox]");
  const img = qs("[data-lightbox-img]");
  const title = qs("[data-lightbox-title]");
  const closeBtn = qs("[data-lightbox-close]");
  const backdrop = qs("[data-lightbox-backdrop]");
  const triggers = qsa("[data-lightbox-open]");

  if (!lb || !triggers.length) return;

  const open = (payload) => {
    img.src = payload.src;
    img.alt = payload.title || "Preview";
    title.textContent = payload.title || "Preview";
    
    lb.classList.remove("hidden");
    lockBody(true);
    setTimeout(() => closeBtn?.focus(), 50);
  };

  const close = () => {
    lb.classList.add("hidden");
    lockBody(false);
  };

  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const data = btn.getAttribute("data-lightbox-open");
      try {
        const payload = JSON.parse(data);
        open(payload);
      } catch (e) {
        console.error("Error parsing lightbox data:", e);
        open({ src: btn.getAttribute("data-src") || "", title: "Preview" });
      }
    });
  });

  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lb.classList.contains("hidden")) close();
  });
}

// ---------- Gallery Carousel ----------
function initCarousels() {
  qsa(".carousel-container").forEach(container => {
    const prevBtn = qs(".carousel-prev", container);
    const nextBtn = qs(".carousel-next", container);
    const slides = qsa(".carousel-slide", container);
    const descriptions = qsa(".carousel-description", container);
    const currentSpan = qs(".carousel-current", container);
    const totalSpan = qs(".carousel-total", container);
    const viewer = qs(".carousel-viewer", container);

    if (!slides.length || !descriptions.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let touchStartX = 0;
    let touchEndX = 0;

    // Update total count
    if (totalSpan) totalSpan.textContent = totalSlides;

    const showSlide = (index) => {
      // Normalize index for infinite looping
      currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;

      // Hide all slides and descriptions
      slides.forEach(s => {
        s.classList.add("hidden");
        const existingTitle = qs(".carousel-slide-title", s.parentElement);
        if (existingTitle) existingTitle.remove();
      });
      descriptions.forEach(d => d.classList.add("hidden"));

      // Show current slide and description
      const currentSlide = slides[currentIndex];
      currentSlide.classList.remove("hidden");
      descriptions[currentIndex].classList.remove("hidden");

      // Add title overlay
      const slideData = currentSlide.getAttribute("data-lightbox-open");
      if (slideData) {
        try {
          const data = JSON.parse(slideData);
          if (data.title) {
            const titleOverlay = document.createElement("div");
            titleOverlay.className = "carousel-slide-title";
            titleOverlay.textContent = data.title;
            viewer.appendChild(titleOverlay);
          }
        } catch (e) {
          console.error("Error parsing slide data:", e);
        }
      }

      // Update counter
      if (currentSpan) currentSpan.textContent = currentIndex + 1;
    };

    const nextSlide = () => {
      showSlide(currentIndex + 1);
    };

    const prevSlide = () => {
      showSlide(currentIndex - 1);
    };

    // Click navigation
    nextBtn?.addEventListener("click", nextSlide);
    prevBtn?.addEventListener("click", prevSlide);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (container.offsetParent !== null) { // Only if visible
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
      }
    });

    // Touch/swipe support for mobile
    if (viewer) {
      viewer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, false);

      viewer.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, false);
    }

    const handleSwipe = () => {
      const swipeThreshold = 50; // Minimum distance for swipe
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - show next slide
          nextSlide();
        } else {
          // Swiped right - show previous slide
          prevSlide();
        }
      }
    };

    // Initialize first slide
    showSlide(0);
  });
}

// ---------- Contact Form with EmailJS ----------
function initContactForm() {
  const contactForm = qs("#contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const sendBtn = qs("#sendMessageBtn");
    const originalBtnText = sendBtn.textContent;
    
    try {
      sendBtn.disabled = true;
      sendBtn.textContent = "Sending...";

      const response = await emailjs.sendForm(
        "service_kyqcg9l",
        "template_aguep2q",
        contactForm
      );

      sendBtn.textContent = "Message Sent! ✓";
      sendBtn.classList.add("bg-green-500", "hover:bg-green-600");
      sendBtn.classList.remove("bg-blue-500", "hover:bg-blue-600");

      contactForm.reset();

      setTimeout(() => {
        sendBtn.textContent = originalBtnText;
        sendBtn.classList.remove("bg-green-500", "hover:bg-green-600");
        sendBtn.classList.add("bg-blue-500", "hover:bg-blue-600");
        sendBtn.disabled = false;
      }, 3000);

    } catch (error) {
      console.error("Error:", error);
      sendBtn.textContent = "Failed. Try again.";
      sendBtn.classList.add("bg-red-500", "hover:bg-red-600");
      sendBtn.classList.remove("bg-blue-500", "hover:bg-blue-600");

      setTimeout(() => {
        sendBtn.textContent = originalBtnText;
        sendBtn.classList.remove("bg-red-500", "hover:bg-red-600");
        sendBtn.classList.add("bg-blue-500", "hover:bg-blue-600");
        sendBtn.disabled = false;
      }, 3000);
    }
  });
}

// ---------- Theme Switcher ----------
function initTheme() {
  const html = document.documentElement;
  const themeToggleBtn = qs("#theme-toggle");
  const themeToggleMobileBtn = qs("#theme-toggle-mobile");
  const THEME_KEY = "theme-preference";

  // Determine the theme to use
  const getTheme = () => {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;

    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  // Apply theme to DOM
  const applyTheme = (theme) => {
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Update icon visibility
    updateThemeIcons(theme);
    localStorage.setItem(THEME_KEY, theme);
  };

  // Update icon visibility based on theme
  const updateThemeIcons = (theme) => {
    // Get all sun and moon icons
    const sunIcons = qsa(".sun-icon");
    const moonIcons = qsa(".moon-icon");
    const toggleTexts = qsa(".toggle-text");

    if (theme === "dark") {
      // Dark mode is ON - show moon icon, hide sun
      sunIcons.forEach(icon => icon.classList.add("hidden"));
      moonIcons.forEach(icon => icon.classList.remove("hidden"));
      toggleTexts.forEach(text => text.textContent = "Dark Mode");
    } else {
      // Light mode is ON - show sun icon, hide moon
      sunIcons.forEach(icon => icon.classList.remove("hidden"));
      moonIcons.forEach(icon => icon.classList.add("hidden"));
      toggleTexts.forEach(text => text.textContent = "Light Mode");
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = html.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  };

  // Event listeners for toggle buttons
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener("click", toggleTheme);
  }

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    applyTheme(newTheme);
  });

  // Initialize theme on page load
  const initialTheme = getTheme();
  applyTheme(initialTheme);
  
  // Force icon update after a brief delay to ensure DOM is ready
  setTimeout(() => {
    updateThemeIcons(initialTheme);
  }, 50);
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initSmoothScroll();
  initReveal();
  initProjectModal();
  initLightbox();
  initCarousels();
  initContactForm();

  // Set current year
  const y = qs("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
});