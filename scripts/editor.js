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
        /*dialogMod.hide();
        layerMod.hide();
        typeMod.hide();
        adjustMod.hide();*/

        var currentSlide = data.get(currentPage);

        titleMod.update(data.getTitle());
        themeMod.update(data.getTheme());
        layoutMod.update(currentPage, currentSlide.getLayout());
        pageMod.build();
        pageMod.updateCurrent(currentPage);
        /*itemMod.update(currentPage, '');*/
        previewMod.updateTheme(data.getTheme());
        previewMod.updateSlide(currentPage, currentSlide);
        previewMod.focus('');

        console.log('load', currentPage, currentSlide);
    }

    themeMod.onthemechange = function (theme) {
        preview.updateTheme(theme);
        console.log('onthemechange', theme);
    };
    layoutMod.onlayoutchange = function (layout) {
        previewMod.updateLayout(layout);
        console.log('onlayoutchange', layout);
    };
    pageMod.onpagechange = function (page) {
        // dialogMod.hide();
        // layerMod.hide();
        // typeMod.hide();
        // adjustMod.hide();

        currentPage = page;
        currentName = '';
        var currentSlide = data.get(currentPage);
        layoutMod.update(currentPage, currentSlide.getLayout());
        previewMod.updateSlide(currentPage, currentSlide);
        previewMod.focus();
        console.log('onpagechange', currentPage, currentSlide);
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
        // typeMod.update(currentName);
        // typeMod.show(currentName);
        console.log('onselect', name);
    };
    previewMod.onpopupdialog = function (name, type) {
        if (currentName != name) {
            typeMod.update(currentName);
            typeMod.show(currentName);
        }
        // dialogMod.setType(type);
        // dialogMod.update(currentPage, currentName, '-val-' + type);
        console.log('onpopuplayer', name, type);
    };
    previewMod.ondisplaylayer = function (name, type) {
        if (currentName != name) {
            // typeMod.update(currentName);
            // typeMod.show(currentName);
        }
        // layerMod.setType(type);
        // layerMod.update(currentPage, currentName);
        console.log('ondisplaylayer', name, type);
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