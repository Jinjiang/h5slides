/**
    @fileOverview
    编辑器入口
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    编辑器的所有逻辑控制
 */
function Editor() {
    var splash = new Splash();
    var wrapper = new Wrapper('editor');
    var menu = new Menu();
    var sidebar = new Sidebar();
    var paginations = new Paginations();
    var layout = new Layout();
    var themes = new Themes();
    var stylePanel = new StylePanel();
    var slide = new Slide('editor');
    var input = new InputLayer();
    var blockBar = new BlockLayer();
    var maskLayer = new MaskLayer();
    var colorDialog = new ColorDialog();
    var imageDialog = new ImageDialog();
    var that = this;

    /**
        初始化界面
     */
    function init() {
        var cache = window.data.openDraft();
        if (cache) {
            initData(cache);
        }
        else {
            initData(JSON.parse(JSON.stringify(defaultData)));
        }
    }

    /**
        初始化数据
        @param {object} data
     */
    function initData(data) {
        window.data.theme = data.theme;
        window.data.slides = data.slides;
        window.data.saveDraft();

        var titles = window.data.getMenu();
        var currentPage = window.data.page;
        var slideData = window.data.get(currentPage);

        // 初始化页面切换的面板
        paginations.initData(titles);

        // 初始化主菜单的名称
        if (window.data.title) {
            menu.setTitle(window.data.title, true);
        }
        else {
            menu.setTitle(titles[0]);
        }

        // 初始化修改主题和布局的面板
        layout.setCurrent(slideData.layout);
        slide.setLayout(slideData.layout);

        themes.setCurrent(window.data.theme);
        slide.setTheme(window.data.theme);

        // 初始化主编辑区域
        slide.setPage(currentPage);
        slide.setData(slideData);

        // 隐藏预加载界面
        splash.hide();
    }

    if (!splash.check()) {
        return;
    }

    // 菜单事件：重做(restart)、播放(play)、修改标题(title)
    menu.bind(function (type, data) {
        if (type == 'restart') {
            window.data.delDraft();
            window.data.page = 1;
            window.data.name = '';
            window.data.title = '';
            window.data.theme = '';
            window.data.slides = [];
            initData(JSON.parse(JSON.stringify(defaultData)));
        }
        if (type == 'play') {
            that.notify('play');
        }
        if (type == 'title') {
            window.data.title = data;
            if (data) {
                menu.setTitle(data, true);
            }
            else {
                menu.setTitle(window.data.getMenu()[0]);
            }
        }
    });

    // 翻页管理面板事件：翻页(go/next/previous)、添加页(add)、删除页(remove)
    paginations.bind(function (type, data) {
        var page = window.data.page;
        var slideData;

        if (type == 'go') {
            window.data.page = data - 0;
        }
        if (type == 'nav') {
            if (data == 'next') {
                window.data.page = page + 1;
            }
            if (data == 'previous') {
                window.data.page = page - 1;
            }
            if (data == 'add') {
                slideData = {layout: 'normal', content: {}};
                window.data.add(page, slideData);
                paginations.add(page, '');
                window.data.page = page + 1;
            }
            if (data == 'remove') {
                window.data.del(page);
                paginations.remove(page);
            }
        }

        page = window.data.page;
        slideData = window.data.get(page);
        layout.setCurrent(slideData.layout);

        paginations.go(page);
        slide.setPage(page);
        slide.setData(slideData);

        return;
        console.log('page', type, data);
    });

    // 加载布局面板数据
    layout.initData(layoutData);

    // 布局面板事件：选择布局(layout)
    layout.bind(function (type, data) {
        var page = window.data.page;

        if (type == 'layout') {
            slide.setLayout(data, true);
            window.data.setLayout(page, data);
            layout.setCurrent(data);
        }

        return;
        console.log('layout', type, data);
    });

    // 加载主题面板数据
    themes.initData(themesData);

    // 主题面板事件：选择主题(theme)
    themes.bind(function (type, data) {

        if (type == 'theme') {
            slide.setTheme(data);
            window.data.theme = data;
            themes.setCurrent(data);
        }

        if (type == 'loadcss') {
            that.notify('loadcss', data);
        }

        return;
        console.log('themes', type, data);
    });

    // 主编辑区域事件：开始编辑(focus)、选中(hover)幻灯片上的某个项目的内容或样式或位置
    slide.bind(function (type, data) {
        var page = window.data.page;
        var slideData = window.data.get(page);
        var value = slideData.content[data];
        var target = $('#slide-' + data);
        var inputType;
        var styleData = {};

        if (slideData.style) {
            styleData.style = slideData.style[data];
        }

        if (type == 'hover') {
            if (data == '') {
                input.hide();
            }
            slide.hover(data);
            stylePanel.init(data, styleData, target);
        }

        if (type == 'focus') {
            inputType = 'textarea';
            input.init(value, target);

            stylePanel.init(data, styleData, target);
        }

        return;
        console.log('slide', inputType, data);
    });

    // 输入框弹出层事件：失焦(blur)、修改内容(title/content/...)
    input.bind(function (type, data) {
        if (type == 'blur') {
            input.hide();
            return;
        }

        var key = type.replace('slide-', '');
        var page = window.data.page;

        window.data.setContent(page, key, data);

        if (key == 'title') {
            paginations.setTitle(page, data);
        }

        slide.setContent(key, data);

        input.adjust();

        if (page == 1 && key == 'title' && !window.data.title) {
            menu.setTitle(data);
        }

        return;
        console.log('input', type, data);
    });

    // 样式面板事件：修改样式(style)、弹出样式对话框(dialog)
    stylePanel.bind(function (type, data) {
        var page = window.data.page;
        var id = data.type;
        var style = {
            key: data.key,
            value: data.value
        };

        if (type == 'style') {
            stylePanel.setValue(style.key, style.value);
            slide.setStyle(id, style);
            window.data.setStyle(page, id, style);
        }
        if (type == 'dialog') {
            var slideData = window.data.get(page);
            if (data.key == 'color') {
                if (slideData.style && slideData.style[id]) {
                    style.value = slideData.style[id].color;
                }
                maskLayer.show();
                colorDialog.show(page, id, style.value);
            }
            else if (data.key == 'image') {
                if (slideData.content && slideData.content.slide) {
                    style.value = slideData.content.slide;
                }
                maskLayer.show();
                imageDialog.show(page, 'slide', style.value);
            }
        }
    });

    // 块级元素浮动层事件：修改样式(style)、弹出样式对话框(dialog)
    blockBar.bind(function (type, data) {
        var page = window.data.page;
        var id = data.type;
        var style = {
            key: data.key,
            value: data.value
        };

        if (type == 'style') {
            stylePanel.setValue(style.key, style.value);
            slide.setStyle(id, style);
            window.data.setStyle(page, id, style);
        }
        if (type == 'dialog') {
            var slideData = window.data.get(page);
            if (data.key == 'color') {
                if (slideData.style && slideData.style[id]) {
                    style.value = slideData.style[id].color;
                }
                maskLayer.show();
                colorDialog.show(page, id, style.value);
            }
            else if (data.key == 'image') {
                if (slideData.content && slideData.content.slide) {
                    style.value = slideData.content.slide;
                }
                maskLayer.show();
                imageDialog.show(page, 'slide', style.value);
            }
        }
    });

    // 调色板浮动层样式：修改颜色(color)
    colorDialog.bind(function (type, data) {
        maskLayer.hide();
        slide.setStyle(data.key, {key: 'color', value: data.value});
        window.data.setStyle(data.page, data.key, {key: 'color', value: data.value});
    });

    // 插入图片浮动层样式：设置图片(image)
    imageDialog.bind(function (type, data) {
        maskLayer.hide();
        if (!data) {
            return;
        }
        slide.setStyle(data.key, {key: 'background-image', value: data.value});
        window.data.setStyle(data.page, data.key, {key: 'background-image', value: data.value});
    });

    that.init = init;
}

reg(Editor);

