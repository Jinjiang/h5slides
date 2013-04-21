define(['data'], function (dataManager) {
    var currentPage = 0;
    var currentSlide = dataManager.getSlideList()[currentPage];

    var vm = {
        title: ko.observable(dataManager.getTitle()),
        editingTitle: ko.observable(false),
        designList: dataManager.getDesignList(),
        transitionList: dataManager.getTransitionList(),
        layoutList: dataManager.getLayoutList(),
        tplList: dataManager.getTplList(),
        pageList: ko.observableArray(dataManager.getPageList()),
        currentDesign: ko.observable(dataManager.getDesign()),
        currentTransition: ko.observable(dataManager.getTransition()),
        currentPage: ko.observable(currentPage),
        currentLayout: ko.observable(currentSlide.layout),
        // currentTpl: ko.observable(currentSlide.template),
        currentItem: ko.observable(''),
        currentItemDataCopy: ko.observable(null)
    };

    vm.currentSid = ko.computed(function () {
        var page = vm.currentPage();
        var pageList = vm.pageList();
        return pageList[page] ? pageList[page].sid : '';
    });

    // vm.currentLayout = ko.computed(function () {
    //     var layout;
    //     var currentTpl = vm.currentTpl();
    //     vm.tplList.forEach(function (template) {
    //         if (template.key == currentTpl) {
    //             layout = template.layout;
    //         }
    //     });
    //     return layout;
    // });

    return vm;
});
