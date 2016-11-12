$(document).ready(function() {
  var controller = new ScrollMagic.Controller();
  var slides = ['#slide1', '#slide2', 'slide3'];
  var headers = ['#slide1 header', '#slide2 header'];
  var breakSections = ['#cb1', '#cb2', '#cb3'];

  if(!Modernizr.touch){
    

    headers.forEach(function(header, index){
      var num = index+1;

      var headerScene = new ScrollMagic.Scene({
        triggerElement: header,
        offset: -95
      })
      .setClassToggle('#slide'+num, 'is-active')
      .addTo(controller);
    });

    breakSections.forEach(function(breakSection, index){
      var breakID = $(breakSection).attr('id');
      var breakScene = new ScrollMagic.Scene({
        triggerElement: breakSection,
        triggerHook: 0.75
      })
      .setClassToggle('#'+breakID, 'is-active')
      .on('enter', function(e){
        $('nav').attr('class', 'is-light');
      })
      .addTo(controller);
    });

    slides.forEach(function(slide, index){
      var $bcg = $(slide).find('.bcg');
      var slideParallaxScene = new ScrollMagic.Scene({
        triggerElement: slide,
        triggerHook: 1,
        duration: '100%'
      })
      .setTween(TweenMax.from($bcg, 1, {y: '-40%', autoAlpha: 0.3, ease:Power1.easeOut}))
      .addTo(controller)
    });


    introTl = new TimelineMax();

    introTl
      .to($('#intro header .scroll-hint'), 0.2, {autoAlpha: 0, ease: Power1.easeOut})
      .to($('#intro .bcg'), 1.4, {y:'20%', ease: Power1.easeOut}, '-=0.2')
      .to($('#intro'), 0.7, {autoAlpha: 0.5, ease:Power1.easeOut}, '-=1.4');

    var introScene = new ScrollMagic.Scene({
        triggerElement: '#intro',
        triggerHook: 0,
        duration: "100%"
    })
    .setTween(introTl)
    .addTo(controller);


    controller.scrollTo(function (newpos) {
      TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease:Power1.easeInOut});
    });
  }
});
