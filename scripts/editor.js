define(['lib/zepto', 'data', 'status', 'editor/index'],
        function ($, data, status, editorModSet) {

    var titleMod = editorModSet.titleMod;
    var themeMod = editorModSet.themeMod;
    var pageMod = editorModSet.pageMod;
    var layoutMod = editorModSet.layoutMod;
    var itemMod = editorModSet.itemMod;
    var previewMod = editorModSet.previewMod;
    var typeMod = editorModSet.typeMod;
    var dialogMod = editorModSet.dialogMod;
    var layerMod = editorModSet.layerMod;
    var resizeMod = editorModSet.resizeMod;

    var currentPage = status.page;
    var currentName = status.name;

    function init() {
        $('#splash').css('top', '-100%').css('bottom', '100%');
    }

    function load() {
        titleMod.init();
        themeMod.init();
        layoutMod.init();
        pageMod.init();
        previewMod.init();
        initItemEditor();
    }

    function initItemEditor() {
        dialogMod.hide();
        layerMod.hide();
    }

    themeMod.onthemechange = function (theme) {
        previewMod.updateTheme(theme);
    };
    layoutMod.onlayoutchange = function (page, layout) {
        if (page == status.page) {
            previewMod.updateLayout(layout);
            typeMod.adjust();
        }
    };
    pageMod.onpagechange = function (page) {
        status.page = currentPage = page;
        status.name = currentName = 'slide';

        initItemEditor();

        layoutMod.init();
        previewMod.init();
    };

    previewMod.onselect = function (name) {
        status.name = currentName = name;
        typeMod.init();
        itemMod.init();
    };

    typeMod.ontypechange = function (page, name, type) {
        if (page == status.page) {
            previewMod.updateItem(status.name);
            itemMod.init();
        }
    };

    function checkProp(page, name, prop, value) {
        if (page == status.page && name == status.name) {
            if (prop.match(/^-val-/)) {
                previewMod.updateContent(name, value);
            }
            else {
                var style = {};
                style[prop] = value;
                previewMod.updateStyle(name, style);
            }
        }
    }

    itemMod.onpropchange = function (page, name, prop, value) {
        checkProp(page, name, prop, value);
    };

    dialogMod.onsubmit = function (page, name, prop, value) {
        checkProp(page, name, prop, value);
        dialogMod.hide();
    };
    dialogMod.onreset = function (page, name, prop) {
        checkProp(page, name, prop, '');
        dialogMod.hide();
    };

    layerMod.onsubmit = function (page, name, prop, value) {
        checkProp(page, name, prop, value);
        layerMod.hide();
    };

    return {
        init: init,
        load: load
    };
});