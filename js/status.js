define(function () {
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
        }
    };
});