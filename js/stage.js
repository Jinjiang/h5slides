define(['data', 'types', 'ctrl'], function (dataManager, typeMap, ctrlManager) {
    var itemKeyMap = ['title', 'content', 'content2', 'subtitle', 'subtitle2'];

    return {
        init: function (vm) {
            vm.previewItem = function (key) {
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var dom = $('#slide-' + key);
                var output = dom.find('.output');
                var typeHelper = typeMap[itemData.type];

                output.empty();

                if (typeHelper) {
                    typeHelper.preview(itemData, output);
                }
            };
            vm.previewAll = function () {
                itemKeyMap.forEach(function (key) {
                    vm.previewItem(key);
                });
            };

            vm.resizeItem = function (key) {
                var page = vm.currentPage();
                var layout = dataManager.getSlide(page).layout;
                var itemData = dataManager.getItem(page, key);
                var dom = $('#slide-' + key);
                var output = dom.find('.output');
                var typeHelper = typeMap[itemData.type];

                if (typeHelper && typeHelper.resize) {
                    typeHelper.resize(itemData, output);
                }

                ctrlManager.update(dom, itemData.type, dataManager.getTypeList(layout, key));
            };
            vm.resizeAll = function () {
                itemKeyMap.forEach(function (key) {
                    vm.resizeItem(key);
                });
            };

            vm.clickItem = function (vm, e) {
                var output = $(e.currentTarget);
                e.stopPropagation();
                vm.editItem(output);
            };

            vm.editItem = function (output) {
                var dom = output.parent();
                var key = dom.attr('data-key');
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var typeHelper = typeMap[itemData.type];

                vm.currentItem(key);

                if (typeHelper) {
                    vm.currentItemDataCopy(JSON.parse(JSON.stringify(itemData)));
                    if (typeHelper.init && !typeHelper.initialized) {
                        typeHelper.init();
                        typeHelper.initialized = true;
                    }
                    typeHelper.edit(key, page, itemData, output);
                }
            };

            vm.confirmChangeType = function (output, newType) {
                var dom = output.parent();
                var key = dom.attr('data-key');
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var type = itemData.type;

                var dialog = $('#confirm-dialog');

                vm.currentItem(key);

                if (type === newType) {
                    return;
                }

                if (itemData.value) {
                    dialog.find('.modal-header h3').text('Change Type');
                    dialog.find('.modal-body').text('Are you sure?');
                    dialog.find('[data-action="yes"]').on('click', function (e) {
                        vm.changeType(output, newType);
                    });
                    dialog.on('hide', function () {
                        dialog.find('modal-header h3').text('Change Type');
                        dialog.find('modal-body').text('Are you sure?');
                        dialog.find('[data-action="yes"]').off('click');
                    });
                    dialog.modal('show');
                }
                else {
                    vm.changeType(output, newType);
                }
            },
            vm.changeType = function (output, type) {
                var dom = output.parent();
                var key = dom.attr('data-key');
                var page = vm.currentPage();

                vm.currentItem(key);
                dataManager.changeType(page, key, type);
                dataManager.save();
                vm.previewItem(key);

                ctrlManager.update(dom, type);
            }

            vm.clearItem = function (output) {
                var dom = output.parent();
                var key = dom.attr('data-key');
                var page = vm.currentPage();

                vm.currentItem(key);

                dataManager.clearItem(page, key);
                dataManager.save();
                vm.previewItem(key);
            };

            vm.finishEdit = function () {
                var page = vm.currentPage();
                var key = vm.currentItem();
                var newPageData;

                var changed = dataManager.checkItemChanged(
                        page, key,
                        vm.currentItemDataCopy()
                    );
                if (changed) {
                    if (key == 'title') {
                        newPageData = JSON.parse(JSON.stringify(vm.pageList.slice(page, page + 1)[0]));
                        newPageData.title = dataManager.getValue(page, key);
                        vm.pageList.splice(page, 1, newPageData);
                    }
                    dataManager.save();
                    vm.previewItem(key);
                }

                vm.currentItem('');
            };

            vm.currentSid.subscribe(function () {
                setTimeout(vm.previewAll, 13);
            });

            ctrlManager.init($('#editor-stage'), vm);
            vm.resizeAll();
        }
    };
});