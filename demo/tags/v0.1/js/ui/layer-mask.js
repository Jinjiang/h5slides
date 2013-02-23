/**
    @fileOverview
    所有弹出层下面的遮罩层
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    遮罩层的构造器
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



