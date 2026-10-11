// Select DOM elements

const menu = document.querySelector(".menu");
const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector("header");
const images = document.querySelectorAll(".carousel-img");
const container = document.querySelector(".container");
const circles = document.querySelectorAll(".ppCircleCon");
const about = document.querySelector(".about");
const carouselOverlay = document.querySelectorAll(".carousel-overlay");
const tvs = document.querySelectorAll(".tv");

// Keep the hero below the fixed navigation, including when the menu wraps.
const updateMenuHeight = () => {
  if (menu) {
    document.documentElement.style.setProperty(
      "--menu-height",
      `${menu.offsetHeight}px`,
    );
  }
};

updateMenuHeight();
if (menu && "ResizeObserver" in window) {
  new ResizeObserver(updateMenuHeight).observe(menu);
} else {
  window.addEventListener("resize", updateMenuHeight);
}

const setMenuOpen = (isOpen) => {
  if (!menu || !menuToggle) return;

  menu.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "بستن منو" : "باز کردن منو");
};

menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

menu?.querySelectorAll(".menu-links a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("click", (event) => {
  if (menu?.classList.contains("open") && !menu.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) setMenuOpen(false);
});

// Hide Navbar

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  const headerHeight = header?.offsetHeight ?? 0;

  if (!menu) return;

  if (currentScroll < headerHeight || currentScroll < lastScroll) {
    menu.classList.remove("hide");
  } else if (currentScroll > lastScroll) {
    menu.classList.add("hide");
  }

  lastScroll = currentScroll;
});

// Carousel

// Current active image index

let currentIndex = 0;

/* Displays the image at the specified index and hides all other images.*/

const showImage = (index) => {
  images.forEach((img) => img.classList.remove("active"));
  carouselOverlay.forEach((logo) => logo.classList.remove("active-logo"));

  images[index]?.classList.add("active");
  carouselOverlay[index]?.classList.add("active-logo");
};

if (images.length > 0) showImage(currentIndex);
/**
 * Navigate to the next image.
 * Returns to the first image after the last one.
 */

const nextImage = () => {
  if (images.length === 0) return;

  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  showImage(currentIndex);
};

// Automatically switch images every 1.5 seconds

if (images.length > 1) setInterval(nextImage, 1500);

// Scroll event for circles in Positive point

window.addEventListener("scroll", () => {
  if (!container || circles.length === 0) return;

  let scroll = window.scrollY;

  let sectionTop = container.offsetTop;

  const start = sectionTop - window.innerHeight / 2;
  const end = sectionTop;

  let progress = (scroll - start) / (end - start);

  progress = Math.max(0, Math.min(progress, 1));

  const angle = 180 * (1 - progress);

  circles.forEach((circle) => {
    circle.style.transform = `rotate(${angle}deg)`;
  });
});

// About Section

// Show TV's

const observer = about && "IntersectionObserver" in window && new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        about.classList.add("show");
      } else {
        about.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.35,
  },
);

observer?.observe(about);
if (about && !observer) about.classList.add("show");

// TV's Animation

tvs.forEach((tv) => {
  tv.addEventListener("mouseenter", () => {
    tvs.forEach((item) => {
      item.style.opacity = "0.25";
      item.style.filter = "brightness(.7)";
    });

    tv.style.opacity = "1";
    tv.style.filter = "brightness(1)";
    tv.style.zIndex = "999";
  });

  tv.addEventListener("mouseleave", () => {
    tvs.forEach((item) => {
      item.style.opacity = "";
      item.style.filter = "";
      item.style.zIndex = "";
    });
  });
});
