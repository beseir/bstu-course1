$(document).ready(function() {
    let header = $('.header__container');
    let headerHeight = header.height();
    let lastScrollTop = 0;

    header.css('transition', 'transform 0.3s');
    $('body').css('transition', 'padding-top 0.3s');

    $(window).scroll(function() {
        let windowHeight = $(window).height();
        let documentHeight = $(document).height();
        let scrollTop = $(this).scrollTop();
        let scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        if ((scrollTop > lastScrollTop && !header.hasClass('slide-up') )|| scrollPercent > 96) {


            header.addClass('slide-up').css('transform', 'translateY(-' + headerHeight + 'px)');
            $('body').css({
                'paddingTop': 0
            });
        } else if (scrollTop <= lastScrollTop && header.hasClass('slide-up')) {

            header.removeClass('slide-up').addClass('header_fixed').css('transform', 'translateY(0%)');
            $('body').css({
                'paddingTop': headerHeight + 'px'
            });
        }
        lastScrollTop = scrollTop;
    });
});