$(document).ready(function () {

    //Header hamburger
    $('.header__hamburger').click(function() {
        $(this).toggleClass('active');
        $('.header__nav').toggleClass('active');
    });
    
    //Slider
    $('.tickets-slider').slick({
        speed: 1200,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/tickets/slider_prev.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/tickets/slider_next.svg"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: "unslick"
            },
        ]
    });

    //Tabs
    $('.tickets .tickets-tabs').on('click', '.tickets-tabs__button:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.container').find('.tickets-slider').removeClass('active').eq($(this).index()).addClass('active');
    });

    $('.modal .tickets-tabs').on('click', '.tickets-tabs__button:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.modal').find('.modal-calendar').removeClass('active').eq($(this).index()).addClass('active');
    });

    //Modal
    $('[data-modal=calendar]').on('click', function() {
        $('.overlay, #calendar').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, .modal').fadeOut('slow');
    });

    //Sold tickets
    $('.tickets-card__time.sold').click(function(e) {
        e.preventDefault();
    });
});