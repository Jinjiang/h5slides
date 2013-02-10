// designList **
// tplList **
// pageList **

// currentDesign **
// currentTpl **
// currentPage **
// currentLayout **
// currentItem **
// currentItemDataCopy *

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
    ['vm', 'title', 'page', 'status', 'stage'],
    function (vm, titleManager, pageManager, statusManager, stageManager) {
        titleManager.init(vm);
        statusManager.init(vm);
        pageManager.init(vm);
        stageManager.init(vm);

        ko.applyBindings(vm);
        vm.previewAll();
        window.vm = vm;
    }
);
