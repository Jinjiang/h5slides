/**
    @fileOverview
    block bar layer class
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    幻灯片块状元素浮动工具栏的构造器
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

    var currentData = {};
    var currentBlock;
    var currentType;
    var that = this;

    function init(type, data, target) {
        var mode;
        data = data || {};
        data = data.style || {};

        if (target == currentBlock) {
            return;
        }

        currentBlock = target;
        currentData = data;

        setType(type);
        setSize(currentData['-ppt-size']);
    }

    function setType(type) {
        if (!type || !defaultModeMap[type]) {
            type = 'slide';
        }
        currentType = type;
        root[0].className = type;
        return type;        
    }

    function setSize(size) {
        size = size || 'normal';
        currentData['-ppt-size'] = size;
        $.each(sizeBtnMap, function (size, btn) {
            if (size == currentData['-ppt-size']) {
                btn.addClass('checked');
            }
            else {
                btn.removeClass('checked');
            }
        });
        return size;
    }

    function setValue(key, value) {
        currentData[key] = value;
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



