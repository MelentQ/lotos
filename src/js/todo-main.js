import * as bodyScrollLock from "body-scroll-lock";
import percentageSeen from './components/percentageSeen';

$(window).on("load", function() {
  $(".page_preloader").addClass("page_preloader--hidden");
  if(!window.matchMedia("(max-width: 1199px)").matches) {
      $(".header").addClass("loaded");
  }

  // Car animation
  const videoContainer = document.querySelector('.car_video');
  if (videoContainer) {
    $(".car_video").addClass("loaded")
    initCarAnimation();
    //   var carImage = new Image();
    //   carImage.src = videoContainer.dataset.src1;
    //   carImage.onload = function() {
    //       var carImage2 = new Image();
    //       carImage2.src = videoContainer.dataset.src2;
    //       carImage2.onload = function() {
    //         // $(".car_video>svg").html(($(".car_video svg").html())+`
    //         //   <foreignObject x="0" y="0" width="1680" height="1050">
    //         //     <video id="video-1" xmlns="http://www.w3.org/1999/xhtml" width="1680" height="1050" controls="">
    //         //         <source src="${videoContainer.dataset.src2}" type="video/mp4" />
    //         //     </video>
    //         //     </foreignObject>
    //         //   `);
    //         //   $(".car_video>svg").html(($(".car_video svg").html())+`
    //         //   <foreignObject x="0" y="0" width="1680" height="1050">
    //         //     <video id="video-1" xmlns="http://www.w3.org/1999/xhtml" width="1680" height="1050" controls="">
    //         //         <source src="${videoContainer.dataset.src2}" type="video/mp4" />
    //         //     </video>
    //         //     </foreignObject>
    //         //     <image class="bg-car-img" width="1680" height="1050" xlink:href="${videoContainer.dataset.src2}" />
    //         //   `);
    //           $(".car_video").addClass("loaded")
    //           initCarAnimation();
    //       }
    //   }
  }
  function initCarAnimation() {
      const boxTopLeft = [600, 300];
      const boxHeight = 450;
      const boxWidth = 800;

      var img = $(".car_video #video-1")[0];
      var rect = $(".car_video circle")[0];

      let outOfBox = false;

      const text = document.querySelector('.circle-text-car');
      const circle = document.querySelector('.circle-center');

      window.addEventListener("mousemove", function (e) {
          var imgPos = img.getBoundingClientRect();
          var imgX = imgPos.left;
          var imgY = imgPos.top;
          
          if (e.clientX - imgX < boxTopLeft[0] + boxWidth && e.clientX - imgX > boxTopLeft[0] && e.clientY - imgY + $(".car_video").offset().top - $(window).scrollTop() < boxTopLeft[1] + boxHeight && e.clientY - imgY + $(".car_video").offset().top - $(window).scrollTop() > boxTopLeft[1]) {
            rect.setAttribute("cx", e.clientX - imgX);
            rect.setAttribute("cy", e.clientY - imgY + $(".car_video").offset().top - $(window).scrollTop());
            text.style.left = `${(e.clientX - imgX) / 16.8}%`
            text.style.top = `${(e.clientY - imgY + $(".car_video").offset().top - $(window).scrollTop()) / 10.5}%`;
            circle.style.left = `${(e.clientX - imgX) / 16.8}%`
            circle.style.top = `${(e.clientY - imgY + $(".car_video").offset().top - $(window).scrollTop()) / 10.5}%`;

            if (outOfBox) {
                rect.setAttribute("r", 150);
                outOfBox = false;
            }
          } else {
            rect.setAttribute("r", 50);
            outOfBox = true;
          }
      }, false);
      
      var $car = $(".car_video");
      var $hideCarVideo = $("[data-hide-car]");
      $(window).scroll(function() {
          var scrollTop = $(window).scrollTop();
          if(window.matchMedia("(max-width: 1199px)")) {
              var xTranslate = scrollTop / 4;
              if(xTranslate < 800) {
                  $car.css("transform", "translate("+xTranslate+"px, 0px)");
              }
          } else {
              var xTranslate = scrollTop / 2;
              if(xTranslate < 800) {
                  $car.css("transform", "translate("+xTranslate+"px, 0px)");
              }
          }
          if(scrollTop > $hideCarVideo.offset().top - (window.innerHeight / 2)) {
              $car.css("opacity", "0");
          } else {
              $car.css("opacity", "1");
          }
          if(scrollTop > 0) {
              $(".car_video__mark").addClass("disabled");
              text.classList.add('hide');
              circle.classList.add('hide');
          } else {
              $(".car_video__mark").removeClass("disabled");
              text.classList.remove('hide');
              circle.classList.remove('hide');
          }
          if(scrollTop > 60) {
              $(".car_video").addClass("car_video--filled");
          } else {
              $(".car_video").removeClass("car_video--filled");
          }
      });
      $(document).on("mouseenter", ".car_video__mark, .car_video__mark_content", function(e) {
          $(this).closest(".car_video__mark").addClass("active");
          rect.setAttribute("r", 200);
          text.classList.add('hidden');
          circle.classList.add('hidden');
      });
      $(document).on("mouseleave", ".car_video__mark, .car_video__mark_content", function(e) {
          $(this).closest(".car_video__mark").removeClass("active");
          rect.setAttribute("r", 150);
          text.classList.remove('hidden');
          circle.classList.remove('hidden');
      });
      function setMarkPositions() {
        //   $(".car_video__mark[data-positioned=true]").each(function() {
        //       $(this).attr("data-positioned", "false");
        //       $(this).css({
        //           left: "",
        //           top: "",
        //           position: "",
        //       });
        //       $(".car_video").append($(this));
        //   });
        //   $(".car_video__mark:not([data-positioned=true])").each(function() {
        //       var offset = $(this).offset();
        //       $(this).css({
        //           left: offset.left+"px",
        //           top: offset.top+"px",
        //           position: "fixed",
        //       });
        //       $(this).attr("data-positioned", "true");
        //       $("body").append($(this));
        //   });
        const marks = Array.from(document.querySelectorAll('.car_video__mark'));
        const marksContainer = document.querySelector('.marks');
        if (marksContainer) {
            marks.forEach(mark => {
                const top = Number(mark.querySelector('.car_video_coord_top').textContent);
                const right = Number(mark.querySelector('.car_video_coord_right').textContent);
    
                mark.style.top = `${top}px`;
                mark.style.right = `${right}px`;
            })
        }
      }
      setMarkPositions();
      $(window).resize(setMarkPositions);
      $(window).trigger("scroll");
  }
  // Car animation END
});

$(document).ready(function() {
  $(".js-first-block").css("padding-top", $(".header").outerHeight()+"px");
  $(window).resize(function() {
      $(".bannerContainer").css("padding-top", $(".header").outerHeight()+"px");
  });

  if (document.querySelector('.error-page')) {
    document.querySelector('.footer__content').classList.add('animated');
  } else {
    $(window).scroll(function() {
        // Footer animation
        var $footer = $(".footer");
        var $footerContent = $(".footer__content");
  
        if($(window).scrollTop() + $(window).height() > $(document).height() - $footer.outerHeight()) {
            $footerContent.addClass("animated")
        } else {
            $footerContent.removeClass("animated")
        }
        // Footer animation END
    });
  }
});

// Features animation
$(window).scroll(function() {
  featuresAnimation();
});
$(document).ready(function() {
  featuresAnimation();
//   initScroll();
});
function featuresAnimation() {
  $("[data-feature-anim-scale]").each(function() {
      var seenPercent = percentageSeen($(this)[0]);
      if(seenPercent <= 25) {
          $(this).css("transform", "scale(0.8)");
      } else {
          $(this).css("transform", "scale(1)");
      }
  });
}
// Features animation END

// Scrollbar
function initScroll() {
  $(".scrollbar:not(.ps)").each(function (idx, el) {
      var ps = new PerfectScrollbar(el, {
          wheelPropagation: $(this)[0].hasAttribute("data-propagation"),
          maxScrollbarLength: 600,
      });

      // Фикс бага с бесконечным скроллом вниз
      if ($(this).hasClass("popup__scroll")) {
          this._getBoundingClientRect = this.getBoundingClientRect;
          this.getBoundingClientRect = function () {
              const original = this._getBoundingClientRect();
              return Object.assign({}, original, {
                  height: Math.round(original.height),
              });
          };
      }

      $(this).data("ps", ps);
      $(el).scrollTop(2).scrollTop(0);
  });
}
// Scrollbar END

// Анимация якорных ссылок
$(document).on("click", "a[href^='#']", function(e) {
  e.preventDefault();
  var id = $(this).attr("href");
  var top = $(id).offset().top - $(".header").outerHeight();
  $('html,body').animate({scrollTop: top},'slow');
});
// Анимация якорных ссылок END

// Меню в мобилке
if (document.documentElement.clientWidth <= 1024) {
    $(document).on("click", "[data-open-menu]", function(e) {
    e.preventDefault();
    bodyScrollLock.disableBodyScroll($(".mob_menu")[0]);
    $(".mob_menu").addClass("active");
    });
    $(document).on("click", "[data-close-menu]", function(e) {
    e.preventDefault();
    bodyScrollLock.enableBodyScroll($(".mob_menu")[0]);
    $(".mob_menu").removeClass("active");
    });
    $(document).on("click", ".mob_menu__link", function(e) {
    var $parent = $(this).closest(".mob_menu__item");
    var $submenu = $parent.find(".mob_menu__sublist");
    if($submenu.length) {
        e.preventDefault();
        $submenu.slideToggle();
        $(this).toggleClass("active");
    }
    });
}
// Меню в мобилке END

const mobOpenPopupBtn = document.querySelector('.mob_menu__button');
mobOpenPopupBtn.addEventListener('click', () => {
    $(".mob_menu").removeClass("active");
    bodyScrollLock.enableBodyScroll($(".mob_menu")[0]);
})

function togglePseudoSelect() {
  const container = document.querySelector('.js-toggle-pseudo-select');
  if (container) {
      const btn = container.querySelector('.js-button');
      const content = container.querySelector('.js-content');

      btn.addEventListener('click', () => {
          content.classList.toggle('active');
      })

      window.addEventListener('click', e => {
          const target = e.target
          if (!target.closest('.js-button') && !target.closest('.js-content')) {
              content.classList.remove('active');
          }
      })
  }
}

function toggleShowText() {
  const container = document.querySelector('.js-toggle-show-text-container');
  if (container) {
      const btn = container.querySelector('.js-toggle-show-text-button');
      const content = container.querySelector('.js-toggle-show-text');

      let isOpened = false;

      btn.addEventListener('click', () => {
          isOpened = !isOpened;

          if(isOpened) {
              content.classList.add('active');
              btn.textContent = "Скрыть"
          } else {
              content.classList.remove('active');
              btn.textContent = "Раскрыть"
          }
      })
  }
}

function toggleProductOrderButton() {
  const btnDesktop = document.querySelector('.productDetail__button--desktop');
  const btnMobile = document.querySelector('.productDetail__button--mobile');

  if (document.documentElement.clientWidth < 640) {
    if (btnDesktop && btnMobile) {
        const toggleY = 400;
  
        window.addEventListener('scroll', () => {
            check(toggleY);
        }, false)
    }
  }

  function check(toggleY) {
      const scrollY = window.scrollY;

      if (scrollY > toggleY) {
          btnDesktop.classList.add('hidden')
          btnMobile.classList.add('visible')
      } else {
          btnDesktop.classList.remove('hidden')
          btnMobile.classList.remove('visible')
      }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  togglePseudoSelect()
  toggleShowText()
  toggleProductOrderButton()
})

window.addEventListener('load', function () {
    fixPartners()
});

function fixPartners() {
    if (document.documentElement.clientWidth > 767) return;

    const container = document.querySelector('.partners__list');

    if (!container) return;

    const elems = Array.from(container.querySelectorAll('.partners__list-item'));

    if (elems.length % 2 == 0) {
        elems[elems.length -1].remove();
    }

    elems[Math.floor(elems.length % 2 == 0 ? elems.length / 2 : elems.length / 2 + 1)].style.marginLeft = elems[0].clientWidth / 2 + 'px';
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }

const menuBtn = document.querySelector('.js-open-menu');
const desktopMenu = document.querySelector('.header__products-menu');
if (menuBtn && desktopMenu) {
    menuBtn.addEventListener('click', () => {
        desktopMenu.classList.toggle('active');
    })

    window.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('.js-open-menu') && !target.closest('.header__products-menu')) {
            desktopMenu.classList.remove('active');
        }
    })
}