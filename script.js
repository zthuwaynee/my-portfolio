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
