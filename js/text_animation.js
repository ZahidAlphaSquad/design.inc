
// document.addEventListener('DOMContentLoaded', function() {
//     let addAnimation = function () {
//       document.querySelectorAll(".skew-up").forEach(function (element) {
//         // Reset any previous SplitType instance
//         SplitType.revert(element);
        
//         const text = new SplitType(element, {
//           types: "lines, words",
//           lineClass: "word-line"
//         });
        
//         let lines = element.querySelectorAll(".word-line .word");
        
//         let tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: element,
//             start: "top 85%",
//             end: "top 85%",
//             toggleActions: "play none none reverse", // Adjusted toggleActions
//             onEnter: function () {
//               element.classList.remove("skew-up");
//             },
//             onLeaveBack: function() {
//               tl.progress(0); // Ensures animation resets properly when scrolling back up
//             }
//           }
//         });
        
//         tl.set(element, { opacity: 1 })
//           .from(lines, {
//             y: "100%",
//             skewX: "-6",
//             duration: 1,
//             stagger: 0.07,
//             ease: "expo.out"
//           });
//       });
//     };
  
//     addAnimation();
  
//     window.addEventListener("resize", function () {
//       if (window.innerWidth >= 992) {
//         addAnimation();
//       }
//     });
//   });
  
  
  

//   gsap.from("#testimonialBox",{
//     y:100,
//     duration:1,
//     scrollTrigger: {
//         trigger: "#testimonialBox", 
//     }
    
//   })
// font-family loading
$(document).ready(function () {
  document.fonts.load('10pt "Bauziet Norm"').then(function () {
      $('.dot').css('opacity', '1');
      gsap.to(".dot", {
          scale: 200,
          duration: 10,
          delay: 0.3,
          ease: "power4.out",
          onComplete: function () {
              $('#splash-screen').addClass('hidden');
              startMainPageAnimation();
          }
      });

      setTimeout(function () {
          $('#splash-screen').addClass('hidden');
          startMainPageAnimation();
      }, 1500);
  });
});

// font-family loading end

// $(document).ready(function () {
//   gsap.to(".dot", {
//     scale: 200,
//     duration: 10,
//     delay: 0.3,
//     ease: "power4.out",
//     onComplete: function () {
//       $('#splash-screen').addClass('hidden');
//       // Start your main page animation after splash screen animation completes
//       startMainPageAnimation();
//     }
//   });

//   // Set a timeout to hide the splash screen after a certain duration
//   setTimeout(function () {
//     $('#splash-screen').addClass('hidden');
//     // Start your main page animation after splash screen animation completes
//     startMainPageAnimation();
//   }, 1500);
// });

function startMainPageAnimation() {
  // Your main page animations here
  document.querySelectorAll(".skew-up").forEach(function (element) {
    // Reset any previous SplitType instance
    SplitType.revert(element);
    
    const text = new SplitType(element, {
      types: "lines, words",
      lineClass: "word-line"
    });
    
    let lines = element.querySelectorAll(".word-line .word");
    
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "top 85%",
        toggleActions: "play none none reverse", // Adjusted toggleActions
        onEnter: function () {
          element.classList.remove("skew-up");
        },
        onLeaveBack: function() {
          tl.progress(0); // Ensures animation resets properly when scrolling back up
        }
      }
    });
    
    tl.set(element, { opacity: 1 })
      .from(lines, {
        y: "100%",
        skewX: "-6",
        duration: 1,
        stagger: 0.07,
        ease: "expo.out"
      });
  });

  // Optionally, add a resize event listener to re-trigger animation on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      startMainPageAnimation();
    }
  });

  // Additional animation for #testimonialBox using gsap.from
  gsap.from("#testimonialBox", {
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: "#testimonialBox",
    }
  });
}
