define(['lib/zepto', 'data',
    'editor/title', 'editor/theme',
    'editor/page', 'editor/layout',
    'editor/item', 'editor/preview',
    'editor/dialog', 'editor/layer',
    'editor/type', 'editor/adjust',
    'editor/resize'
], function (
    $, data, titleMod, themeMod, pageMod, layoutMod, itemMod,
    previewMod, dialogMod, layerMod, typeMod, adjustMod, resizeMod
) {
    var currentPage = 1;
    var currentName = '';

    function init() {
        $('#splash').css('top', '-100%').css('bottom', '100%');
    }

    function load() {
        initItemEditor();

        var currentSlide = data.get(currentPage);

        titleMod.update(data.getTitle());
        themeMod.update(data.getTheme());
        layoutMod.update(currentPage, currentSlide.getLayout());
        pageMod.build();
        pageMod.updateCurrent(currentPage);
        previewMod.updateTheme(data.getTheme());
        previewMod.updateSlide(currentPage, currentSlide);
        previewMod.focus('');
    }

    function initItemEditor() {
        dialogMod.hide();
        layerMod.hide();
        typeMod.hide();
        adjustMod.hide();
    }

    themeMod.onthemechange = function (theme) {
        preview.updateTheme(theme);
    };
    layoutMod.onlayoutchange = function (layout) {
        previewMod.updateLayout(layout);
    };
    pageMod.onpagechange = function (page) {
        initItemEditor();

        currentPage = page;
        currentName = '';

        var currentSlide = data.get(currentPage);

        layoutMod.update(currentPage, currentSlide.getLayout());
        previewMod.updateSlide(currentPage, currentSlide);
        previewMod.focus();
    };
    itemMod.onpropchange = function (prop, value) {
        if (prop.match(/^-val-/)) {
            previewMod.updateContent(currentName, value);
        }
        else {
            previewMod.updateStyle(currentName, prop, value);
        }
    };

    function select(name) {
        currentName = name;
        typeMod.update(currentName);
        typeMod.show(currentName);
        adjustMod.update(currentName);
        adjustMod.show(currentName);
        itemMod.update(currentPage, currentName);
    }

    previewMod.onselect = function (name) {
        select(name);
    };

    dialogMod.onsubmit = function (prop, value) {
        if (prop.match(/^-val-/)) {
            previewMod.updateContent(currentName, value);
        }
        else {
            previewMod.updateStyle(currentName, prop, value);
        }
    };
    dialogMod.onreset = function (prop) {
        if (prop.match(/^-val-/)) {
            previewMod.updateContent(currentName, '');
        }
        else {
            previewMod.updateStyle(currentName, prop, '');
        }
    };

    layerMod.onchange = function (value) {
        previewMod.updateContent(currentName, value);
    };
    layerMod.onsubmit = function (value) {
        previewMod.updateContent(currentName, value);
    };
    layerMod.onreset = function () {
        previewMod.updateContent(currentName, '');
    };

    typeMod.ontypechange = function (type) {
        previewMod.updateItem(currentName);
    };
    adjustMod.onmove = function (offset) {
        previewMod.updatePosition(currentName, offset);
    };
    adjustMod.onresize = function (offset) {
        previewMod.updatePosition(currentName, offset);
    };

    return {
        init: init,
        load: load
    };
});