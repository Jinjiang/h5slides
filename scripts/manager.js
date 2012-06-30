define(['lib/zepto', 'data'], function ($, data) {
    var btnRestart = $('#menu-btn-restart');
    var btnPlay = $('#menu-btn-play');
    var btnSave = $('#menu-btn-save');

    return {
        init: function () {
            var that = this;

            btnRestart.click(function () {
                // data.reset();
                that.onreset && that.onreset();
            });
            btnPlay.click(function () {
                that.onplay && that.onplay();
            });
            btnSave.click(function () {
                that.onsave && that.onsave();
            });
        }
    };
});