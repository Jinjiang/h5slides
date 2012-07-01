define(['lib/zepto',
    'data',
    'status',
    'editor/layer/text',
    'editor/position'
], function ($, data, status, textLayer, positionManager) {
    var layerSet = {
        text: textLayer
    };

    var layerRoot = $('#item-layer');
    var current;

    var page;
    var name;
    var prop;

    function adjust() {
        var offset = positionManager.offset(status.name);
        layerRoot.css('left', offset.left);
        layerRoot.css('top', offset.top);
        layerRoot.css('width', offset.width);
        layerRoot.css('height', offset.height);
    }

    function submit(value) {
        data.get(page).getItem(name).setProp(prop, value);
        mod.onsubmit && mod.onsubmit(page, name, prop, value);
    }

    var mod = {
        init: function (type, title) {
            if (current) {
                current.clear();
            }
            current = layerSet[type];
            if (current) {
                page = status.page;
                name = status.name;
                prop = status.prop;

                current.build(title);
                current.onsubmit = submit;
                layerRoot.attr('data-type', type).show();
                adjust();
            }
            else {
                page = name = prop = '';
                layerRoot.removeAttr('data-type').hide();
            }
        },
        hide: function () {
            if (current) {
                current.clear();
            }
            current = null;
            page = name = prop = '';
            layerRoot.removeAttr('data-type').hide();
        }
    };

    return mod;
});