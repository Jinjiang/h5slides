define(function () {
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
        }
    };
});