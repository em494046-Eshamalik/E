
// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  const opened = navMenu.classList.toggle("open");

  menuBtn.textContent = opened ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(opened));
});

// Close menu after navigation
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Dark and Light Mode
const themeBtn = document.getElementById("themeBtn");

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☀" : "☾";
  themeBtn.setAttribute(
    "aria-label",
    dark ? "Switch to light theme" : "Switch to dark theme"
  );
}

try {
  setTheme(localStorage.getItem("eman-theme") === "dark");
} catch (error) {
  setTheme(false);
}

themeBtn.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");

  setTheme(dark);

  try {
    localStorage.setItem("eman-theme", dark ? "dark" : "light");
  } catch (error) {
    console.log("Theme preference could not be saved.");
  }
});

// Project filtering
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(button => {
  button.setAttribute(
    "aria-pressed",
    button.classList.contains("active") ? "true" : "false"
  );

  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filters.forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    projects.forEach(project => {
      const matches =
        category === "all" ||
        project.dataset.category === category;

      project.hidden = !matches;
    });
  });
});

// Animated typing text
const typing = document.getElementById("typing");

const words = [
  "Web Enthusiast",
  "B.Ed Student",
  "Data Analytics Learner"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
  const current = words[wordIndex];

  typing.textContent = current.substring(0, letterIndex);

  if (!deleting && letterIndex < current.length) {
    letterIndex++;
    setTimeout(typeEffect, 90);
  } else if (!deleting && letterIndex === current.length) {
    deleting = true;
    setTimeout(typeEffect, 1300);
  } else if (deleting && letterIndex > 0) {
    letterIndex--;
    setTimeout(typeEffect, 45);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 350);
  }
}

typeEffect();

// Current year
document.getElementById("year").textContent =
  new Date().getFullYear();
