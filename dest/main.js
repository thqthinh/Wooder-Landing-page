const headerToggle = document.querySelector(".header__toggle");
const headerMenuItem = document.querySelectorAll(
  ".header__menu .header__menu-item a"
);
const navMobile = document.querySelector(".nav");
const overlayNav = document.querySelector(".nav .overlay");
let headerLang = document.querySelector(".header__lang");
let langCurrent = document.querySelector(".header__lang-current span");
const headerDropdown = document.querySelector(
  ".header__lang .header__lang-dropdown"
);
let langOtp = document.querySelectorAll(".header__lang-dropdown span");

const closeMenuMobile = document.querySelector(".nav__close");
const header = document.querySelector(".header");
const slider = document.querySelector(".slider");
const sliderHeight = slider.offsetHeight;
const headerHeight = header.offsetHeight;
let sections = [];

function removeActiveMenu() {
  headerMenuItem.forEach((item) => item.classList.remove("active"));
}
langOtp.forEach((item) => {
  item.addEventListener("click", function () {
    let langOtpText = this.textContent;
    let langCurrentSpan = langCurrent.textContent;
    langCurrent.innerHTML = langOtpText;
    this.innerHTML = langCurrentSpan;
  });
});
headerToggle.addEventListener("click", function () {
  this.classList.toggle("is-selected");
  navMobile.classList.toggle("active");
  overlayNav.addEventListener("click", function () {
    navMobile.classList.remove("active");
    headerToggle.classList.remove("is-selected");
  });
});

headerMenuItem.forEach((item) => {
  let className = item.getAttribute("href").replace("#", "");
  let section = document.querySelector("." + className);
  sections.push(section);
  item.addEventListener("click", function (e) {
    let position = section.offsetTop;
    e.preventDefault();
    removeActiveMenu();
    this.classList.add("active");
    window.scrollTo({ top: position - headerHeight + 1, behavior: "smooth" });
  });
});
headerLang.addEventListener("click", function () {
  headerLang.classList.toggle("active");
});

const sliderItem = document.querySelectorAll(".slider__item");
const nextBtn = document.querySelector(".slider__bottom-ctr .--next");
const prevBtn = document.querySelector(".slider__bottom-ctr .--prev");
const dots = document.querySelectorAll(".dot");
let numbOfPage = document.querySelector(".slider__bottom .numb");
let indexSlider = 0;
console.log(numbOfPage);
sliderItem.forEach((item, index) => {
  if (item.classList.contains("active")) {
    indexSlider = index;
  }
});
function displaySlider(index) {
  sliderItem[indexSlider].classList.remove("active");
  sliderItem[index].classList.add("active");
  dots[indexSlider].classList.remove("active");
  dots[index].classList.add("active");
  indexSlider = index;
}

nextBtn.addEventListener("click", function () {
  if (indexSlider < sliderItem.length - 1) {
    displaySlider(indexSlider + 1);
    // sliderItem[indexSlider].classList.remove("active");
    // sliderItem[indexSlider + 1].classList.add("active");
    // dots[indexSlider].classList.remove("active");
    // dots[indexSlider + 1].classList.add("active");
    // indexSlider++;
  } else {
    displaySlider(0);

    // sliderItem[indexSlider].classList.remove("active");
    // sliderItem[0].classList.add("active");
    // dots[indexSlider].classList.remove("active");
    // dots[0].classList.add("active");
    // indexSlider = 0;
  }
  numbOfPage.textContent = `0${indexSlider + 1}`.slice(-2);
});
prevBtn.addEventListener("click", function () {
  if (indexSlider > 0) {
    displaySlider(indexSlider - 1);

    // sliderItem[indexSlider].classList.remove("active");
    // sliderItem[indexSlider - 1].classList.add("active");
    // dots[indexSlider].classList.remove("active");
    // dots[indexSlider - 1].classList.add("active");
    // indexSlider--;
  } else {
    displaySlider(sliderItem.length - 1);

    // sliderItem[indexSlider].classList.remove("active");
    // sliderItem[sliderItem.length - 1].classList.add("active");
    // dots[indexSlider].classList.remove("active");
    // dots[sliderItem.length - 1].classList.add("active");
    // indexSlider = sliderItem.length - 1;
  }
  numbOfPage.textContent = `0${indexSlider + 1}`.slice(-2);
});
dots.forEach((item, index) => {
  item.addEventListener("click", function (e) {
    dots.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
    displaySlider(index);
    // sliderItem[indexSlider].classList.remove("active");
    // sliderItem[index].classList.add("active");
    // indexSlider = index;
  });
});

window.addEventListener("scroll", function (e) {
  let scrollY = window.scrollY;
  sections.forEach((section, index) => {
    if (
      scrollY > section.offsetTop - headerHeight &&
      scrollY < section.offsetTop + section.offsetHeight
    ) {
      removeActiveMenu();
      headerMenuItem[index].classList.add("active");
    } else {
      headerMenuItem[index].classList.remove("active");
    }
  });
  if (scrollY > sliderHeight - headerHeight) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

const backToTop = document.querySelector(".footer__backtotop");
backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let playButton = document.querySelectorAll(".video .item");
let popupVideo = document.querySelector(".popup-video");
let closeVideo = document.querySelector(".popup-video .close");
let iframeVideo = document.querySelector(".iframe_wrap iframe");
let overlay = document.querySelector(".popup-video");
playButton.forEach((button) => {
  button.addEventListener("click", function () {
    let videoId = button.getAttribute("data-video-id");

    popupVideo.style.display = "flex";
    iframeVideo.setAttribute(
      "src",
      `https://www.youtube.com/embed/` + videoId + `?autoplay=1`
    );
  });
});
closeVideo.addEventListener("click", function () {
  popupVideo.style.display = "none";
  iframeVideo.setAttribute("src", "");
});

overlay.addEventListener("click", function () {
  popupVideo.style.display = "none";
  iframeVideo.setAttribute("src", "");
});

const tabItem = document.querySelectorAll(".news__tabs .news__tabs-item");
const tabContent = document.querySelectorAll(".news__contents .news__lists");
tabItem.forEach((item) => {
  item.addEventListener("click", function (e, index) {
    const tabData = item.dataset.tab;
    tabItem.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
    tabContent.forEach((item) => item.classList.remove("active"));
    tabContent[tabData - 1].classList.add("active");
  });
});

// let accordionTitle = document.querySelectorAll(".accordion__title");
// let accordionContent = document.querySelectorAll(".accordion__content");
// accordionTitle.forEach((item) => {
//   item.addEventListener("click", function (e) {
//     const content = this.nextElementSibling;
//     // content.style.height = "80px";
//     accordionContent.forEach((item) => item.classList.remove("active"));

//     content.classList.toggle("active");
//   });
// });

var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute("data-size").split("x");
      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };
      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src");
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    var eTarget = e.target || e.srcElement;
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });
    if (!clickedListItem) {
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function (
    index,
    galleryElement,
    disableAnimation,
    fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    options = {
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
    };
    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};
initPhotoSwipeFromDOM(".carousel-img");
$(document).ready(function () {
  let $carousel = $(".slider-carousel");
  $carousel.flickity({
    // options
    cellAlign: "left",
    contain: true,
    draggable: true,
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true,
  });
  $(".slider__bottom-ctr .--prev").on("click", function () {
    $carousel.flickity("previous");
  });
  // previous wrapped
  $(".slider__bottom-ctr .--next").on("click", function () {
    $carousel.flickity("next");
  });
  // let $carouselBottom = $(".slider-bottom");
  // $carouselBottom.flickity({
  //   draggable: true,
  //   prevNextButtons: false,
  //   wrapAround: true,
  // });

  let accordionTitle = $(".accordion__title");
  let accordionContent = $(".accordion__content");
  accordionTitle.on("click", function () {
    accordionTitle.next().slideUp(200);
    accordionTitle.removeClass("active ");
    if ($(this).next().css("display") == "none") {
      $(this).addClass("active");
    }
    $(this).next().stop().slideToggle(200);
  });
  let $carouselBottom = $(".slider-bottom");
  $carouselBottom.flickity({
    // options
    cellAlign: "left",
    contain: true,
    draggable: true,
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true,
  });
});
