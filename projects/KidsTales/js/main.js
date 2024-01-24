$(document).ready(function() {

    //Header search
    var headerMenu = $('.js-headerMenu');
    var headerSearch = $('.js-headerSearch');
    var headerSearchInput = $('.js-headerSearchInput');

    headerSearchInput.on('focus', function() {
        headerMenu.css('display', 'none');
        headerSearch.toggleClass('active');
    });

    headerSearchInput.on('focusout', function() {
        headerSearch.toggleClass('active');
        setTimeout(function () {
            headerMenu.css('display', 'flex');
        }, 400);
    });

    //Header hamburger
    var headerHamburger = $('.js-headerHamburger');
    headerHamburger.click(function() {
        $(this).toggleClass('active');
        headerMenu.toggleClass('active');
    });

    //Subscription Validation
    function emailValidation(input) {
        let pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
    
        if (input.val().search(pattern) == 0) {
            return false;
        } else {
            return true;
        }
    }
    
    var subscriptionForm = $('.js-subscriptionForm');
    var subscriptionInput = $('.js-subscriptionInput');

    subscriptionInput.on('input', function() {
        if (subscriptionInput.val() !== '') {
            if (!emailValidation(subscriptionInput)) {
                subscriptionInput.css('border', '1px solid #219653');
                $('.js-subscriptionValidation *').hide();
                $('.js-subscriptionValidation .success').show();
            } else {
                subscriptionInput.css('border', 'none');
                $('.js-subscriptionValidation *').hide();
                $('.js-subscriptionValidation .passive').show();
            }
        }
    });
    
    subscriptionForm.submit(function(e) {
        e.preventDefault();
        if (subscriptionInput.val() !== '' && !emailValidation(subscriptionInput)) {
            $('.js-subscriptionSuccess').fadeIn().css('display', 'flex');
        } else {
            $('.js-subscriptionValidation *').hide();
            $('.js-subscriptionValidation .error').show();
            subscriptionInput.css('border', '1px solid #eb5757');
        }
    });

    //Help
    var helpCounter = 0;
    var helpForm = $('.js-helpForm');
    var helpInput = $('.js-helpInput');

    helpForm.submit(function(e) {
        e.preventDefault();

        let helpHeading = $('.js-helpHeading');
        let helpQuestion = $('.js-helpQuestion');

        if (helpInput.val() == '') {
            helpInput.addClass('error');
            helpInput.attr('placeholder', 'Ответьте что-нибудь :(');
        } else {
            helpInput.removeClass('error');
            helpForm.trigger('reset');

            if (helpCounter == 3) {
                $('.js-helpCroco').toggleClass('hidden');
                helpForm.css('opacity', '0');
                helpQuestion.css('opacity', '0');
                helpHeading.text('Спасибо вам, что помогаете нам стать лучше :)');
                $('.js-help').toggleClass('final');
                helpCounter++;
            }

            if (helpCounter == 2) {
                $('.js-helpMonkey').toggleClass('hidden');
                helpQuestion.text('4. Как вы думаете, мы с вами еще увидимся :) ?');
                helpCounter++;
            }

            if (helpCounter == 1) {
                $('.js-helpTiger').toggleClass('hidden');
                helpQuestion.text('3. У вас получилось найти нужную сказку?');
                helpCounter++;
            }

            if (helpCounter == 0) {
                $('.js-helpPig').toggleClass('hidden');
                helpQuestion.text('2. Родители, вам было трудно читать сказку?');
                helpCounter++;
            }
        }

        if (helpInput.hasClass('error')) {
            helpInput.attr('placeholder', 'Ответьте что-нибудь :(');
        } else {
            helpInput.attr('placeholder', 'Введите ответ сюда');
        }
    });

    //Audioplayer
    $('.audio__title').before().click(function() {
        alert('В процессе разработки..');
    });

    //Fairytale audioplayer
    var fairytaleAudio;
    var fairytaleAudioplayer = $('.js-fairytaleAudioplayer');
    var fairytalePlay = $('.js-fairytalePlay');
    var fairytalePause = $('.js-fairytalePause');
    var fairytaleProgress = $('.js-fairytaleProgress');
    var fairytaleDuration = $('.js-fairytaleDuration');

    function initAudio(el) {
        let song = el.data('song');
        let duration = el.data('duration');
        fairytaleAudio = new Audio('../../audio/' + song);
        fairytaleDuration.html(duration);
    }

    function showDuration() {
        $(fairytaleAudio).bind('timeupdate', function() {
            let duration = fairytaleAudioplayer.data('duration');
            let minutes = parseInt((fairytaleAudio.currentTime / 60) % 60);
            let seconds = parseInt(fairytaleAudio.currentTime % 60);;

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            fairytaleDuration.html(minutes + ':' + seconds + ' / ' + duration);

            let value = 0;

            if (fairytaleAudio.currentTime > 0) {
                value = Math.floor((100 / fairytaleAudio.duration) * fairytaleAudio.currentTime);
            }

            fairytaleProgress.css('width', value+'%');
        });
    }

    initAudio(fairytaleAudioplayer);

    fairytalePlay.click(function() {
        fairytaleAudio.play();
        fairytalePlay.hide();
        fairytalePause.show();
        fairytaleDuration.addClass('active');
        showDuration();
    });

    fairytalePause.click(function() {
        fairytaleAudio.pause();
        fairytalePause.hide();
        fairytalePlay.show();
    });

});