define(['data', 'vm', 'types/img-helper'], function (dataManager, vm, lib) {
    var dialog = $('#img-manager');
    var tabs = $('#img-manager-tabs');
    var panels = {
        list: $('#img-list-panel'),
        local: $('#img-local-panel'),
        url: $('#img-url-panel')
    };
    var imgList = $('#my-img-list');

    var manager = {};

    function save() {
        var currentPanelKey = tabs.find('.active').attr('data-key');
        var media;

        switch (currentPanelKey) {
            case 'list':
            if (manager.currentMid) {
                if (manager.currentMid == '$') {
                    media = '$';
                }
                else {
                    media = 'media://' + manager.currentMid;
                }
            }
            break;
            case 'local':
            if (manager.tempMedia) {
                media = 'media://' + dataManager.saveMedia(manager.tempMedia);
            }
            break;
            case 'url':
            media = panels.url.find('input').val();
            break;
            default:
            ;
        }

        if (media) {
            if (media == '$') {
                media = '';
            }
            dataManager.setValue(vm.currentPage(), vm.currentItem(), media);
        }

        vm.finishEdit();
    }

    manager = {
        init: function () {
            panels.local.find('input').on('change', function (e) {
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img;
                    var src = e.target.result;
                    var thumbnail = panels.local.find('.thumbnail');
                    if (src.length > 0) {
                        lib.minify(src, function (newSrc, info) {
                            if (newSrc) {
                                manager.tempMedia = newSrc;
                                lib.embed(newSrc, thumbnail);
                            }
                        });
                    }
                };
                reader.readAsDataURL(file);
            });

            panels.url.find('input').on('change', function (e) {
                var img;
                var src = e.target.value;
                var thumbnail = panels.url.find('.thumbnail');
                if (src.length > 0) {
                    lib.embed(src, thumbnail);
                }
            });

            dialog.find('[data-action="save"]').click(save);
        },
        preview: function (data, dom) {
            var img;
            var src = data.value;
            if (src) {
                if (src.match(/^media\:\/\//)) {
                    src = dataManager.readMedia(src.substr(8));
                }
                lib.embed(src, dom);
            }
            else {
                dom.text('[empty img]');
            }
            if (data.position) {
                $.each(data.position, function (key, value) {
                    dom.css(key, value);
                });
            }
        },
        showEditor: function (key, page, data, dom) {
            var position = dom.position();
            var width = dom.width();
            var height = dom.height();
            var mediaList = dataManager.getMediaList();
            var currentLi;
            var hasMid = data.value.match(/^media\:\/\//);
            var oriMid;

            function setCurrentLi(li, mid) {
                if (currentLi) {
                    currentLi.removeClass('active');
                }
                currentLi = li.addClass('active');

                manager.currentMid = mid;
            }

            if (hasMid) {
                oriMid = data.value.substr(8);
                tabs.find('[data-key="list"] a').tab('show');
            }

            imgList.empty();
            mediaList.forEach(function (mid) {
                var li = $('<li class="span2"><a href="#" class="thumbnail"><img></a>' +
                    '<p class="clearfix"><button class="btn pull-left" data-action="choose">Choose</button>' +
                    '<button class="btn btn-danger pull-right" data-action="remove"><i class="icon-trash"></i></button></p></li>');

                if (hasMid && mid == oriMid) {
                    currentLi = li.addClass('active');
                }
                li.find('img').attr('src', dataManager.readMedia(mid));
                li.find('a').click(function (e) {
                    e.preventDefault();
                    setCurrentLi(li, mid);
                });
                li.find('[data-action="choose"]').click(function () {
                    setCurrentLi(li, mid);
                    save();
                    dialog.modal('hide');
                });
                li.find('[data-action="remove"]').click(function (e) {
                    e.preventDefault();
                    if (li.hasClass('active')) {
                        manager.currentMid = '$';
                    }
                    li.remove();
                    dataManager.removeMedia(mid);
                });
                imgList.append(li);
            });

            dialog.modal('show');
        },
        hideEditor: function (key, page, dom) {
            dialog.modal('hide');
        }
    };

    return manager;
});