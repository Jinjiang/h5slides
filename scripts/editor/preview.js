define(['lib/zepto', 'data', 'editor/widget'], function ($, data, widgetManager) {
    var preview = $('#preview');
    var slide = $('#slide');

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
            item.css(key, '');
        });
    }
    function setStyle(name, style) {
        var item = itemMap[name];
        if (!item) {
            return;
        }
        $.each(style, function (key, value) {
            item.css(key, '');
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
        var itemData = data.get(currentPage).getItem(name);
        var type = itemData.getType();
        var editorConfig = widgetManager.getEditorConfig(type);
        if (!editorConfig) {
            console.log('no editor for', type, name);
            return;
        }
        if (editorConfig.display === 'dialog') {
            mod.onpopupdialog && mod.onpopupdialog(currentName, editorConfig.dialog);
        }
        if (editorConfig.display === 'layer') {
            mod.ondisplaylayer && mod.ondisplaylayer(currentName, editorConfig.layer);
        }
    }

    $.each(itemMap, function (name, item) {
        item.click(function (e) {
            e.stopPropagation();
            focus(name);
        }).dblclick(function (e) {
            e.stopPropagation();
            edit(name);
        }).mousedown(function (e) {
            e.preventDefault();
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