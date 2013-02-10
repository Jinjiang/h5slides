// set data
// set title *
// set design *
// add/clone/remove slide *
// move slide *
// change template *
// edit item
// reset

define(['storage'], function (storage) {
    var templateList = [
            {key: 'normal', layout: 'normal', typeMap: {title: 'text', content: 'text'}},
            {key: 'title', layout: 'title', typeMap: {title: 'text', content: 'text'}},
            {key: 'subtitle', layout: 'subtitle', typeMap: {title: 'text', content: 'text'}},
            {key: 'picture', layout: 'normal', typeMap: {title: 'text', content: 'img'}}
        ];
    var designList = [
            {key: 'default', title: 'Default'},
            {key: 'revert', title: 'Revert'}
        ];

    var defaultData = {
        design: 'default',
        title: 'Test A',
        slides: [
            {sid: 'A', template: 'title', layout: 'title', items: {title: {type: 'text', value: 'Hello World'}, content: {type: 'text', value: 'test info'}}},
            {sid: 'B', template: 'subtitle', layout: 'subtitle', items: {title: {type: 'text', value: 'Content'}, content: {type: 'text', value: 'this is the menu here.'}}},
            {sid: 'C', template: 'picture', layout: 'normal', items: {title: {type: 'text', value: 'Favicon'}, content: {type: 'img', value: 'http://www.baidu.com/favicon.ico'}}}
        ]
    };

    var data = storage.readData() || JSON.parse(JSON.stringify(defaultData));

    var onStorage = true;

    var manager = {
        getTplList: function () {
            return templateList;
        },
        getDesignList: function () {
            return designList;
        },
        getTplByKey: function (key) {
            var result;
            templateList.forEach(function (tplData) {
                if (tplData.key == key) {
                    result = tplData;
                }
            });
            return result;
        },
        getDesignByKey: function (key) {
            var result;
            designList.forEach(function (designData) {
                if (designData.key == key) {
                    result = designData;
                }
            });
            return result;
        },

        getData: function () {
            return data;
        },
        getDesign: function () {
            return data.design;
        },
        getTitle: function () {
            return data.title;
        },
        setData: function (newData) {
            data = newData;
        },
        setDesign: function (newDesign) {
            data.design = newDesign;
        },
        setTitle: function (newTitle) {
            data.title = newTitle;
        },

        getPageList: function () {
            var list = [];
            data.slides.forEach(function (slideData) {
                list.push({sid: slideData.sid, title: slideData.items.title.value});
            });
            return list;
        },

        getSlideList: function () {
            return data.slides;
        },
        getSlide: function (page) {
            return data.slides[page];
        },
        getSlideById: function (sid) {
            var result;
            data.slides.forEach(function (slideData) {
                if (slideData.sid == sid) {
                    result = slideData;
                }
            });
            return result;
        },
        getItem: function (page, key) {
            var slideData = data.slides[page] || {};
            var itemMap = slideData.items || {};
            var item = itemMap[key] || {};
            return item;
        },

        changeTemplate: function (page, template) {
            var slideData = data.slides[page];
            var tplData = manager.getTplByKey(template);
            var hasNewLayout = (slideData.layout != tplData.layout);

            slideData.template = template;

            if (hasNewLayout) {
                slideData.layout = tplData.layout;
            }

            $.each(tplData.typeMap, function (key, type) {
                var itemData = slideData.items[key];

                if (hasNewLayout) {
                    itemData.position = {};
                }
                if (!itemData.value) {
                    itemData.type = type;
                    itemData.config = {};
                    vm.previewItem(key);
                }
            });
        },
        setValue: function (page, key, value) {
            var slideData = data.slides[page];
            var item = slideData.items[key];
            item.value = value;
        },

        startStorage: function () {
            onStorage = true;
        },
        stopStorage: function () {
            onStorage = false;
        },

        reset: function () {
            data = JSON.parse(JSON.stringify(defaultData));
        },
        save: function () {
            if (onStorage) {
                storage.saveData(data);
            }
        }
    };

    window.data = data;

    return manager;
});