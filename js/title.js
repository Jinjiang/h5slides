define(['data'], function (dataManager) {
    return {
        init: function (vm) {
            vm.editTitle = function () {
                vm.editingTitle(true);
            };
            vm.titleDisplay = ko.computed(function () {
                var title = vm.title();
                if (title.trim()) {
                    return title;
                }
                else {
                    return 'Edit title...';
                }
            });

            vm.title.subscribe(function (newValue) {
                dataManager.setTitle(newValue);
                dataManager.save();
            });
        }
    };
});