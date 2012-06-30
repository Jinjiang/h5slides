define([
    'editor/title', 'editor/theme',
    'editor/page', 'editor/layout',
    'editor/item', 'editor/preview',
    'editor/dialog', 'editor/layer',
    'editor/type', 'editor/adjust',
    'editor/resize'
], function (
    titleMod, themeMod, pageMod, layoutMod, itemMod,
    previewMod, dialogMod, layerMod, typeMod, adjustMod, resizeMod
) {
    return {
        titleMod: titleMod,
        themeMod: themeMod,
        pageMod: pageMod,
        layoutMod: layoutMod,
        itemMod: itemMod,
        previewMod: previewMod,
        dialogMod: dialogMod,
        layerMod: layerMod,
        typeMod: typeMod,
        adjustMod: adjustMod,
        resizeMod: resizeMod
    };
});