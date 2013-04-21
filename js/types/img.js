define(['data', 'vm', 'types/img-helper'], function (dataManager, vm, lib) {
    var dialog = $('#img-manager');
    var tabs = $('#img-manager-tabs');

    var imgList = $('#my-img-list');
    var imgListHolder = $('#my-img-list-holder');

    var localPanel = $('#img-local-panel');
    var localInput = localPanel.find('input');
    var localThumb = localPanel.find('.thumbnail');

    var urlPanel = $('#img-url-panel');
    var urlInput = urlPanel.find('input');
    var urlThumb = urlPanel.find('.thumbnail');

    var urlBtnRemove = $('#img-url-remove');

    var currentLi;
    var oldMid;
    var newMid; // '$' means remove

    var localMedia;

    var manager = {};

    function setCurrentLi(li, mid) {
        if (currentLi) {
            currentLi.removeClass('active');
        }
        currentLi = li.addClass('active');

        newMid = mid;
    }

    function checkMediaListEmpty() {
        if (imgList.find('li').length == 0) {
            imgList.hide();
            imgListHolder.show();
        }
        else {
            imgList.show();
            imgListHolder.hide();
        }
    }

    function buildMeidaList(mediaList) {
        imgList.empty();

        mediaList.forEach(function (mid) {
            var li = $('<li class="span2"><a href="#" class="thumbnail"><img></a>' +
                '<p class="clearfix"><button class="btn pull-left" data-action="choose">Choose</button>' +
                '<button class="btn btn-danger pull-right" data-action="remove"><i class="icon-trash"></i></button></p></li>');

            if (mid == oldMid) {
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
                    newMid = '$';
                }
                li.remove();
                dataManager.removeMedia(mid);
                checkMediaListEmpty();
            });
            imgList.append(li);
        });

        checkMediaListEmpty();
    }

    function save() {
        var currentPanelKey = tabs.find('.active').attr('data-key');
        var media;
        var mid;

        switch (currentPanelKey) {
            case 'list':
            if (newMid) {
                if (newMid == '$') {
                    media = '$';
                }
                else {
                    media = 'media://' + newMid;
                }
            }
            break;
            case 'local':
            if (localMedia) {
                mid = dataManager.saveMedia(localMedia);
                if (mid) {
                    media = 'media://' + mid;
                }
                else {
                    console.log('storage error! (QuotaExceededError)');
                    return;
                }
            }
            break;
            case 'url':
            media = urlInput.val();
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

        // vm.finishEdit();
    }

    function render(data, dom, placeHolder) {
        var src = data.value;

        // dom[0].cssText = '';
        // if (data.position) {
        //     $.each(data.position, function (key, value) {
        //         dom.css(key, value);
        //     });
        // }

        if (src) {
            dom.html('<div class="info"></div>');
            dom.find('.info').attr('data-src', src);
        }
        else {
            dom.text(placeHolder);
        }
    }

    function showImg(dom, placeHolder) {
        var src = dom.find('.info').attr('data-src');

        if (src) {
            dom.html('');
            if (src.match(/^media\:\/\//)) {
                src = dataManager.readMedia(src.substr(8));
            }
            lib.embed(src, dom, placeHolder);
        }
    }

    return {
        init: function () {
            imgListHolder.find('a').click(function (e) {
                var item = $(this);
                var key = item.attr('data-key');

                if (key) {
                    e.preventDefault();
                    tabs.find('[data-key="' + key + '"] a').tab('show');
                }
            });

            localInput.on('change', function (e) {
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img;
                    var src = e.target.result;

                    if (src.length > 0) {
                        lib.minify(src, function (newSrc, info) {
                            localMedia = newSrc;
                            lib.embed(newSrc, localThumb, 'Image loading error!');
                        });
                    }
                };
                reader.readAsDataURL(file);
            });

            urlInput.on('change', function (e) {
                var img;
                var src = e.target.value;

                if (src.length > 0) {
                    lib.embed(src, urlThumb, 'Image loading error!');
                }
            });

            urlBtnRemove.click(function () {
                dataManager.setValue(vm.currentPage(), vm.currentItem(), '');
                dialog.modal('hide');
            });

            dialog.on('hidden', function () {
                vm.finishEdit();
            });

            dialog.find('[data-action="save"]').click(save);
        },
        preview: function (data, dom) {
            render(data, dom, '[empty img]');
            showImg(dom, '[empty img]');
        },
        resize: function (data, dom) {
            var src = data.value;

            if (src) {
                dom.html('');
                if (src.match(/^media\:\/\//)) {
                    src = dataManager.readMedia(src.substr(8));
                }
                lib.embed(src, dom, '[empty img]');
            }
        },
        edit: function (key, page, data, dom) {
            var position = dom.position();
            var width = dom.width();
            var height = dom.height();
            var mediaList;

            newMid = '';
            localMedia = '';

            localInput.val('');
            localThumb.html('');

            urlInput.val('');
            urlThumb.html('');
            urlBtnRemove.hide();

            dialog.modal('show');

            if (!data.value) {
                oldMid = '';
            }
            else if (data.value.match(/^media\:\/\//)) {
                oldMid = data.value.substr(8);
                tabs.find('[data-key="list"] a').tab('show');
            }
            else {
                tabs.find('[data-key="url"] a').tab('show');
                urlInput.val(data.value);
                lib.embed(data.value, urlThumb, 'Image loading error!');
                urlBtnRemove.show();
            }

            mediaList = dataManager.getMediaList();
            buildMeidaList(mediaList);
        },
        build: function (data, dom) {
            render(data, dom, '');
        },
        show: function (dom) {
            showImg(dom, '');
        },
        hide: function (dom) {}
    };
});