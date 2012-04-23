/**
    @fileOverview
    mask layer class
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    幻灯片对话框遮罩层的构造器
    @constructor
 */
function MaskLayer() {
    var root = $('#layer-for-mask');

    this.show = function () {
        root.show();
    };
    this.hide = function () {
        root.hide();
    };
}



