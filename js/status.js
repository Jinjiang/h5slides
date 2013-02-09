define(['data'], function (dataManager) {
    var cssLinkMap = {};

    function loadCssLink(key) {
        if (!cssLinkMap[key]) {
            cssLink = $('<link rel="stylesheet">').attr('href', 'css/design/' + key + '.css');
            $('head').append(cssLink);
            cssLinkMap[key] = cssLink;
        }
    }

    return {
        init: function (vm) {
            loadCssLink(vm.currentDesign());

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

                loadCssLink(key);
                vm.currentDesign(key);
            };

            vm.currentTpl.subscribe(function (newValue) {
                var page = vm.currentPage();
                dataManager.changeTemplate(page, newValue);
            });
            vm.currentPage.subscribe(function (newValue) {
                var slideData = dataManager.getSlide(newValue);
                vm.currentTpl(slideData.template);
            });
            vm.currentDesign.subscribe(function (newValue) {
                dataManager.getData().design = newValue;
            });
        }
    };
});