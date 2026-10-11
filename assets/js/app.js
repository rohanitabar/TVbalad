// Select DOM elements

const menu = document.querySelector(".menu");
const header = document.querySelector("header");
const images = document.querySelectorAll(".carousel-img");
const container = document.querySelector(".container");
const circles = document.querySelectorAll(".ppCircleCon");
const about = document.querySelector(".about");
const carouselOverlay = document.querySelectorAll(".carousel-overlay");
const tvs = document.querySelectorAll(".tv");

// Hide Navbar

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  const headerHeight = header.offsetHeight;

  if (currentScroll < headerHeight) {
    menu.classList.remove("hide");
  } else {
    if (currentScroll > lastScroll) {
      menu.classList.add("hide");
    } else if (currentScroll === lastScroll) {
      menu.classList.remove("hide");
    }
  }
});

// Carousel

// Current active image index

let currentIndex = 0;

/* Displays the image at the specified index and hides all other images.*/

const showImage = (index) => {
  images.forEach((img) => img.classList.remove("active"));
  carouselOverlay.forEach((logo) => logo.classList.remove("active-logo"));

  images[index].classList.add("active");
  carouselOverlay[index].classList.add("active-logo");
};

showImage(currentIndex);
/**
 * Navigate to the next image.
 * Returns to the first image after the last one.
 */

const nextImage = () => {
  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  showImage(currentIndex);
};

// Automatically switch images every 1 seconds

const autoPlay = setInterval(nextImage, 1500);

// Scroll event for circles in Positive point

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  let sectionTop = container.offsetTop;

  const start = sectionTop - window.innerHeight / 2;
  const end = sectionTop;

  let progress = (scroll - start) / (end - start);

  progress = Math.max(0, Math.min(progress, 1));

  const angle = 180 * (1 - progress);

  circles.forEach((circle, index) => {
    if (index / 2 === 0) {
      circle.style.transform = `rotate(${angle}deg)`;
    } else {
      circle.style.transform = `rotate(${angle}deg)`;
    }
  });
});

// About Section

// Show TV's

const observer = new IntersectionObserver(
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

observer.observe(about);

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
