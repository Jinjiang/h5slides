define(function () {
    var BTN_KEY_LIST = ['next', 'prev', 'add', 'remove', 'clone', 'moveup', 'movedown'];
    var panel = $('#page-nav');
    var list = $('#page-list');
    var btnList = {};
    BTN_KEY_LIST.forEach(function (key) {
        btnList.key = panel.find('button[data-key="' + key + '"]');
    });
    return {
        panel: panel,
        list: list,
        btnList: btnList
    };
});