define(function () {
    return {
        init: function (vm) {
            vm.addPage = function () {
                var $index = vm.currentPage() + 1;
                vm.pageList.splice($index, 0, {title: 'new slide'});
                vm.currentPage($index);
            };
            vm.clonePage = function () {
                var $index = vm.currentPage();
                var page = vm.pageList.slice($index, $index + 1)[0];
                vm.pageList.splice($index + 1, 0, page);
                vm.currentPage($index + 1);
            };
            vm.removePage = function () {
                var $index = vm.currentPage();
                if (vm.pageList().length == 1) {
                    return;
                }
                if ($index == vm.pageList().length - 1) {
                    vm.currentPage($index - 1);
                }
                vm.pageList.splice($index, 1);
            };
            vm.nextPage = function () {
                var $index = vm.currentPage();
                if ($index < vm.pageList().length - 1) {
                    vm.currentPage($index + 1);
                }
            };
            vm.prevPage = function () {
                var $index = vm.currentPage();
                if ($index > 0) {
                    vm.currentPage($index - 1);
                }
            };
            vm.moveUpPage = function () {
                var page;
                var $index = vm.currentPage();
                if ($index > 0) {
                    page = vm.pageList.splice($index, 1)[0];
                    vm.pageList.splice($index - 1, 0, page);
                    vm.currentPage($index - 1);
                }
            };
            vm.moveDownPage = function () {
                var $index = vm.currentPage();
                if ($index < vm.pageList().length - 1) {
                    page = vm.pageList.splice($index, 1)[0];
                    vm.pageList.splice($index + 1, 0, page);
                    vm.currentPage($index + 1);
                }
            };
        }
    };
});