(function(){
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
})();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    const initial = document.documentElement.getAttribute("data-theme") || "light";
    toggle.textContent = initial === "dark" ? "☀️" : "🌙";
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      toggle.textContent = next === "dark" ? "☀️" : "🌙";
    });
  }

  const toggles = document.querySelectorAll(".toggle-details");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const details = btn.nextElementSibling;
      const isHidden = details.hasAttribute("hidden");
      if (isHidden) {
        details.removeAttribute("hidden");
        btn.textContent = "Hide Details";
      } else {
        details.setAttribute("hidden","");
        btn.textContent = "Show Details";
      }
    });
  });

const reveals = document.querySelectorAll(".reveal");
const onScroll = () => {
  const h = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < h - 80) el.classList.add("active");
  });
};
window.addEventListener("scroll", onScroll);
onScroll();

const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a").forEach(a => {
  const href = a.getAttribute("href");
  if (href && href === here) a.classList.add("active");
});


const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");
if (filterBtns.length && cards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      cards.forEach(c => {
        const ok = f === "all" || c.dataset.category === f;
        c.style.display = ok ? "block" : "none";
      });
    });
  });
}


  const form = document.getElementById("contactForm");
  if (form) {
    const errorsEl = document.getElementById("formErrors");
    form.addEventListener("submit", e => {
      errorsEl.textContent = "";
      const name = form.elements.name;
      const email = form.elements.email;
      const message = form.elements.message;
      let ok = true;
      [name,email,message].forEach(i => i.classList.remove("input-error"));
      if (!name.value.trim()) { ok = false; name.classList.add("input-error"); }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (!emailOk) { ok = false; email.classList.add("input-error"); }
      if (message.value.trim().length < 10) { ok = false; message.classList.add("input-error"); }
      if (!ok) {
        e.preventDefault();
        errorsEl.textContent = "Please complete all fields with a valid email and a message of at least 10 characters.";
      }
    });
  }
});
