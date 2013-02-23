define(['vm', 'title', 'page', 'status', 'stage'],
    function (vm, titleManager, pageManager, statusManager, stageManager) {
        function init() {
            titleManager.init(vm);
            statusManager.init(vm);
            pageManager.init(vm);
            stageManager.init(vm);

            ko.applyBindings(vm);
            vm.previewAll();
        }
        return {
            init: init
        }
    }
);