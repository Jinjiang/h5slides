define(['data', 'editor/position'], function (data, positionManager) {
    var layer = $('#type-layer');

    var typeMap = {
        slide: ['slide'],
        title: ['title'],
        subtitle: ['title'],
        subtitle2: ['title'],
        content: ['text', 'img'],
        content2: ['text', 'img']
    };

    var currentType;
    var currentBtn;

    function build(typeList) {
        layer.empty();
        $.each(typeList, function (i, type) {
            var btn = $('<button></button>').text(type).attr('data-type', type);
            btn.click(function () {
                var type = $(this).attr('data-type');
                if (currentType !== 'type') {
                    setCurrent(type);
                    mod.ontypechange && mod.ontypechange(type);
                }
            });
            layer.append(btn);
        });
        if (typeList.length === 1) {
            setCurrent(typeList[0]);
        }
    }

    function setCurrent(type) {
        if (layer.find('button').length === 1) {
            currentBtn = layer.children().first().addClass('current');
            currentType = currentBtn.attr('data-type');
            return;
        }
        if (currentBtn) {
            currentBtn.removeClass('current');
        }
        currentType = type;
        currentBtn = layer.find('[data-type="' + type + '"]');
        currentBtn.addClass('current');
    }

    var mod = {
        show: function (name, type) {
            build(typeMap[name]);
            setCurrent(type);
            layer.show();
            var offset = positionManager.offset(name);
            var height = layer.height();
            layer.css('left', offset.left);
            layer.css('top', offset.top - height);
        },
        hide: function () {
            layer.hide();
        },
        getTypeList: function (name) {
            return typeMap[name];
        }
    };

    return mod;
});