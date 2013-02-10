define(['data', 'vm'], function (dataManager, vm) {
    var itemEditorLayer = $('#item-editor-layer');

    var typeMap = {
        text: {
            preview: function (data, dom) {
                var textArray;
                var ul;

                if (data.value) {
                    ul = $('<ul class="unstyled"></ul>');
                    textArray = data.value.split('\n');
                    textArray.forEach(function (text) {
                        var li = $('<li></li>');
                        li.text(text);
                        ul.append(li);
                    });
                    dom.empty().append(ul);
                }
                else {
                    dom.text('[empty text]');
                }
                dom[0].cssText = '';
                if (data.position) {
                    $.each(data.position, function (key, value) {
                        dom.css(key, value);
                    });
                }
                if (data.config) {
                    $.each(data.config, function (key, value) {
                        dom.css(key, value);
                    });
                }
            },
            showEditor: function (key, page, data, dom) {
                var position = dom.position();
                var width = dom.outerWidth();
                var height = dom.outerHeight();
                var fontSize = dom.css('font-size');
                var lineHeight = dom.css('line-height');
                var editor = $('<textarea></textarea>');

                editor.css('position', 'absolute');
                editor.css('left', position.left + 'px');
                editor.css('top', position.top + 'px');
                editor.css('width', width + 'px');
                editor.css('height', height + 'px');
                editor.css('font-size', fontSize);
                editor.css('line-height', lineHeight);
                editor.val(data.value);

                itemEditorLayer.empty().append(editor);
                itemEditorLayer.show();

                editor.on('input', function (e) {
                    var newValue = this.value;
                    var page = vm.currentPage();
                    var itemData = dataManager.getItem(page, key);

                    if (itemData.value != newValue) {
                        dataManager.setValue(page, key, newValue);
                    }
                });
                editor.focus();
            },
            render: function (data, dom) {
            },
            display: function (data, dom) {
            }
        },
        img: {
            init: function () {
                var self = this;
                var dialog = $('#img-manager');
                var tabs = $('#img-manager-tabs');
                var panels = {
                    list: $('#img-list-panel'),
                    local: $('#img-local-panel'),
                    url: $('#img-url-panel')
                };
                panels.local.find('input').on('change', function (e) {
                    var file = e.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var img;
                        var src = e.target.result;
                        if (src.length > 0) {
                            img = $('<img>').attr('src', src);
                            img.on('load', function () {
                                self.tempMedia = src;
                            });
                            panels.local.find('.thumbnail').empty().append(img);
                        }
                    };
                    reader.readAsDataURL(file);
                });
                panels.url.find('input').on('change', function (e) {
                    var img;
                    var src = e.target.value;
                    if (src.length > 0) {
                        img = $('<img>').attr('src', src);
                        panels.url.find('.thumbnail').empty().append(img);
                    }
                });
                dialog.find('[data-action="save"]').click(function (e) {
                    var currentPanelKey = tabs.find('.active').attr('data-key');
                    var media;

                    switch (currentPanelKey) {
                        case 'list':
                        if (self.currentMid) {
                            media = 'media://' + self.currentMid;
                        }
                        break;
                        case 'local':
                        if (self.tempMedia) {
                            media = 'media://' + dataManager.saveMedia(self.tempMedia);
                        }
                        break;
                        case 'url':
                        media = panels.url.find('input').val();
                        break;
                        default:
                        ;
                    }
                    if (media) {
                        dataManager.setValue(vm.currentPage(), vm.currentItem(), media);
                    }
                });
                dialog.on('hidden', function () {
                    vm.finishEdit();
                });
            },
            preview: function (data, dom) {
                var img;
                var src = data.value;
                if (src) {
                    if (src.match(/^media\:\/\//)) {
                        src = dataManager.readMedia(src.substr(8));
                    }
                    img = $('<img>');
                    img.attr('src', src);
                    dom.empty().append(img);
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
                var self = this;
                var imgManager = $('#img-manager');
                var imgList = $('#my-img-list');
                var position = dom.position();
                var width = dom.width();
                var height = dom.height();
                var mediaList = dataManager.getMediaList();
                var currentLi;
                var hasMid = data.value.match(/^media\:\/\//);
                var oriMid;

                if (hasMid) {
                    oriMid = data.value.substr(8);
                }

                imgList.empty();
                mediaList.forEach(function (mid) {
                    var li = $('<li class="span2"><a href="#" class="thumbnail"><img></a></li>');

                    if (hasMid && mid == oriMid) {
                        currentLi = li.addClass('active');
                    }
                    li.find('img').attr('src', dataManager.readMedia(mid));
                    li.find('a').click(function (e) {
                        e.preventDefault();
                        if (currentLi) {
                            currentLi.removeClass('active');
                        }
                        currentLi = li.addClass('active');

                        self.currentMid = mid;
                    });
                    imgList.append(li);
                });

                imgManager.modal('show');
            }
        },
        html: {},
        video: {}
    };
    return typeMap;
});