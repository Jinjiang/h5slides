define(['lib/zepto', 'data', 'status',
    'editor/widget', 'editor/dialog', 'editor/layer'
], function ($, data, status, widgetManager, dialogMod, layerMod) {
    var background = $('#main');
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

    var current;

    function init() {
        var theme = data.getTheme();
        var slide = data.get(status.page);
        setTheme(theme);
        setSlide(slide);
        focus('slide');
    }

    function setTheme(theme) {
        preview.attr('data-design', theme);
        udpateBackground();
    }
    function setLayout(layout) {
        itemMap.slide.attr('data-layout', layout);
        udpateBackground();
    }
    function udpateBackground() {
        var theme = preview.attr('data-design');
        var layout = itemMap.slide.attr('data-layout');
        background.attr('data-background-design', theme);
        background.attr('data-background-layout', theme + '_' + layout);
    }
    function setSlide(slideData) {
        setLayout(slideData.getLayout());
        udpateBackground();
        $.each(itemMap, function (name, item) {
            setItem(name);
        });
    }
    function setItem(name) {
        var itemData = data.get(status.page).getItem(name);
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
        var itemData = data.get(status.page).getItem(name);
        widgetManager.preview(item, itemData);
    }
    function focus(name) {
        var newName = (name || 'slide').toString();
        if (status.name === newName) {
            return;
        }
        status.name = newName;
        if (current) {
            current.removeClass('current');
        }
        current = itemMap[status.name];
        current.addClass('current');
        mod.onselect && mod.onselect(status.name);
    }
    function edit(name) {
        focus(name);
        var itemData = data.get(status.page).getItem(name);
        var type = itemData.getType() || defaultTypeMap[name] || '';
        var editorConfig = widgetManager.getEditorConfig(type);
        if (!editorConfig || !editorConfig.display) {
            console.log('no editor for', type, name);
            return;
        }
        var display = editorConfig.display;
        var title = editorConfig.title;
        if (display === 'dialog') {
            status.prop = '-val-' + type;
            dialogMod.init(editorConfig.dialog, title);
        }
        if (display === 'layer') {
            status.prop = '-val-' + type;
            layerMod.init(editorConfig.layer, title);
        }
    }

    function editCurrent() {
        if (status.name != 'slide') {
            edit(status.name);
        }
    }

    $.each(itemMap, function (name, item) {
        item.click(function (e) {
            e.stopPropagation();
            focus(name);
        }).dblclick(function (e) {
            e.stopPropagation();
            edit(name);
        }).doubleTap(function (e) {
            e.stopPropagation();
            edit(name);
        });
    });

    var mod = {
        init: init,
        updateTheme: setTheme,
        updateSlide: setSlide,
        updateLayout: setLayout,
        updateContent: setContent,
        updateStyle: setStyle,
        updatePosition: setPosition,
        updateItem: setItem,
        focus: focus,
        editCurrent: editCurrent
    };

    return mod;
});