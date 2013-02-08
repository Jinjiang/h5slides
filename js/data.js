define(function () {
    var templateList = [
            {key: 'normal', layout: 'normal', typeMap: {title: 'text', content: 'text'}},
            {key: 'title', layout: 'title', typeMap: {title: 'text', content: 'text'}},
            {key: 'subtitle', layout: 'subtitle', typeMap: {title: 'text', content: 'text'}},
            {key: 'picture', layout: 'normal', typeMap: {title: 'text', content: 'picture'}}
        ];
    var designList = [
            {key: 'default', title: 'Default'},
            {key: 'revert', title: 'Revert'}
        ];

    var data = {
        design: 'default',
        title: 'Test A',
        slides: [
            {sid: 'A', template: 'title', layout: 'title', items: {title: {type: 'text', value: 'Hello World'}, content: {type: 'text', value: 'test info'}}},
            {sid: 'B', template: 'subtitle', layout: 'subtitle', items: {title: {type: 'text', value: 'Content'}, content: {type: 'text', value: 'this is the menu here.'}}},
            {sid: 'C', template: 'picture', layout: 'normal', items: {title: {type: 'text', value: 'Favicon'}, content: {type: 'img', value: 'http://www.baidu.com/favicon.ico'}}}
        ]
    };

    var manager = {
        getTplList: function () {
            return templateList;
        },
        getDesignList: function () {
            return designList;
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
        getSlideList: function () {
            return data.slides;
        },
        getPageList: function () {
            var list = [];
            data.slides.forEach(function (slideData) {
                list.push({sid: slideData.sid, title: slideData.items.title.value});
            });
            return list;
        },
        getSlide: function (page) {
            return data.slides[page];
        },
        getItem: function (page, key) {
            var slideData = data.slides[page] || {};
            var itemMap = slideData.items || {};
            var item = itemMap[key] || {};
            return item;
        }
    };

    return manager;
});