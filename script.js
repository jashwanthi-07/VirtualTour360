// DESTINATION FILTERS

const filterButtons = document.querySelectorAll(".filter-button");
const destinationCards = document.querySelectorAll(".destination-card");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        destinationCards.forEach(function(card) {
            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});


// VIRTUAL TOUR

const tourModal = document.querySelector(".tour-modal");
const tourTitle = document.querySelector("#tour-title");
const tourPanorama = document.querySelector(".tour-panorama");
const tourViewer = document.querySelector(".tour-viewer");
const closeTourButton = document.querySelector(".close-tour");

let currentPosition = 0;
let startX = 0;
let isDragging = false;

document.querySelectorAll(".tour-button").forEach(function(button) {
    button.addEventListener("click", function() {

        const card = button.closest(".destination-card");
        const title = card.querySelector("h3").textContent;
        const image = card.querySelector("img");

        tourTitle.textContent = title + " - Virtual Tour";
        tourPanorama.src = image.src;
        tourPanorama.alt = title;

        currentPosition = 0;
        tourPanorama.style.transform = "translateX(0px)";

        tourModal.classList.add("show");
        document.body.style.overflow = "hidden";
    });
});

function closeTour() {
    tourModal.classList.remove("show");
    document.body.style.overflow = "";
}

closeTourButton.addEventListener("click", closeTour);

tourModal.addEventListener("click", function(event) {
    if (event.target === tourModal) {
        closeTour();
    }
});


// DRAG IMAGE

tourViewer.addEventListener("pointerdown", function(event) {
    isDragging = true;
    startX = event.clientX - currentPosition;
    tourViewer.setPointerCapture(event.pointerId);
});

tourViewer.addEventListener("pointermove", function(event) {
    if (!isDragging) {
        return;
    }

    const viewerWidth = tourViewer.clientWidth;
    const imageWidth = tourPanorama.clientWidth;
    const minPosition = Math.min(0, viewerWidth - imageWidth);

    currentPosition = event.clientX - startX;

    currentPosition = Math.max(
        minPosition,
        Math.min(0, currentPosition)
    );

    tourPanorama.style.transform =
        "translateX(" + currentPosition + "px)";
});

tourViewer.addEventListener("pointerup", function() {
    isDragging = false;
});

tourViewer.addEventListener("pointercancel", function() {
    isDragging = false;
});


// CONTACT FORM

const contactForm = document.querySelector(".contact-form");
const successModal = document.querySelector(".success-modal");
const closeSuccessButton = document.querySelector(".close-success");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    successModal.classList.add("show");
    contactForm.reset();
});

function closeSuccessModal() {
    successModal.classList.remove("show");
}

closeSuccessButton.addEventListener("click", closeSuccessModal);

successModal.addEventListener("click", function(event) {
    if (event.target === successModal) {
        closeSuccessModal();
    }
});


// ESCAPE KEY

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeTour();
        closeSuccessModal();
    }
});