'use strict';

// Selecting buttons
const learnMoreButton = document.querySelector('.learn-more');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav-bar');
const header = document.querySelector('.hero-section');

document.querySelector('.nav-elements').addEventListener('click', function(e){
    e.preventDefault();

    if(e.target.classList.contains('nav-link')){
        const id = e.target.getAttribute('href');
        console.log(id);

        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});

learnMoreButton.addEventListener('click', function(e){
    const s1coords = section1.getBoundingClientRect();
    // Scrolling Functionality
    window.scrollTo({
    left:  s1coords.left + window.scrollX, 
    top: s1coords.top + window.scrollY,
    behavior: 'smooth'
   });
});

const handleHover = function(e){
    if(e.target.classList.contains('nav-link')){
        const links = nav.querySelectorAll(".nav-link");        links.forEach(el => {
            if(el !== e.target){
                el.style.opacity = this;
            }
    });
    };
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
    const [entry] = entries;
    if (window.innerWidth > 768) {
    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
    }
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allsections = document.querySelectorAll('.section');
// Reveal Sections
const revealSection = function(entries, observer){
    const [entry] = entries;
    if(!entry.isIntersecting) return

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}
const revealObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allsections.forEach(function(section){
    revealObserver.observe(section);
    section.classList.add('section--hidden');
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-product="true"]');

const loadingImg = function(entries, observer){
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadingImg, {
    root: null,
    threshold: 0,
    rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider

const slides = document.querySelectorAll('.slide');
const buttonLeft = document.querySelector('.slider__btn--left')
const buttonRight = document.querySelector('.slider__btn--right')

let currentSlide = 0;
const maxSlide = slides.length;


const goToSlide = function(slide){
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
}
goToSlide(0);


const nextSlide = function(){
    if(currentSlide === maxSlide - 1){
        currentSlide = 0;
    }else{
        currentSlide++;
    }

    goToSlide(currentSlide);
    activeDot(currentSlide);
}

const previousSlide = function(){
    if(currentSlide === 0){
        currentSlide = maxSlide - 1;
    }else{
        currentSlide--;
    }
   goToSlide(currentSlide); 
   activeDot(currentSlide);
}
// Going Next to Slide 
buttonRight.addEventListener('click', nextSlide);
buttonLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft'){
        previousSlide();
    }else if(e.key === 'ArrowRight'){
        nextSlide();
    }
})

// Dots Functionality
const dotContainer = document.querySelector('.dots');
const createDots = function(){
    slides.forEach(function(_, i){
        dotContainer.insertAdjacentHTML('beforeend', 
            `<button class="dots__dot" data-slide="${i}"></button>`
        )
    })
};
createDots();

const activeDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
activeDot(0);

dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
        currentSlide = Number(e.target.dataset.slide);
        goToSlide(currentSlide);
        activeDot(currentSlide);
    }
});

// Adding Responsiveness to navigation bar
const menuButton = document.querySelector('.menu-button');
const navElements = document.querySelector('.nav-elements');
menuButton.addEventListener('click', function(){
    if(navElements.classList.contains("active")){
        navElements.classList.remove("active");
    }else{
        navElements.classList.add("active");
    }
});
