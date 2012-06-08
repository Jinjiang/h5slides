define(['editor/widget/slide',
    'editor/widget/blank',
    'editor/widget/text',
    'editor/widget/img'
], function (Slide, Blank, Text, Img) {
    var widgetMap = {};

    function preview(item, itemData) {
        var type = itemData.getType();
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
        return widgetMap[type];
    }
    function reg(type, widgetData) {
        widgetMap[type] = widgetData;
    }

    var mod = {
        get: get,
        reg: reg,
        preview: preview,
        render: render,
        getPropList: getPropList,
        getEditorConfig: getEditorConfig
    };

    reg('slide', Slide);
    reg('', Blank);
    reg('text', Text);
    reg('img', Img);

    return mod;
});