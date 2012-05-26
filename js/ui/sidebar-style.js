/**
    @fileOverview
    样式面板
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    样式面板的构造器
    @constructor
 */
function StylePanel() {
    var root = $('#panel-style-btn-list');
    var colorBtn = $('#panel-style-btn-color-dialog');
    var sizeBtnMap = {
        'small': $('#panel-style-btn-size-small'),
        'normal': $('#panel-style-btn-size-normal'),
        'large': $('#panel-style-btn-size-large')
    };
    var defaultModeMap = {
        title: 'text',
        subtitle: 'text',
        subtitle2: 'text',
        content: 'text',
        content2: 'text'
    };

    var currentStyle = {};
    var currentBlock;
    var currentType;
    var that = this;

    /**
        初始化样式面板，根据项目类型选择要显示的样式设置项
        @param {string} type
        @param {object} style
        @param {object} target
     */
    function init(type, style, target) {
        var mode;

        if (target == currentBlock) {
            return;
        }

        currentBlock = target;
        currentStyle = style || {};

        setType(type);
        setSize(currentStyle['-ppt-size']);
    }

    /**
        修改项目的类型
        @param {string} type
     */
    function setType(type) {
        if (!type || !defaultModeMap[type]) {
            type = 'slide';
        }
        currentType = type;
        root[0].className = type;
        return type;        
    }

    /**
        修改字号大小
        @param {string} size
     */
    function setSize(size) {
        size = size || 'normal';
        currentStyle['-ppt-size'] = size;
        $.each(sizeBtnMap, function (size, btn) {
            if (size == currentStyle['-ppt-size']) {
                btn.addClass('checked');
            }
            else {
                btn.removeClass('checked');
            }
        });
        return size;
    }

    /**
        设置样式
        @param {string} key
        @param {string} value
     */
    function setValue(key, value) {
        currentStyle[key] = value;
        if (key == '-ppt-size') {
            setSize(value);
        }
    }

    $.each(sizeBtnMap, function (size, btn) {
        btn.click(function () {
            that.notify('style', {
                type: currentType,
                key: '-ppt-size',
                value: size
            });
        });
    });

    colorBtn.click(function () {
        that.notify('dialog', {
            type: currentType,
            key: 'color'
        });
    });

    this.init = init;
    this.setValue = setValue;
}


reg(StylePanel);



