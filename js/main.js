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

    //fixed menu
    $(window).scroll(function () {
        $('.bottom-header')[
            ($(this).scrollTop() > 91 ? "add" : "remove") + "Class"
            ]("bar_fixed");
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
    var moreSwitch = true;
    // var blockText = [];
    // var blockHeight = '';
    // var blockWidth = '';
    // var linkText = '';
    // var modalId = '';

    $('.modal').on('shown.bs.modal', function (e) {
        var blockText = $(this).find('.modal-content-more span');
        var blockWidth = blockText.width() + 'px';
        blockText.css({"width":"100%"});
        var blockHeight = blockText.height() + 'px';
        var linkText = $(this).find('.modal-content-more a').html();
        var modalId = '#' + $(this).attr('id');

        blockText.css({"white-space":"nowrap","height":"19px","width":blockWidth}).animate({ 
            opacity: 1 },
             300);

        $('.modal-content-more').on('click', 'a', function(e) {
            e.preventDefault();
            console.log(modalId);
            var thisMore = $(modalId).find('.modal-content-more');
    
            if (!thisMore.hasClass('active')) {
                thisMore.addClass('active');
                blockText.css({"width":"100%"}).animate({ 
                    height: blockHeight },
                        300, function() {
                        $(this).css({"white-space":"normal"});
                    });
                $(this).html('Скрыть');
                
                moreSwitch = false;
            } else {
                thisMore.removeClass('active');
                blockText.animate({ 
                    height: 19 },
                        300, function() {
                        $(this).css({"white-space":"nowrap","width":blockWidth});
                    });
                $(this).html(linkText);
                
                moreSwitch = true;
            }
        });
    });

    $('.modal').on('hidden.bs.modal', function (e) {
        blockText = $(this).find('.modal-content-more span');
        blockText.css({"white-space":"nowrap","height":"19px","width":blockWidth,"opacity":"0"});
        $(this).find('.modal-content-more').removeClass('active');
    });
    


});