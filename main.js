const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}      

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}  

const navLink = document.querySelectorAll('.nav__link')

const linkAction = (event) =>{
    navLink.forEach(n => n.classList.remove('active'))
    event.target.classList.add('active')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

const shadowHeader = () =>{
  const header = document.getElementById('header')

  window.scrollY >= 40 ? header.classList.add('shadow-header')
                     : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)


const largeImage = document.getElementById('largeImage');
const imageText = document.getElementById('imageText');
const thumbnails = document.querySelectorAll('.thumbnail');
const leftButton = document.querySelector('.slide-button.left');
const rightButton = document.querySelector('.slide-button.right');
const thumbnailRow = document.querySelector('.thumbnail-row');
const playButton = document.querySelector('.slide-button.play');

let currentIndex = 0;
let autoSlideInterval = null;
let currentStartIndex = 0;

const visibleThumbnails = 10;

updateThumbnails();

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    stopSlideshow();
    updateLargeImage(index);
  });
});

function updateLargeImage(index) {
  currentIndex = index;
  const selectedThumbnail = thumbnails[index];
  largeImage.src = selectedThumbnail.dataset.large;
  imageText.textContent = selectedThumbnail.dataset.text || ''; // Default text if none exists
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  selectedThumbnail.classList.add('active');
}

rightButton.addEventListener('click', () => {
  stopSlideshow();
  slideImage('right');
});

leftButton.addEventListener('click', () => {
  stopSlideshow();
  slideImage('left');
});

function slideImage(direction) {
  if (direction === 'right') {
    currentIndex = (currentIndex + 1) % thumbnails.length;
  } else if (direction === 'left') {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
  }
  updateLargeImage(currentIndex);
}

thumbnailRow.addEventListener('mousemove', event => {
  const { left, width } = thumbnailRow.getBoundingClientRect();
  const hoverRegion = 400;
  const mouseX = event.clientX;

  if (mouseX - left < hoverRegion) {
    startAutoSlide('left');
  } else if (left + width - mouseX < hoverRegion) {
    startAutoSlide('right');
  } else {
    stopAutoSlide();
  }
});

thumbnailRow.addEventListener('mouseleave', stopAutoSlide);

function startAutoSlide(direction) {
  if (autoSlideInterval) return;

  autoSlideInterval = setInterval(() => {
    if (direction === 'right') {
      currentStartIndex = (currentStartIndex + 1) % thumbnails.length;
    } else if (direction === 'left') {
      currentStartIndex = (currentStartIndex - 1 + thumbnails.length) % thumbnails.length;
    }
    updateThumbnails();
  }, 300);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;
}

function updateThumbnails() {
  const visibleThumbnails = 10;
  for (let i = 0; i < thumbnails.length; i++) {
    const thumbnail = thumbnails[i];
    if (i >= currentStartIndex && i < currentStartIndex + visibleThumbnails) {
      thumbnail.style.display = 'block';
    } else {
      thumbnail.style.display = 'none';
    }
  }
}

playButton.addEventListener('click', () => {
  if (autoSlideInterval) {
      stopSlideshow();
      playButton.textContent = 'Play ▶';
  } else {
      startSlideshow();
      playButton.textContent = 'Pause ||';
  }
});

function startSlideshow() {
  autoSlideInterval = setInterval(() => {
      slideImage('right');
  }, 3000);
}

function stopSlideshow() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;
}