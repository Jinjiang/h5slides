define(['lib/zepto'], function ($) {
    return {
        root: $('#dialog-layer'),
        header: $('#dialog-header'),
        content: $('#dialog-content'),
        btnSubmit: $('#dialog-btn-ok'),
        btnReset: $('#dialog-btn-reset'),
        btnCancel: $('#dialog-btn-cancel')
    };
});