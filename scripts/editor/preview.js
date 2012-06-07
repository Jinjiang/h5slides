define(['lib/zepto', 'data'], function ($, data) {
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
        console.log('set content', name, value);
    }
    function focus(name) {
        currentName = (name || 'slide').toString();
        if (currentItem) {
            currentItem.removeClass('current');
        }
        currentItem = itemMap[currentName];
        currentItem.addClass('current');
        mod.onselect && mod.onselect(currentName);
    }

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