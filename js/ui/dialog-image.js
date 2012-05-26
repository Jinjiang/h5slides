/**
    @fileOverview
    插入图片对话框
    // TODO for widget system
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    插入图片对话框的构造器
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
    var currentName;
    var currentKey;

    function doPreview(value) {
        if (value) {
            preview.css(currentKey, 'url(' + value + ')');
        }
        else {
            preview.css(currentKey, 'none');
        }
    }

    this.show = function (page, name, key, value) {
        if (true) { // TODO
            title.text('对不起，您的浏览器暂不支持添加图片或背景图片 :-(');
            preview.hide();
            input.hide();
            btnOk.hide();
            btnClear.hide();
            btnCancel.text('返回');
        }
        else {
            currentPage = page;
            currentName = name;
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
            // window.data.setPicture(file, function (url) {
            //     that.hide();
            //     that.notify('image', {
            //         page: currentPage,
            //         name: currentName,
            //         key: currentKey,
            //         value: 'url(' + url + ')'
            //     });
            // });

            // TODO

            that.hide();
            that.notify('image', {
                page: currentPage,
                name: currentName,
                key: currentKey,
                value: null
            });
        }
        else {
            that.hide();
            that.notify('image', {
                page: currentPage,
                name: currentName,
                key: currentKey,
                value: null
            });
        }
    };

    input.bind('change', function (event) {
        // var file = this.files[0];
        // window.data.readFileData(file, function (result) {
        //     doPreview(result);
        // });
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



