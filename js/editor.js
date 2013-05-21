define(['vm', 'title', 'page', 'status', 'stage'],
    function (vm, titleManager, pageManager, statusManager, stageManager) {
        function getGistUrl() {
            var url = '';
            var gist = location.search.match(/[\&\?]gist=([^\&]*)_([^\&]*)_([^\&]*)/);

            if (gist) {
                url = 'https://gist.github.com/' + gist[1] +
                        '/' + gist[2] + '/raw/' + gist[3] + '/data.js';
            }

            return url;
        }

        function checkGist() {
            var url = getGistUrl();
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

            checkGist();
        }

        return {
            init: init
        }
    }
);