define(['lib/zepto',
    'editor/layer/text',
    'editor/position'
], function ($, textLayer, positionManager) {
    var typeMap = {
        text: textLayer
    };

    var layerRoot = $('#item-layer');
    var currentLayer;
    var currentName;

    function adjust() {
        var offset = positionManager.offset(currentName);
        layerRoot.css('left', offset.left);
        layerRoot.css('top', offset.top);
        layerRoot.css('width', offset.width);
        layerRoot.css('height', offset.height);
    }

    function submit(value) {
        mod.onsubmit && mod.onsubmit(value);
    }

    var mod = {
        setType: function (type) {
            if (currentLayer) {
                currentLayer.remove(layerRoot);
                currentLayer.onsubmit = null;
            }
            currentLayer = typeMap[type];
            if (currentLayer) {
                currentLayer.build(layerRoot);
                currentLayer.onsubmit = submit;
            }
        },
        update: function (name, value, title) {
            if (currentLayer) {
                currentName = name;
                currentLayer.update(layerRoot, value, title);
            }
        },
        show: function () {
            layerRoot.show();
            adjust();
            if (currentLayer) {
                currentLayer.show(layerRoot);
            }
        },
        hide: function () {
            layerRoot.hide();
        }
    };

    return mod;
});