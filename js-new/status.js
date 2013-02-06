define(['data'], function (data) {
    var ITEM_KEY_LIST = ['title', 'content', 'content2', 'subtitle', 'subtitle2'];
    var KEY_PARAMETER_LIST = ['content', 'config', 'position'];

    var status;

    function Page(id, title) {
        this.id = id;
        this.title = ko.observable(title);
    }

    status = {
        design: ko.observable(data.design),
        transition: ko.observable(data.transition),
        title: ko.observable(data.title),
        pages: ko.observableArray(),
        currentPage: ko.observable(0),
        currentLayout: ko.computed(function () {
            var slideData = data.slides[status.currentPage];
            return slideData.layout;
        }),
        currentItems: {}
    };

    ITEM_KEY_LIST.forEach(function (key) {
        var itemStatus = {};
        status.currentItems[key] = itemStatus;

        KEY_PARAMETER_LIST.forEach(function (parameter) {
            itemStatus[parameter] = ko.computed(function () {
                var slideData = data.slides[status.currentPage];
                var itemData = slideData[key];

                return itemData[parameter];
            });
        });
    });
});