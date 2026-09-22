/* ================= FAQ ================= */

const questions = document.querySelectorAll(".faq-question");

questions.forEach(function (question) {
  question.addEventListener("click", function () {
    const item = question.closest(".faq-item");

    const isActive = item.classList.contains("active");

    /* Close all */

    document.querySelectorAll(".faq-item").forEach(function (otherItem) {
      otherItem.classList.remove("active");
    });

    /* Open clicked item */

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

/* ================= CONTACT FORM ================= */

const form = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    formMessage.textContent = "Please complete all required fields.";

    formMessage.style.color = "#ffaaaa";

    form.reportValidity();

    return;
  }

  formMessage.textContent = "Message sent successfully!";

  formMessage.style.color = "#9ee6ae";

  form.reset();
});

/* ================= SUPPORT BUTTON ================= */

const supportButton = document.querySelector(".support-btn");

supportButton.addEventListener("click", function () {
  alert("Support chat would open here.");
});
