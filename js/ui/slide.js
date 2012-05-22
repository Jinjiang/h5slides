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

    /**
        设置幻灯片数据其中的一项
        @param {stirng} key
        @param {object} data
     */
    function setItem(key, data) {
        currentData[key] = data;
        renderItem(key);
    }

    /**
        设置幻灯片其中一项内容的文字
        @param {string} key
        @param {string} content
     */
    function setContent(key, content) {
        currentData[key].content = content;
        renderItem(key);
    }

    /**
        设置幻灯片其中一项内容的样式
        @param {string} key
        @param {object} style
     */
    function setStyle(key, style) {
        currentData[key].style[style.key] = style.value;
        renderItem(key);
    }

    /**
        渲染幻灯片其中某一项的效果
        @param {string} key
     */
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



