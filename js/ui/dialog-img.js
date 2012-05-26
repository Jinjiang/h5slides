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
function ImgDialog() {
    var root = $('#dialog-for-img');
    var preview = $('#dialog-for-img-preview');
    var input = $('#dialog-for-img-input');
    var btnOk = $('#dialog-for-img-btn-ok');
    var btnClear = $('#dialog-for-img-btn-clear');
    var btnCancel = $('#dialog-for-img-btn-cancel');

    var that = this;

    function doPreview(url) {
        if (url) {
            preview.css('background-image', 'url(' + url + ')');
        }
        else {
            preview.css('background-image', 'none');
        }
    }

    this.show = function (url) {
        doPreview(url);
        input.val(url);
        root.show().css('left', ($('body').width() - root.width()) / 2 + 'px');
    };
    this.hide = function () {
        root.hide();
    };
    this.submit = function () {
        var url = input.val();
        if (url) {
            that.hide();
            that.notify('image', url);
        }
        else {
            that.hide();
            that.notify('image', '');
        }
    };

    input.bind('change', function (event) {
        var url = input.val();
        if (url) {
            doPreview(url);
        }
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


reg(ImgDialog);



