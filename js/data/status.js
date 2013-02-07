define(['data/storage'], function (storage) {
    var ITEM_KEY_LIST = ['title', 'content', 'content2', 'subtitle', 'subtitle2'];
    var KEY_PARAMETER_LIST = ['content', 'config', 'position'];

    var status;

    status = {
        // design: ko.observable(storage.design),
        // transition: ko.observable(storage.transition),
        // title: ko.observable(storage.title),
        // pages: ko.observableArray(),
        // currentPage: ko.observable(0),
        // currentLayout: ko.computed(function () {
        //     var slideData = storage.slides[status.currentPage];
        //     return slideData.layout;
        // }),
        // currentItems: {}
    };

    ITEM_KEY_LIST.forEach(function (key) {
        // var itemStatus = {};
        // status.currentItems[key] = itemStatus;

        // KEY_PARAMETER_LIST.forEach(function (parameter) {
        //     itemStatus[parameter] = ko.computed(function () {
        //         var slideData = storage.slides[status.currentPage];
        //         var itemData = slideData[key];

        //         return itemData[parameter];
        //     });
        // });
    });

    return status;
});