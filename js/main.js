// designList **
// tplList **
// pageList **

// currentDesign **
// currentTpl **
// currentPage **
// currentLayout **

// title *
// editingTitle *

// currentItem
// current<item>type
// current<item>html
// current<item>position

// clickTpl *
// clickDesign
// clickPage *

// addPage *
// clonePage *
// removePage *
// nextPage *
// prevPage *
// moveUpPage *
// moveDownPage *

// clickSave
// clickCancel

// toggleTitle

// clickStage
// clickItem
// dblclickItem


requirejs(
    ['data', 'title', 'page', 'status'],
    function (dataManager, titleManager, pageManager, statusManager) {

        var currentPage = 0;

        var vm = {
            title: ko.observable(dataManager.getTitle()),
            editingTitle: ko.observable(false),
            designList: dataManager.getDesignList(),
            tplList: dataManager.getTplList(),
            pageList: ko.observableArray(dataManager.getPageList()),
            currentDesign: ko.observable(dataManager.getDesign()),
            currentPage: ko.observable(currentPage),
            currentTpl: ko.observable(dataManager.getSlideList()[currentPage].template)
        };

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

        ko.applyBindings(vm);
        window.vm = vm;
    }
);
