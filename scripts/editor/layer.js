define(['lib/zepto',
    'status',
    'editor/layer/text',
    'editor/position'
], function ($, status, textLayer, positionManager) {
    var typeMap = {
        text: textLayer
    };

    var layerRoot = $('#item-layer');

    function adjust() {
        var offset = positionManager.offset(status.name);
        layerRoot.css('left', offset.left);
        layerRoot.css('top', offset.top);
        layerRoot.css('width', offset.width);
        layerRoot.css('height', offset.height);
    }

    function submit(value) {
        // mod.onsubmit && mod.onsubmit(value);
    }

    var mod = {
        init: function (type, title) {
            console.log('show dialog', type, title);
        },
        hide: function () {
            layerRoot.hide();
        }
    };

    return mod;
});