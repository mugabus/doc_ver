/*
Template Name: ICGLR - Main
Description: Corporate HTML5 Template based on Bootstrap 5.
Version: 3.1
Author: Rafael Memmel - Wailo
Author URI: https://themeforest.net/user/wailothemes
*/

//===========================================================================================
//Functions
//===========================================================================================
//---------------------------------------------------------------------------------------
//Selector function
//---------------------------------------------------------------------------------------
const $ = (element) => document.querySelector(element);

//---------------------------------------------------------------------------------------
//Fade In
//---------------------------------------------------------------------------------------
function fadeIn(element, duration = 6000) {
  element.style.display = "inline";
  element.style.opacity = 0;
  var last = +new Date();
  var tick = function () {
    element.style.opacity =
      +element.style.opacity + (new Date() - last) / duration;
    last = +new Date();
    if (+element.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };
  tick();
}
//---------------------------------------------------------------------------------------
//Fade Out
//---------------------------------------------------------------------------------------
function fadeOut(element, duration = 100) {
  element.style.display = "inline";
  element.style.opacity = 1;
  var tick = function () {
    element.style.opacity = element.style.opacity - 0.1;
    if (+element.style.opacity > 0) {
      // requestAnimationFrame(tick)
      setTimeout(tick, duration);
    } else {
      element.style.display = "none";
    }
  };
  tick();
}

//===========================================================================================
//Vanilla Javascript
//===========================================================================================
document.addEventListener("DOMContentLoaded", function () {
  //---------------------------------------------------------------------------------------
  // Counter Up
  //---------------------------------------------------------------------------------------
  const count = document.querySelectorAll(".count");
  if (count.length) {
    let countFlag = false;
    window.addEventListener("scroll", () => {
      const counterOffset =
        document.querySelector("#counterUp").offsetTop - 500;
      if (window.pageYOffset > counterOffset) {
        if (!countFlag) {
          countFlag = true;
          count.forEach((element) => {
            let currentValue = 0;
            const targetValue = parseInt(element.innerText, 10);
            const duration = 3000;
            const increment = (targetValue / duration) * 10;
            const animation = setInterval(() => {
              currentValue += increment;
              element.innerText = Math.ceil(currentValue);
              if (currentValue >= targetValue) {
                clearInterval(animation);
              }
            }, 10);
          });
        }
      }
    });
  }

  //---------------------------------------------------------------------------------------
  //CSS Animations
  //---------------------------------------------------------------------------------------
  AOS.init();

  //---------------------------------------------------------------------------------------
  //WhatsApp Button && Scroll to Top
  //---------------------------------------------------------------------------------------
  var $whatsappButton = document.getElementById("whatsappButton");
  var $scrollToTop = document.getElementById("scrollToTop");

  if ($whatsappButton) {
    //Check to see if the window is top if not then display button
    window.addEventListener("scroll", function () {
      if (window.scrollY > 800 && $whatsappButton.style.opacity < 1) {
        fadeIn($whatsappButton);
        fadeIn(document.getElementById("scrollToTop"));
      }

      if (window.scrollY < 800 && $whatsappButton.style.opacity > 0) {
        fadeOut($whatsappButton);
        fadeOut(document.getElementById("scrollToTop"));
      }
    });
  }

  if ($scrollToTop) {
    //Check to see if the window is top if not then display button
    window.addEventListener("scroll", function () {
      if (window.scrollY > 800 && $scrollToTop.style.opacity < 1) {
        fadeIn($scrollToTop);
        fadeIn(document.getElementById("scrollToTop"));
      }

      if (window.scrollY < 800 && $scrollToTop.style.opacity > 0) {
        fadeOut($scrollToTop);
        fadeOut(document.getElementById("scrollToTop"));
      }
    });
  }

  //---------------------------------------------------------------------------------------
  //Header Shrink
  //---------------------------------------------------------------------------------------
  window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");
    navbar.classList.toggle("tiny", window.scrollY > 120);
  });
  //---------------------------------------------------------------------------------------
  //Nav Tabs
  //---------------------------------------------------------------------------------------
  document.addEventListener("click", function (event) {
    // If the clicked element does not have the .click-me class, ignore it
    if (event.target.matches(".nav-tabs li a")) {
      for (let sibling of event.target.parentNode.parentNode.children) {
        sibling.classList.remove("active");
      }
      event.target.parentNode.classList.add("active");
      event.target.classList.add("active");
    }
  });
  //---------------------------------------------------------------------------------------
  //Window Load Function
  //---------------------------------------------------------------------------------------
  window.addEventListener("load", function () {
    //---------------------------------------------------------------------------------------
    //Preloader
    //---------------------------------------------------------------------------------------
    if (document.getElementById("preloader"))
      fadeOut(document.getElementById("preloader"), 50);
  });

  //---------------------------------------------------------------------------------------
  //Accessible Lightbox Helpers
  //---------------------------------------------------------------------------------------
  function setupLightboxAccessibility(instance) {
    if (!instance || !instance.elements) {
      return;
    }

    instance.elements.forEach(function (item) {
      if (item && item.trigger) {
        var parentSection = item.trigger.closest("section");
        if (parentSection && parentSection.hasAttribute("aria-hidden")) {
          parentSection.removeAttribute("aria-hidden");
        }
      }
    });

    var inertTargets = [];
    var previouslyFocused = null;
    var DATA_ATTR = "data-lightbox-prev-inert";

    function setElementInert(element) {
      if (!element.hasAttribute(DATA_ATTR)) {
        element.setAttribute(
          DATA_ATTR,
          element.hasAttribute("inert") ? "true" : "false",
        );
      }
      if (!element.hasAttribute("inert")) {
        element.setAttribute("inert", "");
      }
      if ("inert" in element) {
        element.inert = true;
      }
    }

    function restoreElementInert(element) {
      var hadInert = element.getAttribute(DATA_ATTR);
      if (hadInert === "false") {
        element.removeAttribute("inert");
        if ("inert" in element) {
          element.inert = false;
        }
      }
      element.removeAttribute(DATA_ATTR);
    }

    instance.on("open", function () {
      previouslyFocused = document.activeElement;
      inertTargets = Array.prototype.filter.call(
        document.body.children,
        function (child) {
          return !child.classList.contains("glightbox-container");
        },
      );

      inertTargets.forEach(function (element) {
        setElementInert(element);
      });

      requestAnimationFrame(function () {
        var container = document.querySelector(".glightbox-container");
        if (container) {
          container.setAttribute("tabindex", "-1");
          container.focus();
        }
      });
    });

    instance.on("close", function () {
      inertTargets.forEach(function (element) {
        restoreElementInert(element);
      });
      inertTargets = [];

      var container = document.querySelector(".glightbox-container");
      if (container) {
        container.removeAttribute("tabindex");
      }

      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
      previouslyFocused = null;
    });
  }

  //---------------------------------------------------------------------------------------
  //GLightbox
  //---------------------------------------------------------------------------------------
  var glightboxOptions = {
    nav: false,
    navBar: false,
  };
  var lightbox = GLightbox({
    selector: ".gallery",
  });
  var lightboxDescription = GLightbox({
    selector: ".lightbox",
  });
  var lightboxInlineIframe = GLightbox({
    selector: ".webpage",
    moreLength: 0,
    autoplayVideos: true,
  });
  var lightboxVideo = GLightbox({
    selector: ".btn-ripple",
    skin: "clean without-arrows",
    autoplayVideos: true,
  });

  [lightbox, lightboxDescription, lightboxInlineIframe, lightboxVideo].forEach(
    setupLightboxAccessibility,
  );

  //---------------------------------------------------------------------------------------
  //Swiper Home
  //---------------------------------------------------------------------------------------
  // Function for initializing a slider with specific options
  function initializeSpecificSwiper(selector, swiperOptions) {
    if (document.querySelector(selector)) {
      new Swiper(selector, swiperOptions);
    }
  }

  // Background Slider
  let bgSwiperOptions = {
    loop: true,
    effect: "fade",
    speed: 2000,
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
  };

  // Main Slider
  let mainSwiperOptions = {
    loop: true,
    effect: "fade",
    allowTouchMove: false,
    speed: 2000,
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".main-slider-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".main-slider-button-next",
      prevEl: ".main-slider-button-prev",
    },
  };

  // Init bg-slider
  if (document.getElementById("bg-slider")) {
    initializeSpecificSwiper("#bg-slider", bgSwiperOptions);
  }

  // Init main-slider
  if (document.getElementById("main-slider")) {
    initializeSpecificSwiper("#main-slider .swiper", mainSwiperOptions);
  }

  // Function to initialize a slider with fully customizable options
  function initializeSwiper(
    selector,
    slidesPerView,
    breakpointsOptions,
    navigationOptions,
    paginationOptions,
  ) {
    const sliderElement = document.querySelector(selector);
    if (!sliderElement) return;
    const options = {
      slidesPerView: slidesPerView,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: breakpointsOptions,
    };
    if (navigationOptions) {
      options.navigation = {
        nextEl: navigationOptions.nextEl,
        prevEl: navigationOptions.prevEl,
      };
    }
    if (paginationOptions) {
      options.pagination = {
        el: paginationOptions.el,
        clickable: paginationOptions.clickable,
      };
    }
    new Swiper(selector, options);
  }

  // Common Settings
  const commonBreakpoints = {
    1024: { slidesPerView: 6 },
    768: { slidesPerView: 4 },
    481: { slidesPerView: 2 },
  };
  const commonNavigation = {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  };

  // Products Slider
  if (document.getElementById("products")) {
    initializeSwiper(
      "#products",
      1,
      { 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }, // Custom breakpoints
      null, // No navigation
      { el: ".products-pagination", clickable: true },
    );
  }

  // Products RTL Slider
  if (document.getElementById("products-rtl")) {
    initializeSwiper(
      "#products-rtl",
      1,
      { 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }, // Custom breakpoints
      null, // No navigation
      { el: ".products-pagination", clickable: true },
    );
  }

  // Products Slider
  if (document.getElementById("jobs")) {
    initializeSwiper(
      "#jobs",
      1,
      { 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }, // Custom breakpoints
      null, // No navigation
      { el: ".jobs-pagination", clickable: true },
    );
  }

  // Products RTL Slider
  if (document.getElementById("jobs-rtl")) {
    initializeSwiper(
      "#jobs-rtl",
      1,
      { 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }, // Custom breakpoints
      null, // No navigation
      { el: ".jobs-pagination", clickable: true },
    );
  }

  // News Slider
  if (document.getElementById("news")) {
    initializeSwiper(
      "#news",
      1,
      { 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }, // Custom breakpoints
      null, // No navigation
      { el: ".news-pagination", clickable: true },
    );
  }

  // News RTL Slider
  if (document.getElementById("news-rtl")) {
    initializeSwiper(
      "#news-rtl",
      1,
      { 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }, // Custom breakpoints
      null, // No navigation
      { el: ".news-pagination", clickable: true },
    );
  }

  // Clients LTL Slider
  if (document.getElementById("clients")) {
    initializeSwiper(
      "#clients .swiper",
      1,
      commonBreakpoints,
      commonNavigation,
      null, // No pagination
    );
  }

  // Clients LTL Slider
  if (document.getElementById("clients-rtl")) {
    initializeSwiper(
      "#clients-rtl .swiper",
      1,
      commonBreakpoints,
      commonNavigation,
      null, // No pagination
    );
  }

  //---------------------------------------------------------------------------------------
  //About Carousel
  //---------------------------------------------------------------------------------------
  // About LTL Slider
  let $aboutCarousel = document.getElementById("aboutCarousel");
  let $navAboutCarouselA = document.querySelectorAll(
    "#navAboutCarousel button",
  );
  if ($aboutCarousel) {
    let swiperOptions = {
      effect: "fade",
      speed: 600,
      fadeEffect: {
        crossFade: true,
      },
      rewind: true,
    };
    let swiperAboutCarousel = new Swiper("#aboutCarousel", swiperOptions).on(
      "slideChange",
      (swiper) => {
        $navAboutCarouselA[swiper.activeIndex].click();
      },
    );
    if ($navAboutCarouselA.length) {
      $navAboutCarouselA.forEach((element) => {
        element.addEventListener("click", function () {
          // Get the index of the clicked element
          let $elementsArray = document.querySelectorAll(
            "#navAboutCarousel .nav-item",
          );
          let index = null;
          //Get position of my active element
          $elementsArray.forEach((collectEl, indexEl) => {
            if (collectEl.children[0].classList.value === "nav-link active") {
              index = indexEl;
            }
          });
          swiperAboutCarousel.slideTo(index);
        });
      });
    }
  }

  // About RTL Slider
  let $aboutCarouselRtl = document.getElementById("aboutCarousel-rtl");
  let $navAboutCarouseRtllA = document.querySelectorAll(
    "#navAboutCarousel-rtl button",
  );
  if ($aboutCarouselRtl) {
    let swiperOptions = {
      effect: "fade",
      speed: 600,
      fadeEffect: {
        crossFade: true,
      },
      rewind: true,
    };
    let swiperAboutCarouselRtl = new Swiper("#aboutCarousel-rtl", swiperOptions)
      .changeLanguageDirection("rtl")
      .on("slideChange", (swiper) => {
        $navAboutCarouseRtllA[swiper.activeIndex].click();
      });
    //add Rtl
    let $aboutCarouselRtl = document.getElementById("aboutCarousel-rtl");
    $aboutCarouselRtl.parentNode.setAttribute("dir", "rtl");
    if ($navAboutCarouseRtllA.length) {
      $navAboutCarouseRtllA.forEach((element) => {
        element.addEventListener("click", function () {
          // Get the index of the clicked element
          let $elementsArray = document.querySelectorAll(
            "#navAboutCarousel-rtl .nav-item",
          );
          let index = null;

          //Get position of my active element
          $elementsArray.forEach((collectEl, indexEl) => {
            if (collectEl.children[0].classList.value === "nav-link active") {
              index = indexEl;
            }
          });

          swiperAboutCarouselRtl.slideTo(index);
        });
      });
    }
  }

  //---------------------------------------------------------------------------------------
  //Our history Carousel
  //---------------------------------------------------------------------------------------
  // Our history LTL Slider
  let $historyCarousel = document.getElementById("historyCarousel");
  let $navHistoryCarouselA = document.querySelectorAll("#navHistoryCarousel a");
  if ($historyCarousel) {
    let swiperOptions = {
      effect: "fade",
      speed: 600,
      fadeEffect: {
        crossFade: true,
      },
      rewind: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    };
    let swiperAboutCarousel = new Swiper("#historyCarousel", swiperOptions).on(
      "slideChange",
      (swiper) => {
        $navHistoryCarouselA[swiper.activeIndex].click();
      },
    );
    if ($navHistoryCarouselA.length) {
      $navHistoryCarouselA.forEach((element) => {
        element.addEventListener("click", function () {
          // Get the index of the clicked element
          let $elementsArray = document.querySelectorAll(
            "#navHistoryCarousel .nav-item",
          );
          let index = null;

          //Get position of my active element
          $elementsArray.forEach((collectEl, indexEl) => {
            if (collectEl.children[0].classList.value.includes("active")) {
              index = indexEl;
            }
          });

          swiperAboutCarousel.slideTo(index);
        });
      });
    }
  }

  // Our history RTL Slider
  let $historyCarouselRtl = document.getElementById("historyCarousel-rtl");
  let $navHistoryCarouselRtlA = document.querySelectorAll(
    "#navHistoryCarousel-rtl a",
  );
  if ($historyCarouselRtl) {
    let swiperOptions = {
      effect: "fade",
      speed: 600,
      fadeEffect: {
        crossFade: true,
      },
      rewind: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    };
    let swiperAboutCarousel = new Swiper("#historyCarousel", swiperOptions)
      .changeLanguageDirection("rtl")
      .on("slideChange", (swiper) => {
        $navHistoryCarouselRtlA[swiper.activeIndex].click();
      });
    let $swiperhistoryCarouselRtl = document.getElementById(
      "historyCarousel-rtl",
    );
    $swiperhistoryCarouselRtl.parentNode.setAttribute("dir", "rtl");
    if ($navHistoryCarouselRtlA.length) {
      $navHistoryCarouselRtlA.forEach((element) => {
        element.addEventListener("click", function () {
          // Get the index of the clicked element
          let $elementsArray = document.querySelectorAll(
            "#navHistoryCarousel-rtl .nav-item",
          );
          let index = null;
          //Get position of my active element
          $elementsArray.forEach((collectEl, indexEl) => {
            if (collectEl.children[0].classList.value.includes("active")) {
              index = indexEl;
            }
          });
          swiperAboutCarousel.slideTo(index);
        });
      });
    }
  }

  //---------------------------------------------------------------------------------------
  //Our team Carousel
  //---------------------------------------------------------------------------------------
  // Our team LTL Slider
  if (document.getElementById("team")) {
    let swiperOptions = {
      slidesPerView: 1,
      rewind: true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    };
    new Swiper("#team", swiperOptions);
  }

  // Our team RTL Slider
  if (document.getElementById("team-rtl")) {
    let swiperOptions = {
      slidesPerView: 1,
      rewind: true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    };
    new Swiper("#team-rtl", swiperOptions).changeLanguageDirection("rtl");
    //add rtl to parent
    let $teamRtl = document.getElementById("team-rtl");
    $teamRtl.parentNode.setAttribute("dir", "rtl");
  }

  //---------------------------------------------------------------------------------------
  //Video
  //---------------------------------------------------------------------------------------
  var $iframe = document.querySelectorAll("iframe");
  if ($iframe.length) {
    $iframe.forEach(function (el, index, father) {
      var ifr_source = el.src;
      var wmode = "?wmode=transparent";
      el.src = ifr_source + wmode;
    });
  }

  //---------------------------------------------------------------------------------------
  //Bootstrap Select - Vanilla js
  //---------------------------------------------------------------------------------------
  var select_box_element = document.querySelectorAll(
    ".form-select.corpboot-select",
  );
  if (select_box_element.length) {
    select_box_element.forEach((element) => {
      cbselect(element, {
        search: element.getAttribute("search") ?? false,
      });
    });
  }

  //---------------------------------------------------------------------------------------
  //Portfolio
  //---------------------------------------------------------------------------------------
  const $grid = document.querySelector("#grid");
  if ($grid) {
    let mixer = mixitup("#grid", {
      animation: {
        effects: "fade scale(0.5)",
      },
    });
  }

  const $grid_video = document.querySelector("#grid_video");
  if ($grid_video) {
    let mixer = mixitup("#grid_video", {
      selectors: {
        filter: ".filter_video",
      },
    });
  }

  const $grid_iframe = document.querySelector("#grid_iframe");
  if ($grid_iframe) {
    let mixer = mixitup("#grid_iframe", {
      selectors: {
        filter: ".filter_iframe",
      },
    });
  }

  const portfolioFiltersLiElements = document.querySelectorAll(
    ".portfolio-filters li",
  );
  //Add an event listener to each portfolio-filters li element to handle the click event
  portfolioFiltersLiElements.forEach((portfolioFiltersLiElement) => {
    portfolioFiltersLiElement.addEventListener("click", function () {
      //Remove classlists
      portfolioFiltersLiElements.forEach((portfolioElement) => {
        portfolioElement.classList.remove("active");
      });
      // Add the active class to the current element and remove it from all of its siblings
      this.classList.add("active");
    });
  });

  //---------------------------------------------------------------------------------------
  //Contact Form
  //---------------------------------------------------------------------------------------
  const contactForm = document.querySelector("#contactform");
  const alertForm = document.querySelector("#alertform");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Validate the contact form
      if (!validate(this, alertForm)) {
        return;
      }
    });
  }

  //---------------------------------------------------------------------------------------
  //Bootstrap Tooltip
  //---------------------------------------------------------------------------------------
  let tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
