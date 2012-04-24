/**
    @fileOverview
    预加载界面
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    预加载界面的构造器
    @constructor
 */
function Splash() {

    function warnn(type) {
        if (type == 'unsupported') {
            $('#splash').html(
                '您使用的浏览器并不在该页面的支持范围，<br />' +
                '请使用webkit内核的浏览器访问该页面，谢谢！').
                css('fontSize', '24px');
            $('#splash').css({
                width: $(window).width() + 'px',
                height: $(window).height() + 'px',
                background: 'aqua'
            });
            window.onresize = function () {
                $('#splash').css({
                    width: $(window).width() + 'px',
                    height: $(window).height() + 'px'
                });
            }
        }
    }

    this.hide = function () {
        $('#splash').css('top', '-100%').css('bottom', '100%');
    };
    this.warn = function (type) {
        warnn(type);
    };
    this.check = function () {
        if (navigator.userAgent.search('WebKit') == -1) {
            // return false;
        }
        if (document.createTouch) {
            document.body.className = 'touch';
        }
        return true;
    };

    if (!this.check()) {
        warnn('unsupported');
    }
}

reg(Splash);



