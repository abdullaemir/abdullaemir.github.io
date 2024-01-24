$(document).ready(function() {

    particlesJS.load('js-particles', 'js/libs/particles.json');

    $('a').attr('target', '_blank');

    $('.button').click(function() {
       $('.main, .secondary').toggleClass('active');
    });

});