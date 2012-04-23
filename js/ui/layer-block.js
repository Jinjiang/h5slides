/**
    @fileOverview
    block bar layer class
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    幻灯片块状元素浮动工具栏的构造器
    @constructor
 */
function BlockLayer() {
    var that = this;
    var imageBtn = $('#bar-for-block-btn-image-dialog');
    imageBtn.click(function () {
        that.notify('dialog', {
            type: 'slide',
            key: 'image'
        });
    });
}


reg(BlockLayer);



