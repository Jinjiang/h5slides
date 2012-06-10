define(['editor/dialog/img',
    'editor/dialog/backgroundimage',
    'editor/dialog/color'
], function (imgDialog, bgImgDialog, colorDialog) {
    var typeMap = {
        color: colorDialog,
        img: imgDialog,
        backgroundimage: bgImgDialog
    };
    var dialogRoot = $('#dialog-layer');
    var dialogHeader = $('#dialog-header');
    var dialogContent = $('#dialog-content');
    var btnSubmit = $('#dialog-btn-ok');
    var btnReset = $('#dialog-btn-reset');
    var btnCancel = $('#dialog-btn-cancel');

    var currentProp;
    var currentDialog;

    function adjust() {
        var windowWidth = $(window).width();
        var dialogWidth = dialogRoot.width();
        var left = Math.round((windowWidth - dialogWidth) / 2);
        dialogRoot.css('left', left + 'px');
    }

    btnSubmit.click(function () {
        var value = currentDialog.val(dialogContent);
        mod.onsubmit && mod.onsubmit(currentProp, value);
        mod.hide();
    });
    btnReset.click(function () {
        mod.onreset && mod.onreset(currentProp);
        mod.hide();
    });
    btnCancel.click(function () {
        mod.hide();
    });

    var mod = {
        setProp: function (prop) {
            currentProp = prop;
            currentDialog.prop = prop;
        },
        setType: function (type) {
            if (currentDialog) {
                currentDialog.remove(dialogContent);
            }
            currentDialog = typeMap[type];
            if (currentDialog) {
                currentDialog.build(dialogContent);
            }
        },
        update: function (value, title) {
            if (currentDialog) {
                dialogHeader.text(title);
                currentDialog.update(dialogContent, value);
            }
        },
        show: function () {
            dialogRoot.show();
            adjust();
        },
        hide: function () {
            dialogRoot.hide();
        }
    };

    return mod;
});