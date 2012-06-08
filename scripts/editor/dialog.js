define(['editor/dialog/img',
    'editor/dialog/color'
], function (imgDialog, colorDialog) {
    var typeMap = {
        color: colorDialog,
        img: imgDialog
    };
    var dialogRoot;
    var dialogHeader;
    var dialogContent;
    var btnSubmit;
    var btnReset;
    var btnCancel;
    var currentDialog;
    function adjust() {}
    return {
        setType: function (type) {
            console.log('set dialog type');
            // currentDialog = typeMap[type];
            // if (currentDialog) {
            //     currentDialog.build(dialogContent, type);
            // }
        },
        update: function (value, title) {
            console.log('update dialog');
            // if (currentDialog) {
            //     currentDialog.update(dialogContent, value, title);
            // }
        },
        show: function () {
            console.log('show dialog');
            // adjust();
            // dialogRoot.show();
        },
        hide: function () {
            console.log('hide dialog');
            // dialogRoot.hide();
        }
    };
});