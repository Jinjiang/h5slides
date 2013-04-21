define(['data', 'vm'], function (dataManager, vm) {
    var dialog = $('#video-dialog');
    var input = $('#video-url');

    var helperLoaded;

    function loadHelperScript(callback) {
        var node = document.createElement('script');

        node.addEventListener('load', function () {
            helperLoaded = true;
            callback && callback();
        }, false);

        node.type = 'text/javascript';
        node.src = 'http://player.youku.com/jsapi';

        document.head.appendChild(node);
    }

    function checkHelperLoaded(callback) {
        if (helperLoaded) {
            callback && callback();
        }
        else {
            loadHelperScript(callback);
        }
    }

    function getVid(value) {
        // http://v.youku.com/v_show/id_XNjUwODE1Mg==.html
        var matchResult;

        if (value) {
            matchResult = value.match(/\/id_(.+?)\.html/);
            if (matchResult && matchResult.length >= 2) {
                return matchResult[1];
            }
        }

        return '';
    }

    dialog.find('[data-action="save"]').click(function (e) {
        var val = input.val();
        var vid = getVid(val);

        e.preventDefault();

        dataManager.setValue(vm.currentPage(), vm.currentItem(), vid);
    });

    dialog.on('hidden', function () {
        vm.finishEdit();
    });

    return {
        init: function () {
            checkHelperLoaded();
        },
        preview: function (data, dom) {
            var timeStamp = (new Date).valueOf();
            var value = data ? data.value : '';
            var playerId = 'video-' + timeStamp;
            var playerContainer;
            var img;
            var height;

            if (value) {
                dom.empty();
                height = dom.height();
                playerContainer = $('<div></div>');
                playerContainer.css('height', height + 'px');
                playerContainer.css('line-height', height + 'px');
                playerContainer.css('text-align', 'center');
                dom.append(playerContainer);
                img = $('<img>');
                img.attr('src', 'images/widget/video/youkulogo.png');
                playerContainer.append(img);
            }
            else {
                dom.text('[empty video]');
            }
        },
        resize: function (data, dom) {
            var playerContainer = dom.children().first();
            var height;
            playerContainer.hide();
            height = dom.height();
            playerContainer.css('height', height + 'px');
            playerContainer.css('line-height', height + 'px');
            playerContainer.show();
        },
        adjust: function (dom) {
            ;
        },
        edit: function (key, page, data, dom) {
            dialog.modal('show');
        },
        build: function (data, dom) {
            var timeStamp = (new Date).valueOf();
            var value = data ? data.value : '';
            var playerId = 'video-' + timeStamp;
            var playerContainer;

            dom.empty();

            if (value) {
                playerContainer = $('<div id="' + playerId + '"></div>');
                playerContainer.attr('data-vid', value);
                dom.append(playerContainer);
            }
        },
        show: function (dom) {
            var playerContainer = dom.find('div');
            var playerId = playerContainer.attr('id');
            var vid = playerContainer.attr('data-vid');

            if (vid) {
                playerContainer.css('height', dom.height() + 'px');
                checkHelperLoaded(function () {
                    var player = new YKU.Player(playerId, {
                            client_id: 'c22ac066adde91fe',
                            vid: vid
                        });
                });
            }
        },
        hide: function (dom) {
            dom.find('div').empty();
        }
    };
});