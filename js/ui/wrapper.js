/**
    @fileOverview
    幻灯片的界面框架
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    幻灯片的界面框架构造器
    负责根据窗口的尺寸调节幻灯片中各个元素的位置和大小
    @constructor
 */
function Wrapper(mode) {
    var SLIDE_ORIGIN_WIDTH = 600;
    var SLIDE_ORIGIN_HEIGHT = 450;
    var SLIDE_PROPORTION = 0.75;
    var MENU_HEIGHT = 60;
    var MIN_SIDEBAR_WIDTH = (mode == 'editor') ? 260 : 0;
    var HORIZONTAL_MARGIN = (mode == 'editor') ? 40 : 0;
    var VERTICAL_MARGIN = (mode == 'editor') ? 80 : 0;

    var resizeTimer;
    var that = this;

    var slide = $('#main');
    var sidebar = $('#sidebar');
    var wrapper = $(window);

    /**
        根据窗口的宽高计算出预览区域的大小、边距和缩放比例
        侧边栏的宽度不能小于一个固定的值
     */
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

        top = MENU_HEIGHT / 2 + top;

        that.scale = scale;
        that.left = Math.floor(left);
        that.top = Math.floor(top);
        that.side = Math.floor(sidebarWidth);
        if (mode == 'editor') {
            slide.css('-webkit-transform', 'scale(' + that.scale + ')'),
            slide.css('marginTop', that.top + 'px');
            sidebar.css({
                'width': that.side + 'px',
                'height': wrapperHeight + VERTICAL_MARGIN + 'px'
            });
        }
        else if (mode == 'player') {
            slide.css({
                '-webkit-transform': 'scale(' + that.scale + ')',
                '-moz-transform': 'scale(' + that.scale + ')',
                '-ms-transform': 'scale(' + that.scale + ')',
                '-o-transform': 'scale(' + that.scale + ')',
                'left': that.left + 'px',
                'top': that.top + 'px'
            });
        }

        that.notify('resize');
    }

    /**
        控制界面调整动作触发的时机
        界面调整的动作会延时300毫秒执行，以减少窗口尺寸连续调整带来的资源浪费
     */
    function resizeHandler() {
        var timer = setTimeout(doResize, 300);
        clearTimeout(resizeTimer);
        resizeTimer = timer;
    }

    $(window).resize(resizeHandler);

    doResize();

    setTimeout(function () {
        slide.show();
    }, 13);
}


reg(Wrapper);



