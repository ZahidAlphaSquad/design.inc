// TextLinesReveal class
function TextLinesReveal(animationElems) {
    this.DOM = {
        animationElems: Array.isArray(animationElems) ? animationElems : [animationElems]
    };
    this.SplitTypeInstances = [];
    this.lines = [];

    for (var i = 0; i < this.DOM.animationElems.length; i++) {
        var el = this.DOM.animationElems[i];
        var SplitTypeInstance = new SplitType(el, { types: 'lines' });
        wrapLines(SplitTypeInstance.lines, 'div', 'oh');
        this.lines.push(SplitTypeInstance.lines);
        this.SplitTypeInstances.push(SplitTypeInstance);
    }

    this.initEvents();
}

TextLinesReveal.prototype.in = function() {
    this.isVisible = true;
    gsap.killTweensOf(this.lines);
    return gsap.timeline({ defaults: { duration: 1.2, ease: 'expo' } })
        .set(this.lines, { y: '150%', rotate: 15 })
        .to(this.lines, { y: '0%', rotate: 0, stagger: 0.04 });
};

TextLinesReveal.prototype.out = function() {
    this.isVisible = false;
    gsap.killTweensOf(this.lines);
    return gsap.timeline({ defaults: { duration: 0.7, ease: 'power2' } })
        .to(this.lines, { y: '-150%', rotate: -5, stagger: 0.02 });
};

TextLinesReveal.prototype.initEvents = function() {
    var self = this;
    window.addEventListener('resize', function() {
        self.lines = [];
        for (var i = 0; i < self.SplitTypeInstances.length; i++) {
            var instance = self.SplitTypeInstances[i];
            instance.split();
            wrapLines(instance.lines, 'div', 'oh');
            self.lines.push(instance.lines);
        }
        if (!self.isVisible) {
            gsap.set(self.lines, { y: '-150%' });
        }
    });
};

// TextReveal class
function TextReveal(el) {
    this.DOM = {
        outer: el,
        inner: Array.isArray(el) ? el.map(function(outer) { return outer.querySelector('.oh__inner'); }) : el.querySelector('.oh__inner')
    };
}

TextReveal.prototype.in = function() {
    if (this.outTimeline && this.outTimeline.isActive()) {
        this.outTimeline.kill();
    }

    this.inTimeline = gsap.timeline({ defaults: { duration: 1.2, ease: 'expo' } })
        .set(this.DOM.inner, { y: '150%', rotate: 15 })
        .to(this.DOM.inner, { y: '0%', rotate: 0, stagger: 0.03 });

    return this.inTimeline;
};

TextReveal.prototype.out = function() {
    if (this.inTimeline && this.inTimeline.isActive()) {
        this.inTimeline.kill();
    }

    this.outTimeline = gsap.timeline({ defaults: { duration: 0.7, ease: 'power2' } })
        .to(this.DOM.inner, { y: '-150%', rotate: -5, stagger: 0.03 });

    return this.outTimeline;
};

// Utilities
function preloadImages(selector) {
    return new Promise(function(resolve, reject) {
        imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
}

function wrapLines(elems, wrapType, wrapClass) {
    elems.forEach(function(char) {
        var wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        char.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(char);
    });
}

// DOM elements
var DOM = {
    frame: document.querySelector('.frame'),
    menuCtrl: document.querySelector('.menu-link'),
    textContent: {
        heading: document.querySelector('.heading'),
        primary: document.querySelector('.content-primary'),
        secondary: document.querySelector('.content-secondary')
    },
    img: document.querySelector('.deco')
};

// Instances of classes
var textLinesReveal = new TextLinesReveal([DOM.textContent.primary, DOM.textContent.secondary]);
var textReveal = new TextReveal([DOM.textContent.heading, DOM.menuCtrl]);

// Function to show content
function showContent() {
    textReveal.in();
    textLinesReveal.in();
}

// Preload images
preloadImages('.deco__img, .panel__img').then(function() {
    document.body.classList.remove('loading'); // Remove loader class
    showContent(); // Show content
});
