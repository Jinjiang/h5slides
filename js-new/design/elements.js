define(function () {
    var DESIGN_DATA_LIST = [
        {key: 'default', title: '默认'},
        {key: 'revert', title: '反色'}
    ];

    var dialog = $('#theme-manager');
    var list = $('#design-list');

    return {
        DESIGN_DATA_LIST: DESIGN_DATA_LIST,
        dialog: dialog,
        list: list,
        closeBtn: dialog.find('[data-dismiss="modal"]'),
        saveBtn: dialog.find('[data-action="save"]')
    };
});