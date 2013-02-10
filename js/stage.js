define(['data', 'types'], function (dataManager, typeMap) {
    var itemKeyMap = ['title', 'content', 'content2', 'subtitle', 'subtitle2'];
    var itemEditorLayer = $('#item-editor-layer');

    return {
        init: function (vm) {
            vm.previewItem = function (key) {
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var dom = $('#slide-' + key);
                var typeHelper = typeMap[itemData.type];

                if (typeHelper) {
                    typeHelper.preview(itemData, dom);
                }
            };
            vm.previewAll = function () {
                itemKeyMap.forEach(function (key) {
                    vm.previewItem(key);
                });
            };
            vm.editItem = function (key) {
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var dom = $('#slide-' + key);
                var typeHelper = typeMap[itemData.type];

                if (typeHelper) {
                    vm.currentItemDataCopy(JSON.parse(JSON.stringify(itemData)));
                    if (typeHelper.init && !typeHelper.initialized) {
                        typeHelper.init();
                        typeHelper.initialized = true;
                    }
                    typeHelper.showEditor(key, page, itemData, dom);
                }
            };
            vm.showEditor = function (vm, e) {
                e.stopPropagation();
                var dom = $(e.currentTarget);
                var key = dom.attr('data-key');
                vm.currentItem(key);
                vm.editItem(key);
            };
            vm.hideEditor = function (vm, e) {
                var target = $(e.target);
                var changed;

                if (itemEditorLayer.has(target).length > 0) {
                    return;
                }

                itemEditorLayer.empty().hide();

                vm.finishEdit();
            };
            vm.finishEdit = function () {
                changed = dataManager.checkItemChanged(
                        vm.currentPage(),
                        vm.currentItem(),
                        vm.currentItemDataCopy()
                    );

                if (changed) {
                    dataManager.save();
                    vm.previewItem(vm.currentItem());
                }

                vm.currentItem('');
            };
            vm.currentSid.subscribe(vm.previewAll);
        }
    };
});