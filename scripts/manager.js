define(['lib/zepto', 'data'], function ($, data) {
    var btnRestart = $('#menu-btn-restart');
    var btnPlay = $('#menu-btn-play');
    var btnSave = $('#menu-btn-save');

    return {
        init: function () {
            var that = this;

            btnRestart.onclick = function () {
                that.onreset && that.onreset();
            };
            btnPlay.onclick = function () {
                that.onplay && that.onplay();
            };
            btnSave.onclick = function () {
                data.reset();
                that.onsave && that.onsave();
            };
        }
    };
});