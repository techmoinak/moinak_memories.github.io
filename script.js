const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".photo-card");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const closeButton = lightbox.querySelector(".lightbox-close");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;

    filters.forEach((button) => {
      button.classList.toggle("active", button === filter);
    });

    cards.forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");
    const caption = card.querySelector("span").innerText;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    closeButton.focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});
