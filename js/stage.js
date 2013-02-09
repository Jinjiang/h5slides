define(['data'], function (dataManager) {
    var itemKeyMap = ['title', 'content', 'content2', 'subtitle', 'subtitle2'];
    var itemEditorLayer = $('#item-editor-layer');
    var typeMap = {
        text: {
            preview: function (data, dom) {
                dom.text(data.value || '[empty]');
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
            render: function (data, dom) {
                dom.text(data.value);
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
            display: function (data, dom) {
                ;
            },
            showEditor: function (data, dom) {
                console.log(dom.position());
            }
        },
        img: {
            preview: function (data, dom) {
                var img;
                if (data.value) {
                    img = $('<img>');
                    img.attr('src', data.value);
                    dom.empty().append(img);
                }
                else {
                    dom.text('[empty]');
                }
                if (data.position) {
                    $.each(data.position, function (key, value) {
                        dom.css(key, value);
                    });
                }
            }
        },
        html: {},
        video: {}
    };
    return {
        init: function (vm) {
            vm.previewItem = function (key) {
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var dom = $('#slide-' + key);
                var typeHelper = typeMap[itemData.type];

                if (typeHelper) {
                    typeHelper.preview(itemData, dom);
                }
            };
            vm.previewAll = function () {
                itemKeyMap.forEach(function (key) {
                    vm.previewItem(key);
                });
            };
            vm.currentSid.subscribe(vm.previewAll);
        }
    };
});