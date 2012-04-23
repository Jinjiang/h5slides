/**
    @fileOverview
    编辑器的浮动按钮层
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    浮动按钮的构造器
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



