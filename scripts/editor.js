define(['data',
    'editor/title', 'editor/theme',
    'editor/page', 'editor/layout',
    'editor/item', 'editor/preview',
    'editor/dialog', 'editor/layer',
    'editor/type', 'editor/adjust'
], function (
    data, titleMod, themeMod, pageMod, layoutMod, itemMod,
    previewMod, dialogMod, layerMod, typeMod, adjustMod
) {
    var currentPage = 1;
    var currentName = '';

    function init() {
        console.log('init editor');
    }

    function load() {
        dialogMod.hide();
        layerMod.hide();
        typeMod.hide();
        adjustMod.hide();

        var currentSlide = data.getSlide(currentPage);

        titleMod.update();
        themeMod.update();
        pageMod.update(currentPage);
        layoutMod.update(currentSlide.getLayout());
        itemMod.update(currentPage, '');
        previewMod.updateTheme(data.getTheme());
        previewMod.updateSlide(currentSlide);
        previewMod.focus('');
    }

    themeMod.onthemechange = function (theme) {
        preview.updateTheme(theme);
    };
    pageMod.onpagechange = function (page) {
        dialogMod.hide();
        layerMod.hide();
        typeMod.hide();
        adjustMod.hide();

        currentPage = page;
        currentName = '';
        var currentSlide = data.getSlide(currentPage);
        previewMod.updateSlide(currentSlide);
        previewMod.focus();
    };
    layoutMod.onlayoutchange = function (layout) {
        previewMod.updateLayout(layout);
    };
    itemMod.onpropchange = function (prop, value) {
        if (prop.match(/^-val-/)) {
            previewMod.updateContent(currentName, value);
        }
        else {
            previewMod.updateStyle(currentName, prop, value);
        }
    };
    itemMod.onpopupdialog = function (type, prop) {
        dialogMod.setType(type);
        dialogMod.update(currentPage, currentName, prop);
    };
    itemMod.ondisplaylayer = function (type) {
        layerMod.setType(type);
        layerMod.update(currentPage, currentName);
    };

    previewMod.onselect = function (name) {
        currentName = name;
        typeMod.update(currentName);
        typeMod.show(currentName);
    };
    previewMod.onpopupdialog = function (name, type) {
        if (currentName != name) {
            typeMod.update(currentName);
            typeMod.show(currentName);
        }
        dialogMod.setType(type);
        dialogMod.update(currentPage, currentName, '-val-' + type);
    };
    previewMod.ondisplaylayer = function (name, type) {
        if (currentName != name) {
            typeMod.update(currentName);
            typeMod.show(currentName);
        }
        layerMod.setType(type);
        layerMod.update(currentPage, currentName);
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
        previewMod.updatePosition(offset);
    };
    adjustMod.onresize = function (offset) {
        previewMod.updatePosition(offset);
    };

    return {
        init: init,
        load: load
    };
});