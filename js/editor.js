define(['vm', 'title', 'page', 'status', 'stage'],
    function (vm, titleManager, pageManager, statusManager, stageManager) {
        function getExtUrl() {
            var url = '';
            var extResult = location.search.match(/[\&\?]ext=([^\&]*)/);

            if (extResult) {
                url = decodeURIComponent(extResult[1]);
            }

            return url;
        }

        function checkExt() {
            var url = getExtUrl();
            var script;

            if (url) {
                script = document.createElement('script');
                script.src = url;
                document.body.appendChild(script);
            }

            history.replaceState(null, null, location.pathname);
        }

        function init() {
            titleManager.init(vm);
            statusManager.init(vm);
            pageManager.init(vm);
            stageManager.init(vm);

            ko.applyBindings(vm);
            vm.previewAll();

            checkExt();
        }

        return {
            init: init
        }
    }
);