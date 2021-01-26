// $(document).on('event', '.eventBlock', function(){
// 
// });

$(window).on('load', function() {
  $('._slider').addClass('owl-carousel').owlCarousel({
    margin: 30,
    nav: false,
    dots: true,
    items: 1,
    loop: true,
    autoplay: true,
    autoplaySpeed: 600,
    autoplayHoverPause: true,
  });
});

$(document).on('click', '._scrollTo', function() {
  var blockId = $(this).attr('data-id');
  $('.menu__item.menu__item_active').removeClass('menu__item_active');
  $('.menu__item._scrollTo[data-id=' + blockId + ']').addClass('menu__item_active');
  scrollTo(blockId);
});

function scrollTo(blockId) {
  var destination = $('#' + blockId).offset().top;
  $('body, html').animate({scrollTop: destination}, 700);
}