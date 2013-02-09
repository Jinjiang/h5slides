// designList **
// tplList **
// pageList **

// currentDesign **
// currentTpl **
// currentPage **
// currentLayout **

// title **
// titleDisplay **
// editingTitle **

// clickTpl **
// clickDesign **
// clickPage **

// addPage **
// clonePage **
// removePage **
// nextPage **
// prevPage **
// moveUpPage **
// moveDownPage **

// editTitle **

// previewItem **
// previewAll **
// editItem **

// hideEditor **
// showEditor **


requirejs(
    ['data', 'title', 'page', 'status', 'stage'],
    function (dataManager, titleManager, pageManager, statusManager, stageManager) {
        var currentPage = 0;
        var currentSlide = dataManager.getSlideList()[currentPage];

        var vm = {
            title: ko.observable(dataManager.getTitle()),
            editingTitle: ko.observable(false),
            designList: dataManager.getDesignList(),
            tplList: dataManager.getTplList(),
            pageList: ko.observableArray(dataManager.getPageList()),
            currentDesign: ko.observable(dataManager.getDesign()),
            currentPage: ko.observable(currentPage),
            currentTpl: ko.observable(currentSlide.template)
        };

        vm.currentSid = ko.computed(function () {
            var page = vm.currentPage();
            var pageList = vm.pageList();
            return pageList[page].sid;
        });

        vm.currentLayout = ko.computed(function () {
            var layout;
            var currentTpl = vm.currentTpl();
            vm.tplList.forEach(function (template) {
                if (template.key == currentTpl) {
                    layout = template.layout;
                }
            });
            return layout;
        });

        titleManager.init(vm);
        statusManager.init(vm);
        pageManager.init(vm);
        stageManager.init(vm);

        ko.applyBindings(vm);
        vm.previewAll();
        window.vm = vm;
    }
);
