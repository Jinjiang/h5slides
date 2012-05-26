/**
    @fileOverview
    主编辑区域
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    主编辑区域的构造器
    @constructor
 */
function Slide(mode) {
    var INPUT_PLACEHOLDER = (mode == 'editor') ? '双击输入文本' : '';
    var root = $('#main');
    var preview = $('#preview');
    var slide = $('#slide');
    var itemMap = {
        title: $('#slide-title'),
        subtitle: $('#slide-subtitle'),
        subtitle2: $('#slide-subtitle2'),
        content: $('#slide-content'),
        content2: $('#slide-content2'),
        slide: slide
    };
    var that = this;
    var currentData = {};
    var currentHover;

    /**
        设置幻灯片数据
        @param {object} data
     */
    function setData(data) {
        currentData = data;
        setLayout(data.layout);
        $.each(itemMap, function (name, element) {
            renderItem(name);
        });
    }

    /**
        设置幻灯片其中一项内容的文字
        @param {string} name
        @param {string} value
     */
    function setValue(name, value) {
        currentData.items[name].value = value;
        renderItem(name);
    }

    /**
        设置幻灯片其中一项内容的样式
        @param {string} name
        @param {string} key
        @param {string} value
     */
    function setStyle(name, key, value) {
        currentData.items[name].style[key] = value;
        renderItem(name);
    }

    /**
        渲染幻灯片其中某一项的效果
        @param {string} name
     */
    function renderItem(name) {
        name = name || 'slide';
        var item = itemMap[name];
        var itemData = currentData.items[name];
        if (!itemData) {
            itemData = {
                value: '',
                type: 'text',
                style: {},
                position: {}
            };
            currentData.items[name] = itemData;
        }
        var value = itemData.value;
        var style = itemData.style;
        var position = itemData.position;

        item[0].style.cssText = '';
        item.data('css-size', '');

        $.each(style, function (key, value) {
            if (key.match(/^-ppt-/)) {
                item.data(key.replace('-ppt-', 'css-'), value);
            }
            else {
                item.css(key, value);
            }
        });

        $.each(position, function (key, value) {
            item.css(key, value);
        });

        if (name != 'slide') {
            renderText(item, value || INPUT_PLACEHOLDER);
        }
    }

    /**
        渲染幻灯片其中某一项的文字内容
        @param {object} item
        @param {string} value
     */
    function renderText(item, value) {
        var size = item.data('css-size') || '';

        item.html(TextParser.txt2P(value));
        item.removeClass('small-font-size large-font-size');

        if (size && size != 'normal') {
            item.addClass(size + '-font-size');
        }
    }

    /**
        设置主题
     */
    function setTheme(design) {
        preview.attr('data-design', design);
    }

    /**
        设置布局方式
     */
    function setLayout(layout, isAdjusting) {
        if (isAdjusting) {
            preview.addClass('adjusting');
            setTimeout(function () {
                preview.removeClass('adjusting');
            }, 500);
        }
        slide.attr('data-layout', layout);
    }

    /**
        设置页码
     */
    function setPage(page) {
        slide.attr('data-page', page);
    }

    slide.click(function () {
        that.notify('hover', '');
    })
    $.each(itemMap, function (name, item) {
        if (item == slide) {
            return;
        }
        item.dblclick(function () {
            that.notify('focus', name);
        }).doubleTap(function () {
            that.notify('focus', name);
        }).click(function (e) {
            that.notify('hover', name);
            e.stopPropagation();
        });
    });

    this.setData = setData;

    this.setValue = setValue;
    this.setStyle = setStyle;

    this.setTheme = setTheme;
    this.setLayout = setLayout;
    this.setPage = setPage;

    this.hover = function (name) {
        var newHover = itemMap[name];
        if (currentHover) {
            currentHover.removeClass('hover');
        }
        if (newHover) {
            newHover.addClass('hover');
        }
        currentHover = newHover;
    };
}


reg(Slide);



