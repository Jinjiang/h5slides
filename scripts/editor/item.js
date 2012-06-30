define(['data', 'status', 'editor/widget', 'editor/prop'], function (data, status, widgetManager, propManager) {
    var currentItem;
    var propList = [];
    var propListRoot = $('#panel-style-list');

    var defaultTypeMap = {
        slide: 'slide',
        title: 'text',
        subtitle: 'text',
        subtitle2: 'text',
        content: 'text',
        content2: 'text'
    };

    function init() {
        var name = status.name;
        var page = status.page;

        var item = data.get(page).getItem(name);
        var type = item.getType();
        type = type || defaultTypeMap[name] || '';

        var propDataList = widgetManager.getPropList(type);

        empty();

        $.each(propDataList, function (i, propData) {
            var Prop = propManager.get(propData.key);

            if (!Prop) {
                return;
            }

            var prop = new Prop(page, name, propData.key, propData.title);

            propList.push(prop);
            propListRoot.append(prop.li);

            prop.onchange = function (value) {
                if (status.page == page && status.name == name) {
                    mod.onpropchange && mod.onpropchange(page, name, propData.key, value);
                    prop.update(value);
                }
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

    function update(key, value) {
        $.each(propList, function (i, prop) {
            if (prop.key == key) {
                prop.update(value);
            }
        });
    }

    var mod = {
        init: init,
        update: update
    };

    return mod;
});