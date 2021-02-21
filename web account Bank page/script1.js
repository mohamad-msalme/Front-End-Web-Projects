'use strict';
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navContainerLinks = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const logo = document.querySelector('.nav__logo');
const btnScroll = document.querySelector('.btn--scroll-to');

const sections = document.querySelectorAll('.section');
const imges = document.querySelectorAll('img[data-src]');

const tabContainer = document.querySelector('.operations__tab-container');
const tabBtns = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');

const btnsOpenAcc = document.querySelectorAll('.btn--show-modal');
const btnClose = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsAcc = [...btnsOpenAcc, btnClose, overlay];

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnGoToleft = document.querySelector('.slider__btn--left');
const btnGoToRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

const helperFunctions = {
  handelEvents() {
    this.cookieMsg(); //Create cookie Msg
    //handel open Account Button
    btnsAcc.forEach(btn => btn.addEventListener('click', this.btnsAcc));
    window.addEventListener('keydown', e =>
      e.key == 'Escape' && !modal.classList.contains('hidden')
        ? this.btnsAcc()
        : false
    );

    tabContainer.addEventListener('click', this.clickTab);
    handelNav.navEvents();
    handelRevel.revelEvents();
    handelSlider.slideEvents();
    window.scrollTo(0, 0); // Every relod sctoll To top
  },
  btnsAcc() {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
  },
  cookieMsg() {
    const msg = document.createElement('div');
    const html =
      'We use cookied for improve functionality and aalytics. <button class = btn btn-close-cookie>Got it!</button> ';
    msg.innerHTML = html;
    msg.classList.add('cookie-message');
    header.insertAdjacentElement('beforeend', msg);
    msg.style.height = `${
      Number.parseFloat(getComputedStyle(msg).height, 10) + 25
    }px`;
    msg.querySelector('.btn').addEventListener('click', () => msg.remove());
  },
  clickTab(e) {
    if (!e.target.classList.contains('btn')) return;

    const btnTab = e.target.closest('.btn');
    const btnTabNum = btnTab.dataset.tab - 1;
    const activeContent = operationsContent[btnTabNum];
    // Remove Active BtnTab and Content
    tabBtns.forEach(btn => btn.classList.remove('operations__tab--active'));
    operationsContent.forEach(op =>
      op.classList.remove('operations__content--active')
    );
    // Add Active To button Tab and Content
    activeContent.classList.add('operations__content--active');
    btnTab.classList.add('operations__tab--active');
  },
};
const handelNav = {
  opacityOver: 0.6,
  opacityOut: 1,
  navEvents() {
    this.navSticky();

    navContainerLinks.addEventListener('click', this.navClick);
    btnScroll.addEventListener('click', this.navClick);

    navContainerLinks.addEventListener(
      'mouseover',
      this.navHover.bind(this.opacityOver)
    );

    navContainerLinks.addEventListener(
      'mouseout',
      this.navHover.bind(this.opacityOut)
    );
  },
  navHover(e) {
    const element = e.target;
    if (!element.classList.contains('nav__link')) return;

    navLinks.forEach(item => {
      if (item !== element) {
        item.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  },
  navClick(e) {
    e.preventDefault();
    if (!e.target.dataset.set) return;

    const options = { behavior: 'smooth' };
    const section = sections[Number.parseInt(e.target.dataset.set, 10) - 1];
    section.scrollIntoView(options);
  },
  navSticky() {
    const options = {
      root: null,
      threshold: 0,
      rootMargin: `-90px`,
    };
    const obsCallFun = entries => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        nav.classList.remove('sticky');
      } else {
        nav.classList.add('sticky');
      }
    };
    const observer = new IntersectionObserver(obsCallFun, options);
    observer.observe(header);
  },
};

const handelRevel = {
  options: {
    root: null,
    threshold: 0.13,
  },

  revelEvents() {
    sections.forEach(sec => sec.classList.add('section--hidden'));
    this.revelSec();
    this.revelImg();
  },
  revelSec() {
    const obsCallFun = entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        entry.target.classList.remove('section--hidden');
      } else {
        entry.target.classList.add('section--hidden');
      }
    };

    const observer = new IntersectionObserver(obsCallFun, this.options);
    sections.forEach(sec => observer.observe(sec));
  },
  revelImg() {
    const obsCallFun = (entries, observer) => {
      const [entry] = entries;
      if (!entry.isIntersecting) return 0;

      const img = entry.target;
      img.src = img.dataset.src;
      img.addEventListener('load', () => img.classList.remove('lazy-img'));
      observer.unobserve(img);
    };

    const observer = new IntersectionObserver(obsCallFun, this.options);
    imges.forEach(img => observer.observe(img));
  },
};
const handelSlider = {
  maxSlids: slides.length,

  slideEvents() {
    this.currSlid = 0; // Default First Slide
    btnGoToRight.addEventListener('click', this.btnNxtSlide.bind(handelSlider));
    btnGoToleft.addEventListener('click', this.btnPrevSlide.bind(handelSlider));
    dotsContainer.addEventListener('click', this.btnDots.bind(handelSlider));
    window.addEventListener('keydown', this.btnArrow.bind(handelSlider));
    this.createDots();
    this.goToSlide();
  },
  createDots() {
    slides.forEach((_, ind) =>
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="dots__dot" data-set = ${ind}> </div>`
      )
    );
  },
  activeDots() {
    const dots = [...dotsContainer.children];
    dots.forEach(dot => dot.classList.remove('dots__dot--active'));
    dots[this.currSlid].classList.add('dots__dot--active');
  },
  btnArrow(e) {
    e.key == 'ArrowRight' && this.btnNxtSlide();
    e.key == 'ArrowLeft' && this.btnPrevSlide();
  },
  btnDots(e) {
    if (!e.target.classList.contains('dots__dot')) return;

    this.currSlid = Number.parseInt(e.target.dataset.set);
    this.goToSlide();
  },
  btnNxtSlide() {
    if (this.currSlid !== this.maxSlids - 1) this.currSlid++;
    else this.currSlid = 0;
    this.goToSlide();
  },
  btnPrevSlide() {
    if (this.currSlid) this.currSlid--;
    else this.currSlid = this.maxSlids - 1;
    this.goToSlide();
  },
  goToSlide() {
    slides.forEach(
      (slid, i) =>
        (slid.style.transform = `translate(${100 * (i - this.currSlid)}%)`)
    );
    this.activeDots();
  },
};
helperFunctions.handelEvents();
