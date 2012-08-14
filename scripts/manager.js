define(['lib/zepto', 'data', 'status'], function ($, data, status) {
    var btnRestart = $('#menu-btn-restart');
    var btnPlay = $('#menu-btn-play');
    var btnSave = $('#menu-btn-save');

    return {
        init: function () {
            var that = this;

            btnRestart.click(function () {
                if (confirm('重新编辑？')) {
                    data.reset();
                    status.page = 1;
                    status.name = 'slide';
                    that.onreset && that.onreset();
                }
            });
            btnPlay.click(function () {
                that.onpreview && that.onpreview();
            });
            btnSave.click(function () {
                that.onsave && that.onsave();
            });
        }
    };
});