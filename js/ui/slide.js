/**
    @fileOverview
    root class
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    幻灯片展示区域的构造器
    @constructor
 */
function Slide(mode) {
    var INPUT_PLACEHOLDER = (mode == 'editor') ? '双击输入文本' : '';
    var root = $('#main');
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

    function setData(data) {
        currentData = {
            title: {style: {}, position: {}},
            subtitle: {style: {}, position: {}},
            subtitle2: {style: {}, position: {}},
            content: {style: {}, position: {}},
            content2: {style: {}, position: {}},
            slide: {style: {}, position: {}}
        };

        $.each(data.content, function (key, value) {
            currentData[key].content = value;
        });
        if (data.style) {
            $.each(data.style, function (key, value) {
                if (!currentData[key]) {
                    return;
                }
                currentData[key].style = value;
            });
        }
        if (data.position) {
            $.each(data.position, function (key, value) {
                if (!currentData[key]) {
                    return;
                }
                currentData[key].position = value;
            });
        }

        setLayout(data.layout);

        $.each(itemMap, function (key, item) {
            renderItem(key);
        });
    }

    function setItem(key, data) {
        currentData[key] = data;
        renderItem(key);
    }

    function setContent(key, content) {
        currentData[key].content = content;
        renderItem(key);
    }

    function setStyle(key, style) {
        currentData[key].style[style.key] = style.value;
        renderItem(key);
    }

    function renderItem(key) {
        key = key || 'slide';
        var item = itemMap[key];
        var data = currentData[key];
        var content = data.content;
        var style = data.style;
        var position = data.position;

        item[0].style.cssText = '';
        item.data('-ppt-size', '');

        $.each(style, function (key, value) {
            if (key.match(/^-ppt-/)) {
                item.data(key, value);
            }
            else {
                item.css(key, value);
            }
        });

        $.each(position, function (key, value) {
            item.css(key, value);
        });

        if (key != 'slide') {
            renderFunc.text(item, content || INPUT_PLACEHOLDER);
        }
    }

    var renderFunc = {
        text: function (item, content) {
            var size = item.data('-ppt-size') || '';
            var html = '';

            html = txt2P(content);
            item.html(html);

            if (size == 'auto-scroll' || size == 'auto-adjust') {
                size = '';
            }
            item.removeClass('small-font-size large-font-size');
            if (size && size != 'normal') {
                item.addClass(size + '-font-size');
            }
        }
    }

    /**
        设置主题
     */
    function setTheme(design) {
        root.attr('data-design', design);
    }

    /**
        设置布局方式
     */
    function setLayout(layout, isAdjusting) {
        if (isAdjusting) {
            root.addClass('adjusting');
            setTimeout(function () {
                root.removeClass('adjusting');
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

    slide.click(function (e) {
        that.notify('hover', '');
    })
    $.each(itemMap, function (key, item) {
        if (item == slide) {
            return;
        }
        item.dblclick(function () {
            that.notify('focus', key);
        }).doubleTap(function () {
            that.notify('focus', key);
        }).click(function (e) {
            that.notify('hover', key);
            e.stopPropagation();
        });
    });

    this.setData = setData;

    this.setItem = setItem;
    this.setContent = setContent;
    this.setStyle = setStyle;

    this.setTheme = setTheme;
    this.setLayout = setLayout;
    this.setPage = setPage;

    this.hover = function (e) {
        var newHover = itemMap[e];
        if (currentHover) {
            currentHover.removeClass('hover');
        }
        if (newHover) {
            newHover.addClass('hover');
        }
        currentHover = newHover;
    }
}


reg(Slide);



