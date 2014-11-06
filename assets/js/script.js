$(function() {

  // Sections in view

  // Logo CSS Animation
  setTimeout(function(){
    $("header div").addClass('top');
  }, 100);
  setTimeout(function() {
    $(".down").addClass('top');
  }, 500);

  $('.wrapper').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $('header').addClass('hidden');
      $('.down').addClass('hidden');
    }
    else {
      if ($('#naacc img').css('float') == 'left' || $('.resume').length) {
        $('header').removeClass('hidden');
        if ($(document).scrollTop() < 600) {
          $('.down').removeClass('hidden');
        }
      }
      else {
        if ($(document).scrollTop() < 600) {
          $('header').removeClass('hidden');
          $('.down').removeClass('hidden');
        }
      }
    }
  });

  if ($('#naacc img').css('float') == 'left') {
    $('footer').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        $('header').addClass('footer');
      }
      else {
        $('header').removeClass('footer');
      }
    });
  }

  // Scroll Assist
  $('.down').click(function() {
    $("html, body").animate({scrollTop:$('.wrapper section:first-child').offset().top}, 1000);
  })



});
