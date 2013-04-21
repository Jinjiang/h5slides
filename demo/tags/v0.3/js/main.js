
define('storage',[],function () {
    var storage = window.localStorage;

    function getTimestamp() {
        var date = new Date;
        return date.valueOf().toString();
    }

    function readData() {
        var data;
        var dataStr = storage.getItem('h5slides-data');
        if (dataStr) {
            data = JSON.parse(dataStr);
        }
        console.log('read');
        return data;
    }
    function saveData(data) {
        try {
            storage.setItem('h5slides-data', JSON.stringify(data));
            console.log('saved', (new Date).valueOf());
            return true;
        }
        catch (e) {
            console.log(e); // QuotaExceededError
            return false;
        }
    }

    function readMedia(mid) {
        var key = 'h5slides-media-' + mid;
        return storage.getItem(key);
    }
    function removeMedia(mid) {
        var key = 'h5slides-media-' + mid;
        var list = getMediaList();
        var index = list.indexOf(mid);
        if (index >= 0) {
            storage.removeItem(key);
            list.splice(index, 1);
            storage.setItem('h5slides-medialist', JSON.stringify(list));
        }
        return true;
    }
    function saveMedia(media) {
        var mid = getTimestamp();
        var key = 'h5slides-media-' + mid;
        var list = getMediaList();

        list.push(mid);

        try {
            storage.setItem('h5slides-medialist', JSON.stringify(list));
            storage.setItem(key, media);
        }
        catch (e) {
            console.log(e); //  QuotaExceededError
            list.pop();
            storage.removeItem(key);
            storage.setItem('h5slides-medialist', JSON.stringify(list));
            mid = null;
        }

        return mid;
    }
    function getMediaList() {
        var list;
        var listStr = storage.getItem('h5slides-medialist');
        if (listStr) {
            list = JSON.parse(listStr);
        }
        else {
            list = [];
        }
        return list;
    }

    return {
        readData: readData,
        saveData: saveData,
        readMedia: readMedia,
        saveMedia: saveMedia,
        removeMedia: removeMedia,
        getMediaList: getMediaList
    };
});
// set data *
// set title *
// set design *
// add/clone/remove slide *
// move slide *
// change template *
// edit item *
// reset *

define('data',['storage'], function (storage) {
    var templateList = [
            {key: 'normal', layout: 'normal', typeMap: {title: 'text', content: 'text'}},
            {key: 'title', layout: 'title', typeMap: {title: 'text', content: 'text'}},
            {key: 'subtitle', layout: 'subtitle', typeMap: {title: 'text', content: 'text'}},
            {key: 'picture', layout: 'normal', typeMap: {title: 'text', content: 'img'}}
        ];
    var designList = [
            {key: 'default', title: 'Default'},
            {key: 'revert', title: 'Revert'}
        ];

    var defaultData = {
        design: 'default',
        title: '',
        slides: [
            {sid: 'A', template: 'title', layout: 'title', items: {title: {type: 'text', value: 'Hello World'}, content: {type: 'text', value: 'test info'}}},
            {sid: 'B', template: 'subtitle', layout: 'subtitle', items: {title: {type: 'text', value: 'Content'}, content: {type: 'text', value: 'this is the menu here.'}}},
            {sid: 'C', template: 'picture', layout: 'normal', items: {title: {type: 'text', value: 'Favicon'}, content: {type: 'img', value: 'http://www.baidu.com/favicon.ico'}}}
        ]
    };

    var data = storage.readData() || JSON.parse(JSON.stringify(defaultData));

    var onStorage = true;

    function mapToArray(obj) {
        var newObj;
        if (Object.prototype.toString.call(obj) == '[object Object]') {
            newObj = [];
            $.each(obj, function (k, v) {
                newObj.push([k, mapToArray(v)]);
            });
            newObj.sort(function (a, b) {
                return a[0] > b[0];
            });
        }
        else if (Object.prototype.toString.call(obj) == '[object Array]') {
            newObj = [];
            $.each(obj, function (i, v) {
                newObj.push(mapToArray(v));
            });
        }
        else {
            newObj = obj;
        }
        return newObj;
    }
    function checkChanged(objA, objB) {
        var newObjA = mapToArray(objA);
        var newObjB = mapToArray(objB);

        return JSON.stringify(newObjA) !== JSON.stringify(newObjB);
    }

    function extend(dest, src) {
        $.each(src, function (k, v) {
            dest[k] = v;
        });
    }

    var manager = {
        getTplList: function () {
            return templateList;
        },
        getDesignList: function () {
            return designList;
        },
        getTplByKey: function (key) {
            var result;
            templateList.forEach(function (tplData) {
                if (tplData.key == key) {
                    result = tplData;
                }
            });
            return result;
        },
        getDesignByKey: function (key) {
            var result;
            designList.forEach(function (designData) {
                if (designData.key == key) {
                    result = designData;
                }
            });
            return result;
        },

        getData: function () {
            return data;
        },
        getDesign: function () {
            return data.design;
        },
        getTitle: function () {
            return data.title;
        },
        setData: function (newData) {
            data = newData;
        },
        setDesign: function (newDesign) {
            data.design = newDesign;
        },
        setTitle: function (newTitle) {
            data.title = newTitle;
        },

        getPageList: function () {
            var list = [];
            data.slides.forEach(function (slideData) {
                list.push({sid: slideData.sid, title: slideData.items.title.value});
            });
            return list;
        },

        getSlideList: function () {
            return data.slides;
        },
        getSlide: function (page) {
            return data.slides[page];
        },
        getSlideById: function (sid) {
            var result;
            data.slides.forEach(function (slideData) {
                if (slideData.sid == sid) {
                    result = slideData;
                }
            });
            return result;
        },
        getItem: function (page, key) {
            var slideData = data.slides[page] || {};
            var itemMap = slideData.items || {};
            var itemData = itemMap[key] || {};
            return itemData;
        },
        getValue: function (page, key) {
            var slideData = data.slides[page] || {};
            var itemMap = slideData.items || {};
            var itemData = itemMap[key] || {};
            return itemData.value;
        },

        changeTemplate: function (page, template) {
            var slideData = data.slides[page] || {};
            var tplData = manager.getTplByKey(template);
            var hasNewLayout = (slideData.layout != tplData.layout);
            var changedKeys = [];

            slideData.template = template;

            if (hasNewLayout) {
                slideData.layout = tplData.layout;
            }

            $.each(tplData.typeMap, function (key, type) {
                var itemData = slideData.items[key];

                if (hasNewLayout) {
                    itemData.position = {};
                }
                if (!itemData.value) {
                    itemData.type = type;
                    itemData.config = {};
                    changedKeys.push(key);
                }
            });

            return changedKeys;
        },
        setValue: function (page, key, value) {
            var itemData = manager.getItem(page, key);
            itemData.value = value;
        },

        startStorage: function () {
            onStorage = true;
        },
        stopStorage: function () {
            onStorage = false;
        },

        checkItemChanged: function (page, key, outerData) {
            var itemData;

            if (!key) {
                return;
            }

            itemData = manager.getItem(page, key);

            return checkChanged(itemData, outerData);
        },

        reset: function () {
            data = JSON.parse(JSON.stringify(defaultData));
        },
        save: function () {
            var result;
            if (onStorage) {
                result = storage.saveData(data);
                if (result === false) {
                    console.log('storage error! (QuotaExceededError)');
                }
            }
        }
    };

    extend(manager, {
        readMedia: storage.readMedia,
        saveMedia: storage.saveMedia,
        removeMedia: storage.removeMedia,
        getMediaList: storage.getMediaList
    });

    return manager;
});
define('vm',['data'], function (dataManager) {
    var currentPage = 0;
    var currentSlide = dataManager.getSlideList()[currentPage];

    var vm = {
        title: ko.observable(dataManager.getTitle()),
        editingTitle: ko.observable(false),
        designList: dataManager.getDesignList(),
        tplList: dataManager.getTplList(),
        pageList: ko.observableArray(dataManager.getPageList()),
        currentDesign: ko.observable(dataManager.getDesign()),
        currentPage: ko.observable(currentPage),
        currentTpl: ko.observable(currentSlide.template),
        currentItem: ko.observable(''),
        currentItemDataCopy: ko.observable(null)
    };

    vm.currentSid = ko.computed(function () {
        var page = vm.currentPage();
        var pageList = vm.pageList();
        return pageList[page].sid;
    });

    vm.currentLayout = ko.computed(function () {
        var layout;
        var currentTpl = vm.currentTpl();
        vm.tplList.forEach(function (template) {
            if (template.key == currentTpl) {
                layout = template.layout;
            }
        });
        return layout;
    });

    return vm;
});
define('title',['data'], function (dataManager) {
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

            vm.title.subscribe(function (newValue) {
                dataManager.setTitle(newValue);
                dataManager.save();
            });
        }
    };
});
define('page',['data'], function (dataManager) {
    return {
        init: function (vm) {
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

            vm.addPage = function () {
                var $index;
                var slideList;
                var slide;
                var sid = (new Date).valueOf();

                $index = vm.currentPage();
                vm.pageList.splice($index + 1, 0, {sid: sid, title: ''});

                slideList = dataManager.getSlideList();
                slide = {
                        sid: sid,
                        template: 'normal', layout: 'normal',
                        items: {
                            title: {type: 'text', value: ''},
                            content: {type: 'text', value: ''}
                        }
                    };
                slideList.splice($index + 1, 0, slide);

                vm.currentPage($index + 1);

                dataManager.save();
            };
            vm.clonePage = function () {
                var $index;
                var page;
                var slideList;
                var slide;
                var sid = (new Date).toString();

                $index = vm.currentPage();
                page = JSON.stringify(vm.pageList.slice($index, $index + 1)[0]);
                page.sid = sid;
                page = JSON.parse(page);
                vm.pageList.splice($index + 1, 0, page);

                slideList = dataManager.getSlideList();
                slide = JSON.stringify(dataManager.getSlide($index));
                slide.sid = sid;
                slide = JSON.parse(slide);
                slideList.splice($index + 1, 0, slide);

                vm.currentPage($index + 1);

                dataManager.save();
            };
            vm.removePage = function () {
                var $index;
                var slideList;

                $index = vm.currentPage();
                if (vm.pageList().length == 1) {
                    return;
                }
                if ($index == vm.pageList().length - 1) {
                    vm.currentPage($index - 1);
                }
                vm.pageList.splice($index, 1);

                slideList = dataManager.getSlideList();
                slideList.splice($index, 1);
                dataManager.save();
            };
            vm.moveUpPage = function () {
                var $index;
                var slideList;
                var page;
                var slide;

                $index = vm.currentPage();
                slideList = dataManager.getSlideList();

                if ($index > 0) {
                    page = vm.pageList.splice($index, 1)[0];
                    vm.pageList.splice($index - 1, 0, page);

                    slide = slideList.splice($index, 1)[0];
                    slideList.splice($index - 1, 0, slide);

                    vm.currentPage($index - 1);

                    dataManager.save();
                }
            };
            vm.moveDownPage = function () {
                var $index;
                var slideList;
                var page;
                var slide;

                $index = vm.currentPage();
                slideList = dataManager.getSlideList();

                if ($index < vm.pageList().length - 1) {
                    page = vm.pageList.splice($index, 1)[0];
                    vm.pageList.splice($index + 1, 0, page);

                    slide = slideList.splice($index, 1)[0];
                    slideList.splice($index + 1, 0, slide);

                    vm.currentPage($index + 1);

                    dataManager.save();
                }
            };
        }
    };
});
define('design',[],function () {
    var cssLinkMap = {};

    function loadCssLink(key) {
        if (!cssLinkMap[key]) {
            cssLink = $('<link rel="stylesheet">').attr('href', 'css/design/' + key + '.css');
            $('head').append(cssLink);
            cssLinkMap[key] = cssLink;
        }
    }

    return {
        loadCssLink: loadCssLink
    };
});
define('status',['data', 'design'], function (dataManager, designManager) {
    return {
        init: function (vm) {
            designManager.loadCssLink(vm.currentDesign());

            vm.clickTpl = function (templateData, e) {
                vm.currentTpl(templateData.key);
            };
            vm.clickPage = function (pageData, e) {
                var $index = vm.pageList().indexOf(pageData);
                vm.currentPage($index);
            };
            vm.clickDesign = function (designData, e) {
                var key = designData.key;
                var cssLink;

                designManager.loadCssLink(key);
                vm.currentDesign(key);
            };
            vm.resetData = function () {
                dataManager.reset();
                dataManager.stopStorage();

                var currentPage = 0;
                var currentSlide = dataManager.getSlideList()[currentPage];

                vm.title(dataManager.getTitle()),
                vm.currentDesign(dataManager.getDesign());
                vm.currentPage(currentPage);
                vm.currentTpl(currentSlide.template);
                vm.pageList(dataManager.getPageList());

                dataManager.startStorage();
                dataManager.save();
            };

            vm.currentTpl.subscribe(function (newValue) {
                var page = vm.currentPage();
                var changedKeys = dataManager.changeTemplate(page, newValue);

                changedKeys.forEach(function (key) {
                    vm.previewItem(key);
                });

                vm.resizeAll();
                dataManager.save();
            });
            vm.currentPage.subscribe(function (newValue) {
                var slideData = dataManager.getSlide(newValue);
                dataManager.stopStorage();
                vm.currentTpl(slideData.template);
                dataManager.startStorage();
            });
            vm.currentDesign.subscribe(function (newValue) {
                dataManager.setDesign(newValue);
                dataManager.save();
            });
        }
    };
});
define('types/text',['data', 'vm'], function (dataManager, vm) {
    var itemEditorLayer = $('#item-editor-layer');

    function blurEditor(e) {
        var target = $(e.target);
        var key = vm.currentItem();

        if (!vm.currentItem()) {
            return;
        }
        if (itemEditorLayer.has(target).length > 0) {
            return;
        }

        itemEditorLayer.empty().hide();
        vm.finishEdit();

        $(window).unbind('mousedown', blurEditor);
        $(window).unbind('touchstart', blurEditor);
    }

    function render(data, dom, placeHolder) {
        var textArray;
        var ul;

        // dom[0].cssText = '';
        // if (data.position) {
        //     $.each(data.position, function (key, value) {
        //         dom.css(key, value);
        //     });
        // }
        // if (data.config) {
        //     $.each(data.config, function (key, value) {
        //         dom.css(key, value);
        //     });
        // }

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
            dom.text(placeHolder);
        }
    }

    return {
        preview: function (data, dom) {
            render(data, dom, '[empty text]');
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

            $(window).bind('mousedown', blurEditor);
            $(window).bind('touchstart', blurEditor);
        },
        build: function (data, dom) {
            render(data, dom, '');
        },
        show: function (data, dom) {
        },
        hide: function (data, dom) {
        }
    };
});
define('types/img-helper',[],function () {
    var MAX_WIDTH = 640;
    var MAX_HEIGHT = 480;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = MAX_WIDTH;
    canvas.height = MAX_HEIGHT;

    function adjustSize(sw, sh, dw, dh) {
        var x, y, w, h, scale;
        var dRatio = dh / dw;
        var sRatio = sh / sw;

        if (sw <= dw && sh <= dh) {
            scale = 1;
            w = sw;
            h = sh;
            x = parseInt((dw - sw) / 2);
            y = parseInt((dh - sh) / 2);
        }
        else {
            if (sRatio >= dRatio) {
                scale = dh / sh;
                y = 0;
                h = dh;
                w = sw * scale;
                x = parseInt((dw - w) / 2);
            }
            else {
                scale = dw / sw;
                x = 0;
                w = dw;
                h = sh * scale;
                y = parseInt((dh - h) / 2);
            }
        }

        return {
            scale: scale,
            w: w,
            h: h,
            x: x,
            y: y
        };
    }

    function loadImg(src, callback, errorCallback) {
        var img = new Image;
        var timer = setTimeout(function () {
            errorCallback && errorCallback(img);
        }, 500);

        img.src = src;
        img.onload = function () {
            clearTimeout(timer);
            callback && callback(img);
        };
        img.onerror = function () {
            errorCallback && errorCallback(img);
        };
    }

    function minify(src, callback) {
        loadImg(src,
            function (img) {
                var newSrc;

                var nw = img.naturalWidth;
                var nh = img.naturalHeight;

                var ref = adjustSize(nw, nh, MAX_WIDTH, MAX_HEIGHT);

                canvas.width = ref.w;
                canvas.height = ref.h;

                context.drawImage(img, 0, 0, ref.w, ref.h);
                newSrc = canvas.toDataURL();
                context.clearRect(0, 0, ref.w, ref.h);

                callback && callback(newSrc, ref);
            },
            function (img) {
                callback && callback('', {});
            }
        );
    }
    function embed(src, dom, placeHolder) {
        var dw;
        var dh;

        dw = dom.width();
        dh = dom.height();

        loadImg(src,
            function (img) {
                var nw = img.naturalWidth;
                var nh = img.naturalHeight;

                ref = adjustSize(nw, nh, dw, dh);

                img.style.width = ref.w + 'px';
                img.style.height = ref.h + 'px';
                img.style.padding = ref.y + 'px ' + ref.x + 'px';

                dom.empty().append(img);
            },
            function (img) {
                dom.html(placeHolder);
            }
        );
    }
    return {
        minify: minify,
        embed: embed
    };
});
define('types/img',['data', 'vm', 'types/img-helper'], function (dataManager, vm, lib) {
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

        vm.finishEdit();
    }

    urlBtnRemove.click(function () {
        dataManager.setValue(vm.currentPage(), vm.currentItem(), '');
        dialog.modal('hide');
        vm.finishEdit();
    });

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

            imgListHolder.find('a').click(function (e) {
                var item = $(this);
                var key = item.attr('data-key');

                if (key) {
                    e.preventDefault();
                    tabs.find('[data-key="' + key + '"] a').tab('show');
                }
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
        showEditor: function (key, page, data, dom) {
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

            if (data.value.match(/^media\:\/\//)) {
                oldMid = data.value.substr(8);
                tabs.find('[data-key="list"] a').tab('show');
            }
            else if (data.value) {
                tabs.find('[data-key="url"] a').tab('show');
                urlInput.val(data.value);
                lib.embed(data.value, urlThumb, 'Image loading error!');
                urlBtnRemove.show();
            }
            else {
                oldMid = '';
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
define('types',['types/text', 'types/img'], function (text, img) {

    // for each type
    //   init(): initiation
    //   preview(data, dom): preview in editor
    //   resize(data, dom): resize in editor when layout changed
    //   showEditor(key, page, data, dom): handler when click item in editor
    //   hideEditor(key, page, dom): hide the editor from external ctrl ?
    //   build(data, dom): prepare to display in player
    //   show(data, dom): handler when show the current page in player
    //   hide(data, dom): handler when show another page in player

    return {
        text: text,
        img: img
    };
});
define('stage',['data', 'types'], function (dataManager, typeMap) {
    var itemKeyMap = ['title', 'content', 'content2', 'subtitle', 'subtitle2'];

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

            vm.resizeItem = function (key) {
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var dom = $('#slide-' + key);
                var typeHelper = typeMap[itemData.type];

                if (typeHelper && typeHelper.resize) {
                    typeHelper.resize(itemData, dom);
                }
            };
            vm.resizeAll = function () {
                itemKeyMap.forEach(function (key) {
                    vm.resizeItem(key);
                });
            };

            vm.editItem = function (vm, e) {
                var dom = $(e.currentTarget);
                var key = dom.attr('data-key');
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var typeHelper = typeMap[itemData.type];

                e.stopPropagation();
                vm.currentItem(key);

                if (typeHelper) {
                    vm.currentItemDataCopy(JSON.parse(JSON.stringify(itemData)));
                    if (typeHelper.init && !typeHelper.initialized) {
                        typeHelper.init();
                        typeHelper.initialized = true;
                    }
                    typeHelper.showEditor(key, page, itemData, dom);
                }
            };

            vm.finishEdit = function () {
                var page = vm.currentPage();
                var key = vm.currentItem();
                var newPageData;

                var changed = dataManager.checkItemChanged(
                        page, key,
                        vm.currentItemDataCopy()
                    );
                if (changed) {
                    if (key == 'title') {
                        newPageData = JSON.parse(JSON.stringify(vm.pageList.slice(page, page + 1)[0]));
                        newPageData.title = dataManager.getValue(page, key);
                        vm.pageList.splice(page, 1, newPageData);
                    }
                    dataManager.save();
                    vm.previewItem(key);
                }

                vm.currentItem('');
            };

            vm.currentSid.subscribe(function () {
                setTimeout(vm.previewAll, 13);
            });
        }
    };
});
define('editor',['vm', 'title', 'page', 'status', 'stage'],
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
define('player',['data', 'design', 'types'], function (dataManager, designManager, typeMap) {
    var btnPreview = $('#preview-btn');

    var player = $('#player');
    var editor = $('#editor');

    var stageDom = $('#player-stage');
    var slidesContainer = $('#player-slides-container');

    var btnMenu = $('#player-btn-menu');
    var btnNext = $('#player-btn-next');
    var btnPrev = $('#player-btn-prev');
    var btnGoto = $('#player-btn-goto');
    var btnExit = $('#player-btn-exit');

    var txtPage = $('#player-page');
    var txtSum = $('#player-sum');

    var gotoDialog = $('#goto-dialog');
    var gotoNumber = $('#goto-number');

    var currentSlide = $('');
    var slideLength;

    function createItem(key, itemData) {
        var itemDom = $('<div></div>');
        var type = itemData.type || 'text';
        var typeHelper = typeMap[type];

        itemDom.attr('data-key', key);
        itemDom.attr('data-type', type);

        if (typeHelper) {
            typeHelper.build(itemData, itemDom);
        }

        return itemDom;
    }

    function createSlide(page, slideData) {
        var slideDom = $('<div class="slide"></div>');

        slideDom.attr('id', 'slide-' + slideData.sid);
        slideDom.attr('data-page', page);
        slideDom.attr('data-layout', slideData.layout);
        slideDom.attr('data-template', slideData.template);

        $.each(slideData.items, function (key, itemData) {
            var itemDom = createItem(key, itemData);
            slideDom.append(itemDom);
        });

        return slideDom;
    }

    function gotoPage(page) {
        var newCurrentSlide = $(slidesContainer.find('.slide')[page]);

        currentSlide.children().each(function () {
            var itemDom = $(this);
            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            if (typeHelper && typeHelper.hide) {
                typeHelper.hide(itemDom);
            }
        });

        currentSlide.removeClass('current');
        currentSlide = newCurrentSlide;
        currentSlide.addClass('current');

        currentSlide.children().each(function () {
            var itemDom = $(this);
            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            if (typeHelper && typeHelper.show) {
                typeHelper.show(itemDom);
            }
        });

        txtPage.text(page - (-1));
    }

    function scaleSlides() {
        var WIDTH = 640;
        var HEIGHT = 480;

        var stageWidth = player.width() - 40;
        var stageHeight = player.height() - 60;

        var scale = Math.min(stageWidth / WIDTH, stageHeight / HEIGHT);

        scale = Math.floor(scale * 100) / 100;

        slidesContainer.css('-webkit-transform', 'scale(' + scale + ')');
    }

    function goNext() {
        var currentPage;

        if (currentSlide.length === 0) {
            return;
        }

        currentPage = currentSlide.attr('data-page') - 0;

        if (currentPage < slideLength - 1) {
            gotoPage(currentPage + 1);
        }
    }
    function goPrev() {
        var currentPage;

        if (currentSlide.length === 0) {
            return;
        }

        currentPage = currentSlide.attr('data-page') - 0;

        if (currentPage > 0) {
            gotoPage(currentPage - 1);
        }
    }
    function doExit() {
        slidesContainer.css('-webkit-transform', '');
        $(window).unbind('resize', scaleSlides);
        $(window).unbind('keydown', keydown);

        if (document.webkitFullscreenEnabled && document.webkitIsFullScreen) {
            document.webkitExitFullscreen();
        }

        currentSlide = $('');
        slideLength = null;
        slidesContainer.empty();
        player.hide();
        editor.show();
    }

    function keydown(e) {
        switch (e.keyCode) {
        case 38:
        case 37:
            goPrev();
            break;
        case 13:
        case 39:
        case 40:
            goNext();
            break;
        case 27:
            doExit();
            break;
        default:
            ;
        }
    }

    function play() {
        var design = dataManager.getDesign();
        var title = dataManager.getTitle();
        var slideList = dataManager.getSlideList();

        // set design
        designManager.loadCssLink(design);
        stageDom.attr('data-design', design);

        // build slide list
        slidesContainer.empty();
        $.each(slideList, function (i, slideData) {
            var slideDom = createSlide(i, slideData);
            slidesContainer.append(slideDom);
        });

        slideLength = slideList.length
        txtSum.text(slideLength);
        gotoNumber.attr('min', 1);
        gotoNumber.attr('max', slideLength);

        gotoPage(0);

        $(window).bind('resize', scaleSlides);
        $(window).bind('keydown', keydown);

        if (document.webkitFullscreenEnabled) {
            document.body.webkitRequestFullscreen();
        }
    }

    function clickNext(e) {
        e.preventDefault();
        goNext();
    }
    function clickPrev(e) {
        e.preventDefault();
        goPrev();
    }
    function clickGoto(e) {
        var currentPage = currentSlide.attr('data-page') - 0;

        e.preventDefault();

        gotoDialog.modal('show');
        gotoNumber.val(currentPage + 1);
    }
    function clickExit(e) {
        e.preventDefault();
        doExit();
    }

    btnPreview.click(function (e) {
        e.preventDefault();
        editor.hide();
        player.show();
        play();
    });
    btnNext.click(clickNext);
    btnPrev.click(clickPrev);
    btnGoto.click(clickGoto);
    btnExit.click(clickExit);

    gotoDialog.find('[data-action="go"]').click(function (e) {
        var newPage = gotoNumber.val() - 1;
        gotoPage(newPage);
    });

    return {};
});
// designList **
// tplList **
// pageList **

// currentDesign **
// currentTpl **
// currentPage **
// currentLayout **
// currentItem **
// currentItemDataCopy *

// title **
// titleDisplay **
// editingTitle **

// clickTpl **
// clickDesign **
// clickPage **

// addPage **
// clonePage **
// removePage **
// nextPage **
// prevPage **
// moveUpPage **
// moveDownPage **

// editTitle **

// previewItem **
// previewAll **
// editItem **
// finishEdit *


requirejs(
    ['editor', 'player'],
    function (editor, player) {
        editor.init();
    }
);

define("main",[], function(){});
