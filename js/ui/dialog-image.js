/**
    @fileOverview
    image dialog layer class
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    幻灯片图片编辑对话框的构造器
    @constructor
 */
function ImageDialog() {
    var root = $('#dialog-for-image');
    var title = $('#dialog-for-image-title');
    var preview = $('#dialog-for-image-preview');
    var input = $('#dialog-for-image-input');
    var btnOk = $('#dialog-for-image-btn-ok');
    var btnClear = $('#dialog-for-image-btn-clear');
    var btnCancel = $('#dialog-for-image-btn-cancel');

    var that = this;
    var currentPage;
    var currentKey;

    function doPreview(value) {
        if (value) {
            preview.css('background-image', 'url(' + value + ')');
        }
        else {
            preview.css('background-image', 'none');
        }
    }

    this.show = function (page, key, value) {
        if (!window.File || !window.FileReader || !window.data.fileSystem) {
            title.text('对不起，您的浏览器暂不支持添加图片或背景图片 :-(');
            preview.hide();
            input.hide();
            btnOk.hide();
            btnClear.hide();
            btnCancel.text('返回');
        }
        else {
            currentPage = page;
            currentKey = key;
            doPreview(value);
            input.val('');
        }
        root.show().css('left', ($('body').width() - root.width()) / 2 + 'px');
    };
    this.hide = function () {
        root.hide();
    };
    this.submit = function () {
        var file = input[0].files[0];
        var currentValue;
        if (file) {
            window.data.setPicture(file, function (url) {
                that.hide();
                that.notify('image', {
                    page: currentPage,
                    key: currentKey,
                    value: 'url(' + url + ')'
                });
            });
        }
        else {
            that.hide();
            that.notify('image', {
                page: currentPage,
                key: currentKey,
                value: null
            });
        }
    };

    input.bind('change', function (event) {
        var file = this.files[0];
        window.data.readFileData(file, function (result) {
            doPreview(result);
        });
    });
    btnOk.bind('click', function (event) {
        that.submit();
    });
    btnClear.bind('click', function (event) {
        input.val('');
        that.submit();
    });
    btnCancel.bind('click', function (event) {
        that.hide();
        that.notify('image');
    });

}


reg(ImageDialog);



