define(['editor/prop/color',
    'editor/prop/backgroundimage',
    'editor/prop/text',
    'editor/prop/img'
], function (PropColor, PropBackgroundImage, PropText, PropImg) {
    var propMap = {};

    function get(key) {
        return propMap[key];
    }
    function reg(key, Prop) {
        propMap[key] = Prop;
    }

    var mod = {
        get: get,
        reg: reg
    };

    reg('color', PropColor);
    reg('background-image', PropBackgroundImage);
    reg('-val-text', PropText);
    reg('-val-title', PropText);
    reg('-val-img', PropImg);

    return mod;
});