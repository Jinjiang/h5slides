define(['lib/zepto', 'data', 'status', 'editor/index'],
        function ($, data, status, editorModSet) {

    var titleMod = editorModSet.titleMod;
    var themeMod = editorModSet.themeMod;
    var pageMod = editorModSet.pageMod;
    var layoutMod = editorModSet.layoutMod;
    var itemMod = editorModSet.itemMod;
    var previewMod = editorModSet.previewMod;
    var typeMod = editorModSet.typeMod;
    var adjustMod = editorModSet.adjustMod;
    var dialogMod = editorModSet.dialogMod;
    var layerMod = editorModSet.layerMod;
    var resizeMod = editorModSet.resizeMod;

    function init() {
        $('#splash').css('top', '-100%').css('bottom', '100%');
    }

    function load() {
        // console.log('load');
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
        typeMod.init();
        adjustMod.init();
    }

    themeMod.onthemechange = function (theme) {
        previewMod.updateTheme(theme);
    };
    layoutMod.onlayoutchange = function (page, layout) {
        if (page == status.page) {
            previewMod.updateLayout(layout);
            previewMod.resetPosition();
            typeMod.adjust();
            adjustMod.adjust();
        }
    };
    pageMod.onpagechange = function (page) {
        status.page = page;
        status.name = 'slide';

        initItemEditor();

        layoutMod.init();
        previewMod.init();
    };

    previewMod.onselect = function (name) {
        status.name = name;
        typeMod.init();
        adjustMod.init();
        itemMod.init();
    };

    typeMod.ontypechange = function (page, name, type) {
        if (page == status.page) {
            previewMod.updateItem(status.name);
            itemMod.init();
        }
    };

    adjustMod.onpositionchange = function () {
        layerMod.adjust();
        typeMod.adjust();
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

    resizeMod.onresize = function () {
        layerMod.adjust();
        typeMod.adjust();
        adjustMod.adjust();
        dialogMod.adjust();
    };

    return {
        init: init,
        load: load
    };
});