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

// currentItem *
// stageItems[item].type *
// stageItems[item].value *
// stageItems[item].position *

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

// clickStage
// clickItem
// dblclickItem


requirejs(
    ['data', 'title', 'page', 'status', 'stage'],
    function (dataManager, titleManager, pageManager, statusManager, stageManager) {
        var itemKeyMap = ['title', 'content', 'content2', 'subtitle', 'subtitle2'];

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
            currentTpl: ko.observable(currentSlide.template),
            currentItem: ko.observable('slide')
        };

        vm.stageItems = {};

        itemKeyMap.forEach(function (key) {
            vm.stageItems[key] = {
                type: ko.computed(function () {
                    var itemData = dataManager.getItem(vm.currentPage(), key);
                    return itemData.type || 'text';
                }),
                value: ko.computed(function () {
                    var itemData = dataManager.getItem(vm.currentPage(), key);
                    return itemData.value || '';
                }),
                position: ko.computed(function () {
                    var itemData = dataManager.getItem(vm.currentPage(), key);
                    return JSON.stringify(itemData.position || '');
                })
            };
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
        window.vm = vm;
    }
);
