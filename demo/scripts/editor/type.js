define(['data', 'status', 'editor/position'], function (data, status, positionManager) {
    var layer = $('#type-layer');

    var typeMap = {
        slide: ['slide'],
        title: ['text'],
        subtitle: ['text'],
        subtitle2: ['text'],
        content: ['text', 'img'],
        content2: ['text', 'img']
    };

    var currentType;
    var currentBtn;

    function build(typeList) {
        layer.empty();
        $.each(typeList, function (i, type) {
            var btn = $('<button></button>').text(type).attr('data-type', type);
            btn.click(clickBtn);
            layer.append(btn);
        });
        if (typeList.length === 1) {
            setCurrent(typeList[0]);
        }
    }

    function clickBtn() {
        var type = $(this).attr('data-type');
        if (currentType !== type) {
            if (!confirm('你确定更换内容吗(替代现有数据)?')) {
                return;
            }
            setCurrent(type);

            var item = data.get(status.page).getItem(status.name);
            item.setType(type);
            item.setValue('');

            var style = item.getStyle();
            $.each(style, function (k, v) {
                style[k] = '';
            });
            item.setStyle(style);

            mod.ontypechange && mod.ontypechange(status.page, status.name, type);
        }
    }

    function setCurrent(type) {
        if (currentBtn) {
            currentBtn.removeClass('current');
        }
        currentType = type;
        currentBtn = layer.find('[data-type="' + type + '"]');
        currentBtn.addClass('current');
    }

    layer.show();

    var mod = {
        init: function () {
            var typeList = typeMap[status.name];
            var type = data.get(status.page).getItem(status.name).getType();

            build(typeList);
            setCurrent(type || typeList[0] || '');
            this.adjust();
        },
        adjust: function () {
            var offset = positionManager.offset(status.name);
            var height = layer.height();
            layer.css('left', offset.left);
            layer.css('top', offset.top - height);
        },
        getTypeList: function (name) {
            return typeMap[name];
        }
    };

    return mod;
});