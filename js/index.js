import { GooCursor } from './cursor.js';

const cursorEl = document.querySelector('.cursor');

// Initialize cursor
const goo = new GooCursor(cursorEl);

// Easter egg: click anywhere

window.addEventListener('click', () => {
    gsap.
    timeline()
    .addLabel('start', 0)
    .to(goo.DOM.cells, {
        duration: 1,
        ease: 'power4',
        opacity: 1,
        stagger: {
            from: [...goo.DOM.cells].indexOf(goo.getCellAtCursor()),
            each: 0.02,
            grid: [goo.rows,goo.columns]
        }
    }, 'start')
    .to(goo.DOM.cells, {
        duration: 1,
        ease: 'power1',
        opacity: 0,
        stagger: {
            from: [...goo.DOM.cells].indexOf(goo.getCellAtCursor()),
            each: 0.03,
            grid: [goo.rows,goo.columns]
        }
    }, 'start+=0.3')
});


// menu 
document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const closeMenuLinks = document.querySelectorAll('.close-menu-link');
  
    function closeMenuHandler() {
      menu.classList.add('hidden');
      document.body.classList.remove('menu-open');
    }
  
    menuToggle.addEventListener('click', function () {
      menu.classList.toggle('hidden');
      document.body.classList.toggle('menu-open');
    });
  
    closeMenu.addEventListener('click', closeMenuHandler);
  
    closeMenuLinks.forEach(link => {
      link.addEventListener('click', closeMenuHandler);
    });
  });

  // accordian
  document.addEventListener('DOMContentLoaded', function () {
    var acc = document.getElementsByClassName("accordion");

    for (var i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        var panel = this.nextElementSibling;

        // Check if the clicked panel is already open
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          panel.style.maxHeight = null;
          panel.style.paddingTop = null;
          panel.style.paddingBottom = null;
        } else {
          // Close all panels
          var allPanels = document.getElementsByClassName("panel");
          for (var j = 0; j < allPanels.length; j++) {
            allPanels[j].style.maxHeight = null;
            allPanels[j].style.paddingTop = null;
            allPanels[j].style.paddingBottom = null;
          }

          // Remove "active" class from all accordion buttons
          for (var j = 0; j < acc.length; j++) {
            acc[j].classList.remove("active");
          }

          // Open the clicked panel
          this.classList.add("active");
          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.style.paddingTop = "10px"; // Same as in CSS
          panel.style.paddingBottom = "10px"; // Same as in CSS
        }
      });
    }
  });
  // accordian end


  // <!-- JavaScript to control modal behavior -->
    var btn = document.getElementById("myBtn");
    var modal = document.getElementById("myModal");
    var closeBtn = modal.querySelector(".close");

    btn.onclick = function () {
      modal.style.display = "block";
      setTimeout(function () {
        modal.querySelector(".modal-content").classList.add("show");
      }, 100); 
    }

    closeBtn.onclick = function () {
      modal.style.display = "none";
      modal.querySelector(".modal-content").classList.remove("show");
    }

    // Close modal if user clicks outside of it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        modal.querySelector(".modal-content").classList.remove("show");
      }
    }

  // <!-- JavaScript to control modal behavior end -->
 // <!-- pricing modal  -->
var buttons = document.getElementsByClassName("pricingButton");

var priceModal = document.getElementById("pricingModal");
var priceCloseBtn = priceModal.querySelector(".close");

function openModal() {
  priceModal.style.display = "block";
  setTimeout(function () {
    priceModal.querySelector(".modal-content").classList.add("show");
  }, 100);
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = openModal;
}

function closeModal() {
  priceModal.style.display = "none";
  priceModal.querySelector(".modal-content").classList.remove("show");
}

window.onclick = function (event) {
  if (event.target == priceModal) {
    closeModal();
  }
};

// Attach click event listener to close button
priceCloseBtn.onclick = closeModal;

 


// <!-- pricing modal end -->
  // <!-- scrolling-->
    $(document).ready(function() {
        $("a.scroll-link[href^='#']").click(function(e) {
            e.preventDefault();

            var position = $($(this).attr("href")).offset().top;

            $("body, html").animate({
                scrollTop: position
            }, 1000); 
        });
    });

  // <!-- scrolling end-->
  // testing 
  
  (function($, window, document, undefined) {
    "use strict";
  
    const $window = $(window);
    const $document = $(document);
    const $slidesContainer = $(".slides-container");
    const $slides = $(".slide");
    
    let $currentSlide = $slides.first();
    let pageHeight = $window.innerHeight();
    let isAnimating = false;
  
    goToSlide($currentSlide);
  
    $window.on("resize", onResize).resize();
    $window.on("mousewheel DOMMouseScroll", onMouseWheel);
    $document.on("keydown", onKeyDown);
  
    function onKeyDown(event) {
      const keyCodes = { UP: 38, DOWN: 40 };
      const PRESSED_KEY = event.keyCode;
      if (PRESSED_KEY == keyCodes.UP) {
        goToPrevSlide();
        event.preventDefault();
      } else if (PRESSED_KEY == keyCodes.DOWN) {
        goToNextSlide();
        event.preventDefault();
      }
    }
    
    function onMouseWheel(event) {
      const delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;
      if (delta < -1) {
        goToNextSlide();
      } else if (delta > 1) {
        goToPrevSlide();
      }
      event.preventDefault();
    }
    
    function goToPrevSlide() {
      if ($currentSlide.prev().length) goToSlide($currentSlide.prev());
    }
    
    function goToNextSlide() {
      if ($currentSlide.next().length) goToSlide($currentSlide.next());
    }
  
    function goToSlide($slide) {
      if (!isAnimating && $slide.length) {
        isAnimating = true;
        $currentSlide = $slide;
  
        TweenLite.to($slidesContainer, 0.7, {
          scrollTo: { y: pageHeight * $currentSlide.index() },
          onComplete: onSlideChangeEnd,
          onCompleteScope: this
        });
      }
    }
  
    function onSlideChangeEnd() {
      setTimeout(function() { // prevent slides from skipping
        isAnimating = false;
      }, 500);
      
      $(".slide").each(function(i, slide) {
        i === $currentSlide.index() ? $(this).addClass("animate") : $(this).removeClass("animate");
      });
    }
  
    function onResize(event) {
      const newPageHeight = $window.innerHeight();
      if (pageHeight !== newPageHeight) {
        pageHeight = newPageHeight;
        TweenLite.set([$slidesContainer, $slides], { height: pageHeight + "px" });
        TweenLite.set($slidesContainer, {
          scrollTo: { y: pageHeight * $currentSlide.index() }
        });
      }
    }
  
    function animationSetup() {
      $(".slide").each(function(i, slide) {
        // Reveal Animation
        if ($(slide).hasClass("reveal-text")) {
          // Wrap span around each word in headline
          const $revealHeadline = $(slide).find(".reveal");
          const words = $revealHeadline.text().split(" ");
          $revealHeadline.empty();
  
          $.each(words, function(i, text) {
            $revealHeadline.append(
              $(`<span class="word" data-headline="${text}">`)
            );
          });
        }
  
        // Highlight Animation
        if ($(slide).hasClass("highlight-text")) {
          $(slide)
            .find(".highlight")
            .each(function(i, currentSlide) {
              // Wrap span around each line
              $(currentSlide)
                .find(".line")
                .each(function(i, line) {
                  const words = $(line).text();
                  $(line)
                    .empty()
                    .append($(`<span class="word" data-headline="${words}">`));
                });
            });
        }
      });
    }
  
    animationSetup();
  })(jQuery, window, document);
  
  
  
