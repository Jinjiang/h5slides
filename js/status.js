define(['data', 'design'], function (dataManager, designManager) {
    return {
        init: function (vm) {
            designManager.loadCssLink(vm.currentDesign());

            vm.clickTpl = function (templateData, e) {
                vm.currentTpl(templateData.key);
            };
            vm.clickPage = function (pageData, e) {
                var $index = vm.pageList().indexOf(pageData);
                vm.currentPage($index);
            };
            vm.clickDesign = function (designData, e) {
                var key = designData.key;
                var cssLink;

                designManager.loadCssLink(key);
                vm.currentDesign(key);
            };
            vm.resetData = function () {
                dataManager.reset();
                dataManager.stopStorage();

                var currentPage = 0;
                var currentSlide = dataManager.getSlideList()[currentPage];

                vm.title(dataManager.getTitle()),
                vm.currentDesign(dataManager.getDesign());
                vm.currentPage(currentPage);
                vm.currentTpl(currentSlide.template);
                vm.pageList(dataManager.getPageList());

                dataManager.startStorage();
                dataManager.save();
            };

            vm.currentTpl.subscribe(function (newValue) {
                var page = vm.currentPage();
                var changedKeys = dataManager.changeTemplate(page, newValue);

                changedKeys.forEach(function (key) {
                    vm.previewItem(key);
                });

                vm.resizeAll();
                dataManager.save();
            });
            vm.currentPage.subscribe(function (newValue) {
                var slideData = dataManager.getSlide(newValue);
                dataManager.stopStorage();
                vm.currentTpl(slideData.template);
                dataManager.startStorage();
            });
            vm.currentDesign.subscribe(function (newValue) {
                dataManager.setDesign(newValue);
                dataManager.save();
            });
        }
    };
});