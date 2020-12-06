'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');

const nav = document.querySelector('nav');

const tabs = document.querySelector('.operations__tab-container');
const contents = [...document.querySelectorAll('.operations__content')];

const logo = document.querySelector('.nav__logo');
const navLinks = nav.querySelectorAll('.nav__link');
const navElements = [logo, ...navLinks];

const sections = document.querySelectorAll('.section');

const imgs = document.querySelectorAll('img[data-src]')

const slids = document.querySelectorAll('.slide')

const leftSlidBtn = document.querySelector('.slider__btn--left');

const rightSlideBtn = document.querySelector('.slider__btn--right');

const slidsBtns = [leftSlidBtn, rightSlideBtn];

const dotsContainer = document.querySelector('.dots');
/*

*/

// Obkect for handel all Intersection Events 
////////////////////////////////////////////////////
const handlObserverEvents = {
  // inite instersection Events 
  initObservEvent: function() {
    this.makeNavSticky();
    this.makeSectionsRevel();
    this.makeImgLazy();
    sections.forEach( section=>
      section.classList.add('section--hidden'));
  },

  makeNavSticky: () => {

    const options = {
      root: null,
      threshold: 0,
      rootMargin: '-90px'
    }

    const stickyNav = function([entry] = entries) {
      console.log(entry)
      if( !entry.isIntersecting) {
        entry.target.firstElementChild.classList.add('sticky');
      }else {
        entry.target.firstElementChild.classList.remove('sticky');
      }
    }

    const headerObser =new IntersectionObserver(stickyNav, options);
    headerObser.observe(header); 
  },

  makeSectionsRevel: () => {

    const revelSec = ([entry] = entries)=> {
      if( !entry.isIntersecting) return;
      
      entry.target.classList.remove('section--hidden'); 
      setTimeout( () => 
        entry.target
        .style.transform = 'translateY(10rem)' ,300) 
    }

    const options = {
      root: null,
      threshold: 0.01,
    };

    const secObserve = new IntersectionObserver(revelSec, options);
    sections.forEach( section => secObserve.observe(section));
  },

  makeImgLazy: () => {

    const callBack = ([entry] = entries)=> {
      console.log(entry)

      const img = entry.target;

      if( !entry.isIntersecting) return;

      img.src = img.dataset.src;

      img.addEventListener('load', function(){
          this.classList.remove('lazy-img')
        })

      imgObserve.unobserve(entry.target);
    }

    const options = {
      root: null,
      threshold: 0.1,
    }

    const imgObserve = new IntersectionObserver(callBack, options)
    imgs.forEach( img=> imgObserve.observe(img));
  }
}

// Object for handle All mouse Events 
////////////////////////////////////////////////////////

const handleMouseEvents = {

  initMouseEvents: function() {
    this.initClkEvents();
    this.clkOnSlider.initEventSlider();
    nav.addEventListener('mouseover', this.hoverNavbtns.bind(0.5))
    nav.addEventListener('mouseout',  this.hoverNavbtns.bind(1) )

  },

  initClkEvents: function(){
    btnCloseModal.addEventListener('click', this.clkCloseAccbtns);
    overlay.addEventListener('click', this.clkCloseAccbtns);
    header.addEventListener('click', this.clkNavbtns);
    tabs.addEventListener('click', this.clkTabsbtns);

    btnsOpenModal.forEach( btn =>
      btn.addEventListener('click', this.clkOpenAccbtns)
    );

    document.addEventListener('keydown', (e) =>{
      if( 
        e.key === 'Escape' &&
        !modal.classList.contains('hidden')
        ){ this.clkCloseAccbtns(e); }
        else if( e.key === 'ArrowLeft'){
          this.clkOnSlider.prevSlide();}
        else if( e.key === 'ArrowRight'){
          this.clkOnSlider.nxtSlide()
        }
      })
  },

  clkOpenAccbtns: (e) => {
      e.preventDefault()
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
  },
  
  clkCloseAccbtns: (e) => {
    e.preventDefault()
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  },

  clkNavbtns: (e) => {// Smoth Scrolling 
    // Prevent Default
    e.preventDefault();
    // check   
    if ( e.target.classList.contains('btn--scroll-to') ||
         e.target.classList.contains('nav__link')
         ) {
        const section = document.querySelector(e.target.dataset.set)
        section.scrollIntoView({behavior: 'smooth'})
        console.log(section.style.transform) 
      }
    
  },

  hoverNavbtns: function(e) {
    const link = e.target;
  
    if(!link.classList.contains('nav__link')) return; 
  
    navElements.forEach( navEle => 
      navEle !== link ? navEle.style.opacity = this : 0);
  },

  clkTabsbtns: function(e) {

    const tab = e.target.closest(".operations__tab");
    
    if(!tab) return;
    // Get Tab Number
    const tabNum = tab.getAttribute('data-tab') - 1;
    // Remove Both 
    contents
    .forEach( content =>
       content.classList.remove('operations__content--active'));
  
    [...this.children]
    .forEach( tab =>
       tab.classList.remove('operations__tab--active'));
    //Add active 
    tab.classList.add('operations__tab--active')
    contents[tabNum].classList.add('operations__content--active');
  },

  clkOnSlider: {
    maxSlides: slids.length - 1,
    currentSlide:  0, 

    initEventSlider: function(){
      //Inite Event Listner 
      leftSlidBtn
      .addEventListener('click', this.prevSlide.bind(handleMouseEvents.clkOnSlider));
      rightSlideBtn
      .addEventListener('click', this.nxtSlide.bind(handleMouseEvents.clkOnSlider));

      dotsContainer
      .addEventListener('click', (e)=>{
        if( e.target.classList.contains('dots__dot'))
          this.goToSlide(e.target.dataset.set);
        })

      this.creatDots();
      this.goToSlide(this.currentSlide);
    },

    activeDot: function(slideNum) {
      const dots = [...dotsContainer.children];
    //Add Active For Specific Dot 
      dots.forEach( dot =>
        dot.dataset.set == slideNum ? 
        dot.classList.add('dots__dot--active')
        :dot.classList.remove('dots__dot--active'))
    },
    
    nxtSlide: function() {
      ++this.currentSlide > this.maxSlides ? this.currentSlide = 0 : 0 ;
      this.goToSlide(this.currentSlide);
    },
    
    prevSlide: function() {
      --this.currentSlide < 0 ? this.currentSlide = this.maxSlides : 0;
      this.goToSlide(this.currentSlide);
    },

    goToSlide: function(slideNum) {
      this.activeDot(slideNum);
      slids.forEach( (slide, i) => 
        slide.style.transform = `translateX(${  (i - slideNum)*100}%)`);
    }, 

    creatDots: function(){
      slids.forEach( (_, i) => {
        const html = `<div class="dots__dot" data-set = ${i}> </div>`;
        dotsContainer.insertAdjacentHTML('beforeend', html);
      })
    },
  },
};

const handleLoadEvent = {

  init: function() {
    handleMouseEvents.initMouseEvents();
    handlObserverEvents.initObservEvent();
    this.creatNewEle()
  },

  creatNewEle: () => {
    // Add cookirs Message to DOM tree and Style it 
    // Create message Element With Text
    const msg = document.createElement('div');
    msg.append('We use cookied for improve functionality and aalytics.');
    // Create Button Element with Owner Text
    const button = document.createElement('button');
    button.append('Got it!');
    //Add class to Msg and Button Element 
    msg.classList.add('cookie-message');
    button.classList.add('btn', 'btn-close-cookie');
    // Add msg and buttom to DOM 
    msg.appendChild(button);
    header.append(msg);
    /*
    const msg = 'We use cookied for improve functionality and aalytics.<button class="btn btn-close-cookie"> Got it! </button>
    header.append(msg);
    */
    // Style cookies Message 
    msg.style.height = Number.parseFloat(getComputedStyle(msg).height) + 20 + 'px'
    msg.style.width = '120%'
    msg.style.backgroundColor = '#37383d';
    button.addEventListener('click', () => msg.remove());

  }
}

window.onload = handleLoadEvent.init.bind(handleLoadEvent);


