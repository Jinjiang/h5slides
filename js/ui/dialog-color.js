/**
    @fileOverview
    color dialog layer class
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    幻灯片颜色编辑对话框的构造器
    @constructor
 */
function ColorDialog() {
    var root = $('#dialog-for-color');
    var that = this;

    var currentPage;
    var currentKey;

    this.show = function (page, key, value) {
        currentPage = page;
        currentKey = key;
        mouseOverColor(value || '#000000');
        root.show().css('left', ($('body').width() - root.width()) / 2 + 'px');
    };
    this.hide = function () {
        root.hide();
    };
    this.submit = function (color) {
        this.hide();
        that.notify('color', {
            page: currentPage,
            key: currentKey,
            value: color
        });
    };
}


reg(ColorDialog);



