/**
    @fileOverview
    CSS加载器
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    可以通过key加载和卸载css样式表
 */
function CSS() {
    var that = this;
    var head = $('head');
    var hrefMap = {};

    that.load = function (key, callback) {
        var href = 'css/' + key.replace(/_/ig, '/') + '.css';
        if (!hrefMap[href]) {
            var link = $('<link>').attr('rel', 'stylesheet').attr('href', href).appendTo(head);
            hrefMap[href] = link;
        }
        if (callback) {
            callback(key);
        }
    };

    that.unload = function (key, callback) {
        var href = 'css/' + key.replace(/_/ig, '/') + '.css';
        var link = hrefMap[href];
        if (href) {
            link.remove();
            delete hrefMap[href];
        }
        if (callback) {
            callback(key);
        }
    };
}

reg(CSS);



