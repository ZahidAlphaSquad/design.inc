// document.addEventListener('DOMContentLoaded', function() {
//   let addAnimation = function () {
//     document.querySelectorAll(".skew-up").forEach(function (element) {
//       // Reset any previous SplitType instance
//       SplitType.revert(element);
      
//       const text = new SplitType(element, {
//         types: "lines, words",
//         lineClass: "word-line"
//       });
      
//       let lines = element.querySelectorAll(".word-line .word");
      
//       let tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: element,
//           start: "top 85%",
//           end: "top 85%",
          
//           onComplete: function () {
//             element.classList.remove("skew-up");
//           }
//         }
//       });
      
//       tl.set(element, { opacity: 1 })
//         .from(lines, {
//           y: "100%",
//           skewX: "-6",
//           duration: 2,
//           // rotate:360,
//           stagger: 0.07,
//           ease: "expo.out"
//         });
//     });
//   };

//   addAnimation();

//   window.addEventListener("resize", function () {
//     if (window.innerWidth >= 992) {
//       addAnimation();
//     }
//   });
// });
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
//             toggleActions: "restart none none none", // Control how the animation restarts
//             onEnter: function () {
//               element.classList.remove("skew-up");
//             }
//           }
//         });
        
//         tl.set(element, { opacity: 1 })
//           .from(lines, {
//             y: "100%",
//             skewX: "-6",
//             duration: 2,
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
document.addEventListener('DOMContentLoaded', function() {
    let addAnimation = function () {
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
    };
  
    addAnimation();
  
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992) {
        addAnimation();
      }
    });
  });
  
  
  

  gsap.from("#testimonialBox",{
    y:100,
    duration:1,
    scrollTrigger: {
        trigger: "#testimonialBox", // Element to watch
        start: "top 80%", // Start the animation when top of testimonialBox is 80% in view
    }
    
  })