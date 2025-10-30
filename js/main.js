// DoorHub Ghana - Contact Form Handler + Gallery Lightbox + Mobile Nav
document.addEventListener("DOMContentLoaded", function () {

  /* ===== Contact Form Handler ===== */
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("form-success");

  if (form) { // ensure the page has a contact form
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // Stop page reload
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          successMsg.style.display = "block";
          form.reset();
          setTimeout(() => {
            successMsg.style.display = "none";
          }, 6000);
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      } catch (error) {
        alert("Network error. Please check your connection and try again.");
      }
    });
  }

  /* ===== Gallery Lightbox with Arrows ===== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (lightbox) { // only if gallery exists
    let currentIndex = 0;

    function showLightbox(index) {
      currentIndex = index;
      lightboxImg.src = galleryItems[currentIndex].src;
      lightboxImg.alt = galleryItems[currentIndex].alt;
      lightbox.style.display = "block";
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        showLightbox(index);
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      showLightbox(currentIndex);
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryItems.length;
      showLightbox(currentIndex);
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "block") {
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "Escape") closeBtn.click();
      }
    });
  }

  /* ===== Mobile Navigation Toggle ===== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

});
