define(['lib/zepto', 'data',
    'editor/widget', 'editor/dialog', 'editor/layer'
], function ($, data, widgetManager, dialogMod, layerMod) {
    var preview = $('#preview');
    var slide = $('#slide');

    var defaultTypeMap = {
        slide: 'slide',
        title: 'text',
        subtitle: 'text',
        subtitle2: 'text',
        content: 'text',
        content2: 'text'
    };
    var itemMap = {
        title: $('#slide-title'),
        content: $('#slide-content'),
        content2: $('#slide-content2'),
        subtitle: $('#slide-subtitle'),
        subtitle2: $('#slide-subtitle2'),
        slide: slide
    };

    var currentPage;
    var currentName;
    var currentItem;

    function setTheme(theme) {
        preview.attr('data-design', theme);
    }
    function setLayout(layout) {
        itemMap.slide.attr('data-layout', layout);
    }
    function setSlide(page, slideData) {
        page = parseInt(page);
        currentPage = page;
        setLayout(slideData.getLayout());
        $.each(itemMap, function (name, item) {
            setItem(name);
        });
    }
    function setItem(name) {
        var itemData = data.get(currentPage).getItem(name);
        var item = itemMap[name];
        item[0].style.cssText = '';
        setPosition(name, itemData.getPosition());
        setStyle(name, itemData.getStyle());
        setContent(name, itemData.getValue());
    }
    function setPosition(name, position) {
        var item = itemMap[name];
        if (!item) {
            return;
        }
        $.each(position, function (key, value) {
            if (value) {
                item.css(key, value);
            }
            else {
                item.css(key, '');
            }
        });
    }
    function setStyle(name, style) {
        var item = itemMap[name];
        if (!item) {
            return;
        }
        $.each(style, function (key, value) {
            if (value) {
                item.css(key, value);
            }
            else {
                item.css(key, '');
            }
        });
    }
    function setContent(name, value) {
        var item = itemMap[name];
        if (!item) {
            return;
        }
        var itemData = data.get(currentPage).getItem(name);
        widgetManager.preview(item, itemData);
    }
    function focus(name) {
        var newName = (name || 'slide').toString();
        if (currentName === newName) {
            return;
        }
        currentName = newName;
        if (currentItem) {
            currentItem.removeClass('current');
        }
        currentItem = itemMap[currentName];
        currentItem.addClass('current');
        mod.onselect && mod.onselect(currentName);
    }
    function edit(name) {
        focus(name);
        var itemData = data.get(currentPage).getItem(name);
        var type = itemData.getType() || defaultTypeMap[name] || '';
        var editorConfig = widgetManager.getEditorConfig(type);
        if (!editorConfig || !editorConfig.display) {
            console.log('no editor for', type, name);
            return;
        }
        var display = editorConfig.display;
        var title = editorConfig.title;
        if (display === 'dialog') {
            dialogMod.setType(editorConfig.dialog);
            dialogMod.setProp('-val-' + type);
            dialogMod.update(itemData.getValue(), title);
            dialogMod.show();
        }
        if (display === 'layer') {
            layerMod.setType(editorConfig.layer);
            layerMod.update(name, itemData.getValue(), title);
            layerMod.show();
        }
    }

    $.each(itemMap, function (name, item) {
        item.click(function (e) {
            e.stopPropagation();
            focus(name);
        }).dblclick(function (e) {
            e.stopPropagation();
            edit(name);
        });
    });

    var mod = {
        updateTheme: setTheme,
        updateSlide: setSlide,
        updateLayout: setLayout,
        updateContent: setContent,
        updateStyle: setStyle,
        updatePosition: setPosition,
        updateItem: setItem,
        focus: focus
    };

    return mod;
});