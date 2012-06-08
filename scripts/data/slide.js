define(['data/item'], function (Item) {
    return function (jsonData) {
        var DEFAULT_ITEM_NAME_MAP = {
            title: true,
            content: true,
            content2: true,
            subtitle: true,
            subtitle2: true,
            slide: true
        };

        var items = {};
        var currentLayout = '';

        this.getLayout = function () {
            return currentLayout || 'normal';
        };
        this.setLayout = function (layout) {
            currentLayout = (layout || '').toString();
        };

        this.getItem = function (name) {
            name = (name || '').toString();
            var item = items[name];
            if (!item && DEFAULT_ITEM_NAME_MAP[name]) {
                item = new Item();
                items[name] = item;
                if (name === 'slide') {
                    item.setType('slide');
                }
            }
            return item;
        };
        this.setItem = function (name, item) {
            name = (name || '').toString();
            items[name] = item;
            if (name === 'slide') {
                item.setType('slide');
            }
        };
        this.removeItem = function (name) {
            name = (name || '').toString();
            delete items[name];
        };

        this.getExtraNames = function () {
            var extraNameList = [];
            for (var name in items) {
                if (!DEFAULT_ITEM_NAME_MAP[name]) {
                    extraNameList.push(name);
                }
            }
            return extraNameList;
        };

        this.getTitle = function () {
            var titleItem = this.getItem('title');
            return titleItem.getValue() || '';
        };

        this.fromJSON = function (jsonData) {
            currentLayout = '';
            items = {};
            if (jsonData) {
                currentLayout = (jsonData.layout || '').toString();
                if (jsonData.items) {
                    for (var name in jsonData.items) {
                        var item = new Item(jsonData.items[name]);
                        items[name] = item;
                        if (name === 'slide') {
                            item.setType('slide');
                        }
                    }
                }
            }
        };
        this.toJSON = function () {
            var jsonData = {
                items: {}
            };
            if (currentLayout && currentLayout !== 'normal') {
                jsonData.layout = currentLayout;
            }
            for (var name in items) {
                var item = items[name];
                if (item && !item.isEmpty()) {
                    jsonData.items[name] = item.toJSON();
                }
            }
            return jsonData;
        };

        this.fromJSON(jsonData);
    };
})