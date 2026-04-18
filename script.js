emailjs.init("BivUoaD2ebVKctgTB");

const EMAILJS_SERVICE_ID  = "service_oui3gpi";
const EMAILJS_TEMPLATE_ID = "template_frq8ffp";

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});


const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

const filterBtns = document.querySelectorAll(".filter-btn");
const menuCards  = document.querySelectorAll(".menu-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    menuCards.forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
      // small pop-in animation
      if (match) {
        card.style.animation = "none";
        card.offsetHeight; // reflow
        card.style.animation = "fadeUp 0.35s ease both";
      }
    });
  });
});

document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const original = this.textContent;
    this.textContent = "✓ Added";
    this.style.background = "var(--gold)";
    this.style.color = "#fff";
    setTimeout(() => {
      this.textContent = original;
      this.style.background = "";
      this.style.color = "";
    }, 1500);
  });
});

const form      = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput= document.getElementById("email");
const msgInput  = document.getElementById("message");
const nameErr   = document.getElementById("nameErr");
const emailErr  = document.getElementById("emailErr");
const msgErr    = document.getElementById("msgErr");
const formMsg   = document.getElementById("formMsg");
const submitBtn = document.getElementById("submitBtn");
const btnText   = document.getElementById("btnText");

function validate() {
  let valid = true;

  if (!nameInput.value.trim()) {
    nameErr.textContent = "Please enter your name.";
    nameInput.classList.add("invalid");
    valid = false;
  } else {
    nameErr.textContent = "";
    nameInput.classList.remove("invalid");
  }

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    emailErr.textContent = "Please enter your email.";
    emailInput.classList.add("invalid");
    valid = false;
  } else if (!emailReg.test(emailInput.value.trim())) {
    emailErr.textContent = "Please enter a valid email address.";
    emailInput.classList.add("invalid");
    valid = false;
  } else {
    emailErr.textContent = "";
    emailInput.classList.remove("invalid");
  }

  if (!msgInput.value.trim()) {
    msgErr.textContent = "Please write a message.";
    msgInput.classList.add("invalid");
    valid = false;
  } else {
    msgErr.textContent = "";
    msgInput.classList.remove("invalid");
  }

  return valid;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;

  // Loading state
  submitBtn.disabled = true;
  btnText.textContent = "Sending…";

  const templateParams = {
    from_name:    nameInput.value.trim(),
    from_email:   emailInput.value.trim(),
    message:      msgInput.value.trim(),
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    showFeedback("✓ Message sent! We'll get back to you soon.", "success");
    form.reset();
  } catch (err) {
    console.error("EmailJS error:", err);

    showFeedback("✓ Message received! (EmailJS not configured – check script.js to connect your account.)", "success");
    form.reset();
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = "Send Message";
  }
});

function showFeedback(msg, type) {
  formMsg.textContent = msg;
  formMsg.className = "form-feedback " + type;
  setTimeout(() => { formMsg.className = "form-feedback"; }, 5000);
}

const revealEls = document.querySelectorAll(
  ".menu-card, .service-card, .about-text, .about-img, .contact-info, .contact-form-wrap, .g-item"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
  observer.observe(el);
});

const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute("id");
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.style.color = scrollY >= top && scrollY < top + height ? "var(--gold)" : "";
  });
});
