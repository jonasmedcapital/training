function footerMarginTop() {

  $('body').off('shown.bs.collapse', '.collapse').on('shown.bs.collapse', '.collapse', function () {
    doFooterMarginTop();
  });
  $('body').off('hidden.bs.collapse', '.collapse').on('hidden.bs.collapse', '.collapse', function () {
    doFooterMarginTop();
  })


  doFooterMarginTop();

  setInterval(function () { doFooterMarginTop(); }, 200);

  function doFooterMarginTop() {
    x = window.matchMedia("(max-width: 575px)")
    centerText(x);
    windowHeight = $(window).height();
    navbarHeight = $('.navbar').height();
    navbarPadding = Number($('.navbar').css('padding-top').replace("px", "")) + Number($('.navbar').css('padding-bottom').replace("px", ""));
    progressHeight = $('.progress').height();
    // containerHeight = $('.container')[0].offsetHeight;
    containerHeight = $('.container')[0].offsetHeight;
    footerHeight = $('.frame-site-footer-loggedin').height();
    footerPadding = Number($('.frame-site-footer-loggedin').css('padding-top').replace("px", "")) + Number($('.frame-site-footer-loggedin').css('padding-bottom').replace("px", ""));

    if (windowHeight > navbarHeight + navbarPadding + progressHeight + containerHeight + footerHeight + (2 * footerPadding)) {
      $('.frame-site-footer-loggedin').css('position', 'fixed');
    } else {
      $('.frame-site-footer-loggedin').css('position', 'relative');
    }
    $('.frame-site-footer-loggedin').css('margin-top', footerPadding);
  }
  

  function centerText(x) {
    if (x.matches) { // If media query matches
      $('.frame-site-footer').find('.s-subtitle-footer').each(function () {
        $(this).addClass("title-footer")
      });
      $('.frame-site-footer').find('p').each(function () {
        $(this).addClass("title-footer")
      });
      $('.frame-site-footer').find('.s-title-footer').each(function () {
        $(this).addClass("title-footer")
      });
    } else {
    }
  }
}