let currentSlide = 0;
let slideshowInterval = null;

const playButton = document.getElementById("playButton");

function showSlide(index) {
  const slides = document.getElementsByClassName("slide");
  
  // Wrap around index if out of bounds
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  
  // Hide all slides
  for (let slide of slides) {
    slide.style.display = "none";
  }
  
  // Show the current slide
  slides[currentSlide].style.display = "block";
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

function startSlideshow() {
  if (!slideshowInterval) {
    slideshowInterval = setInterval(() => {
      changeSlide(1); // Automatically navigate to the next image
    }, 2000); // Change image every 2 seconds
    playButton.textContent = "Pause ⏸"; // Change to Pause icon
  } else {
    stopSlideshow();
  }
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
  slideshowInterval = null;
  playButton.textContent = "Play ▶"; // Change to Play icon
}

// Play button event listener
playButton.addEventListener("click", startSlideshow);

// Initialize with the first slide visible
showSlide(currentSlide);
