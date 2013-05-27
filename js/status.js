define(['data', 'design', 'transition'], function (dataManager, designManager, transitionManager) {
    var activeItem;
    // var ignoreTypeChange;

    return {
        init: function (vm) {
            designManager.loadCssLink(vm.currentDesign());

            vm.clickLayout = function (layoutData, e) {
                vm.currentLayout(layoutData.key);
            };
            // vm.clickTpl = function (templateData, e) {
            //     vm.currentTpl(templateData.key);
            // };
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
            vm.clickTransition = function (transitionData, e) {
                var key = transitionData.key;
                vm.currentTransition(key);
            };
            vm.resetData = function (newData) {
                if (newData === vm) {
                    newData = null;
                }
                dataManager.reset(newData);
                dataManager.stopStorage();

                var currentPage = 0;
                var currentSlide = dataManager.getSlideList()[currentPage];

                vm.title(dataManager.getTitle()),
                vm.currentDesign(dataManager.getDesign());
                vm.currentPage(currentPage);
                vm.currentLayout(currentSlide.layout);
                // vm.currentTpl(currentSlide.template);
                vm.pageList(dataManager.getPageList());

                dataManager.startStorage();
                dataManager.save();
            };

            vm.currentLayout.subscribe(function (newValue) {
                var page = vm.currentPage();
                dataManager.changeLayout(page, newValue);
                setTimeout(vm.resizeAll, 13);
                dataManager.save();
            });
            // vm.currentTpl.subscribe(function (newValue) {
            //     var page = vm.currentPage();
            //     var changedKeys = dataManager.changeTemplate(page, newValue, ignoreTypeChange);

            //     changedKeys.forEach(function (key) {
            //         vm.previewItem(key);
            //     });

            //     vm.resizeAll();
            //     dataManager.save();
            // });
            vm.currentPage.subscribe(function (newValue) {
                var slideData = dataManager.getSlide(newValue);
                dataManager.stopStorage();
                vm.currentLayout(slideData.layout);
                // ignoreTypeChange = true;
                // vm.currentTpl(slideData.template);
                // ignoreTypeChange = false;
                dataManager.startStorage();
            });
            vm.currentDesign.subscribe(function (newValue) {
                dataManager.setDesign(newValue);
                dataManager.save();
            });
            vm.currentTransition.subscribe(function (newValue) {
                transitionManager.change(newValue);
                dataManager.setTransition(newValue);
                dataManager.save();
            });
            vm.currentItem.subscribe(function (newValue) {
                if (activeItem) {
                    activeItem.removeClass('active');
                }
                if (newValue) {
                    activeItem = $('#slide-' + newValue).addClass('active');
                }
            });
        }
    };
});