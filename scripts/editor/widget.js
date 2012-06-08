define(function () {
    var widgetMap = {};

    function preview(item, itemData) {
        var type = itemData.getType();
        var widget = getByType(type);
        if (widget) {
            if (widget.preview) {
                widget.preview(item, itemData);
            }
            else {
                render(item, itemData);
            }
        }
        else {
            console.log('no preview for', type, item, itemData);
        }
    }
    function render(item, itemData) {
        var type = itemData.getType();
        var widget = getByType(type);
        if (widget) {
            widget.render(item, itemData);
        }
        else {
            console.log('no render for', type, item, itemData);
        }
    }
    function getPropList(type) {
        var widget = getByType(type);
        return widget.propList;
    }
    function getEditorConfig(type) {
        var widget = getByType(type);
        if (widget) {
            return widget.editorConfig;
        }
        else {
            return null;
        }
    }
    function getByType(type) {
        return widgetMap[type];
    }
    function regType(type, widgetData) {
        widgetMap[type] = widgetData;
    }

    var mod = {
        get: getByType,
        reg: regType,
        preview: preview,
        render: render,
        getPropList: getPropList,
        getEditorConfig: getEditorConfig
    };

    return mod;
});