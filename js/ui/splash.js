/**
    @fileOverview
    splash class js
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




function Splash() {
    function warn(type) {
        if (type == 'unsupported') {
            $('#splash').html(
                '您使用的浏览器并不在该页面的支持范围，<br />' +
                '请使用webkit内核的浏览器访问该页面，谢谢！').
                css('fontSize', '24px');
            $('#splash').css({
                width: $('html').width() + 'px',
                height: $('html').height() + 'px',
                background: 'aqua'
            });
            window.onresize = function () {
                $('#splash').css({
                    width: $('html').width() + 'px',
                    height: $('html').height() + 'px'
                });
            }
        }
    }

    this.hide = function () {
        $('#splash').css('top', '-100%').css('bottom', '100%');
    };
    this.warn = function (type) {
        warn(type);
    };
    this.check = function () {
        if (navigator.userAgent.search('WebKit') == -1) {
            return false;
        }
        if (document.createTouch) {
            document.body.className = 'touch';
        }
        return true;
    };

    if (!this.check()) {
        warn('unsupported');
    }
}



