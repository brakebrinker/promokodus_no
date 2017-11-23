jQuery(document).ready(function($) {
    //dropdown menu
    var switchMenu = true;

    $('.main-menu .dropdown').on('click', 'a', function(e) {
        e.preventDefault();

        if (switchMenu) {
            $(this).closest('.dropdown').find('ul').fadeIn('fast', function(){
                $(this).closest('.dropdown').addClass('active');
                switchMenu = false;
            });
        } else {
            $(this).closest('.dropdown').find('ul').fadeOut('fast', function(){
                $(this).closest('.dropdown').removeClass('active');
                switchMenu = true;
            });
        }
    });

    //fixed menu animate

    var yesFixed = false;
    var posLeft = $('.main-menu ul.menu').offset().left - $('.main-menu ul.menu').position().left;
    var menuAnimateTime = 300;
    var pixelsAction = 91;

    $(window).scroll(function () {
        if ( $(this).scrollTop() > pixelsAction ) {
            if (!yesFixed) {
                yesFixed = true;
                $('.bottom-header').addClass('bar_fixed');
                $(".main-menu ul.menu").animate({'margin-left':0}, menuAnimateTime);
                $('.search-fixed').fadeIn('fast');
            }
        } else {
            if (yesFixed) {
                yesFixed = false;
                $('.bottom-header').removeClass('bar_fixed');
                $('.search-fixed').fadeOut('fast');
                $(".main-menu ul.menu").animate({'margin-left':posLeft}, menuAnimateTime);
            }
        }
    });

    // copy to clipboard
    $('.modal-content-promo-wrapper').on('click', '.copy', function(e) {
        var textField = $(this).siblings('input[type="text"]');
        if (textField.hasClass('yes-buffer')) {
            var copyElem = '#' + textField.attr('id');
            copyFrom(copyElem);
        }
    });

    $('.modal-content-promo-wrapper').on('click', 'input[type="text"]', function(e) {
        if ($(this).hasClass('yes-buffer')) {
            var copyElem = '#' + $(this).attr('id');
            copyFrom(copyElem);
        }
    });

    function copyFrom(elem) {
        window.getSelection().removeAllRanges();
        
        var inputC = document.querySelector(elem);
        var range = document.createRange();

        range.selectNode(inputC);  
        window.getSelection().addRange(range);
        try {  
            var successful = document.execCommand('copy');  
            var msg = successful ? 'successful' : 'unsuccessful';  
            // console.log('Copy email command was ' + msg);  
        } catch(err) {  
            // console.log('Oops, unable to copy');  
        }  

        window.getSelection().removeAllRanges();
    }

    // animation more
    var blockText = [];
    var blockHeight = '';
    var blockWidth = '';
    var linkText = '';
    var modalId = '';
    var animationTime = 200;

    $('.modal').on('shown.bs.modal', function (e) {
        blockText = $(this).find('.modal-content-more span');
        blockWidth = blockText.width() + 'px';
        blockText.css({"width":"100%"});
        blockHeight = blockText.height() + 'px';
        linkText = $(this).find('.modal-content-more a').html();

        blockText.css({"white-space":"nowrap","height":"19px","width":blockWidth}).animate({opacity: 1 }, 300);
    });

    $('.modal-content-more').on('click', 'a', function(e) {
        e.preventDefault();

        var thisMore = $(this).closest('.modal-content-more');

        var thisSpan = $(this).siblings('span');
        var thisA = $(this);

        if (!thisMore.hasClass('active')) {
            thisMore.addClass('active');
            thisSpan.css({"width":"100%", "white-space":"normal"}).animate({ 
                height: blockHeight },
                animationTime, function() {
                    $(this).css({});
                    thisA.html('скрыть');
            });
        } else {
            thisMore.removeClass('active');
            thisSpan.animate({ 
                height: 19 },
                animationTime, function() {
                    $(this).css({"white-space":"nowrap", "width":blockWidth});//,"width":blockWidth});
                    thisA.html(linkText);
            });
        }
    });

    $('.modal').on('hidden.bs.modal', function (e) {
        blockText = $(this).find('.modal-content-more span');
        blockText.removeAttr('style');
        $(this).find('.modal-content-more').removeClass('active');
        $(this).find('.modal-content-more a').html(linkText);
    });
    


});