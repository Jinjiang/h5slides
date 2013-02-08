define(['data'], function (dataManager) {
    return {
        init: function (vm) {
            vm.clickTpl = function (templateData, e) {
                vm.currentTpl(templateData.key);
            };
            vm.clickPage = function (pageData, e) {
                var $index = vm.pageList().indexOf(pageData);
                vm.currentPage($index);
            };
            vm.clickDesign = function (designData, e) {
                vm.currentDesign(designData.key);
            };

            vm.currentTpl.subscribe(function (newValue) {
                var page = vm.currentPage();
                var slide = dataManager.getSlide(page);
                slide.template = newValue;
            });
            vm.currentPage.subscribe(function (newValue) {
                var slide = dataManager.getSlide(newValue);
                vm.currentTpl(slide.template);
            });
            vm.currentDesign.subscribe(function (newValue) {
                dataManager.getData().design = newValue;
            });
        }
    };
});