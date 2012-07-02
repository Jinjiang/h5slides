define(['lib/zepto'], function ($) {
    var SLIDE_ORIGIN_WIDTH = 1000;
    var SLIDE_ORIGIN_HEIGHT = 750;
    var SLIDE_PROPORTION = 0.75;
    var MENU_HEIGHT = 68;
    var MIN_SIDEBAR_WIDTH = 260;
    var HORIZONTAL_MARGIN = 40;
    var VERTICAL_MARGIN = 80;

    var resizeTimer;
    var that = {};

    var slide = $('#main');
    var sidebar = $('#sidebar');
    var title = $('#main-title');
    var wrapper = $(window);

    function doResize() {
        var wrapperWidth;
        var wrapperHeight;
        var slideWidth;
        var slideHeigth;
        var scale;
        var left;
        var top;
        var sidebarWidth;

        sidebar.css('height', '200px');

        wrapperWidth = wrapper.width() - HORIZONTAL_MARGIN;
        wrapperHeight = wrapper.height() - VERTICAL_MARGIN - MENU_HEIGHT;

        if (wrapperWidth - MIN_SIDEBAR_WIDTH >
                wrapperHeight / SLIDE_PROPORTION) {

            scale = wrapperHeight / SLIDE_ORIGIN_HEIGHT;

            slideWidth = SLIDE_ORIGIN_WIDTH * scale;
            slideHeight = wrapperHeight;

            top = 0;
            left = (wrapperWidth - wrapperHeight / SLIDE_PROPORTION) / 2;

            sidebarWidth = wrapperWidth- slideWidth;
        }
        else {
            sidebarWidth = MIN_SIDEBAR_WIDTH;

            slideWidth = wrapperWidth - sidebarWidth;
            slideHeight = slideWidth * SLIDE_PROPORTION;

            scale = slideWidth / SLIDE_ORIGIN_WIDTH;

            left = 0;
            top = (wrapperHeight - slideHeight) / 2;
        }

        top = MENU_HEIGHT / 2 + top + 20;

        that.scale = scale;
        that.left = Math.floor(left);
        that.top = Math.floor(top);
        that.side = Math.floor(sidebarWidth);

        slide.css('-webkit-transform', 'scale(' + that.scale + ')');
        slide.css('-moz-transform', 'scale(' + that.scale + ')');
        slide.css('-ms-transform', 'scale(' + that.scale + ')');
        slide.css('-o-transform', 'scale(' + that.scale + ')');
        slide.css('transform', 'scale(' + that.scale + ')');

        slide.css('marginTop', that.top + 'px');
        sidebar.css({
            'width': that.side + 'px',
            'height': wrapperHeight + VERTICAL_MARGIN + 'px'
        });
        title.css({
            'left': that.side + 'px'
        });

        setTimeout(function () {
            that.onresize && that.onresize();
        }, 500);
    }

    function resizeHandler() {
        var timer = setTimeout(doResize, 300);
        clearTimeout(resizeTimer);
        resizeTimer = timer;
    }

    $(window).resize(resizeHandler);

    doResize();

    return that;
});