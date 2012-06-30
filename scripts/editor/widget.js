define(['editor/widget/index'], function (widgetSet) {
    var defaultTypeMap = {
        slide: 'slide',
        title: 'text',
        subtitle: 'text',
        subtitle2: 'text',
        content: 'text',
        content2: 'text'
    };

    function preview(item, itemData) {
        var type = itemData.getType();
        if (!type) {
            type = defaultTypeMap[item.attr('data-item')] || '';
        }
        var widget = get(type);
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
        if (!type) {
            type = defaultTypeMap[item.attr('data-item')] || '';
        }
        var widget = get(type);
        if (widget) {
            widget.render(item, itemData);
        }
        else {
            console.log('no render for', type, item, itemData);
        }
    }
    function getPropList(type) {
        var widget = get(type);
        if (widget) {
            return widget.propList;
        }
        else {
            return [];
        }
    }
    function getEditorConfig(type) {
        var widget = get(type);
        if (widget) {
            return widget.editorConfig;
        }
        else {
            return {};
        }
    }
    function get(type) {
        return widgetSet[type];
    }
    function reg(type, widgetData) {
        widgetSet[type] = widgetData;
    }

    var mod = {
        get: get,
        reg: reg,
        preview: preview,
        render: render,
        getPropList: getPropList,
        getEditorConfig: getEditorConfig
    };

    return mod;
});