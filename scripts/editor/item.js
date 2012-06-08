define(['data', 'editor/widget', 'editor/prop'], function (data, widgetManager, propManager) {
    var currentItem;
    var propList = [];
    var propListRoot = $('#panel-style-list');

    function update(page, name) {
        var name = (name || 'slide').toString();
        var slide = data.get(page);
        currentItem = slide.getItem(name);

        var type = currentItem.getType();
        var propDataList = widgetManager.getPropList(type);

        empty();

        $.each(propDataList, function (i, propData) {
            var key = propData.key;
            var value = currentItem.getProp(key);

            var Prop = propManager.get(key);
            if (!Prop) {
                return;
            }
            var prop = new Prop(value, propData.title);

            propList.push(prop);
            propListRoot.append(prop.li);

            prop.onchange = function (value) {
                mod.onpropchange && mod.onpropchange(key, value);
            };
        });
    }

    function empty() {
        $.each(propList, function (i, prop) {
            prop.remove();
        });
        propList = [];
        propListRoot.empty();
    }

    var mod = {
        update: update
    };

    return mod;
});