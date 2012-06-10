define(['data', 'editor/position'], function (data, positionManager) {
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
    var currentName;

    function build(typeList) {
        layer.empty();
        $.each(typeList, function (i, type) {
            var btn = $('<button></button>').text(type).attr('data-type', type);
            btn.click(function () {
                var type = $(this).attr('data-type');
                if (currentType !== type) {
                    if (!confirm('Are you sure?')) {
                        return;
                    }
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
        if (currentBtn) {
            currentBtn.removeClass('current');
        }
        currentType = type;
        currentBtn = layer.find('[data-type="' + type + '"]');
        currentBtn.addClass('current');
    }

    var mod = {
        show: function (name, type) {
            currentName = name;
            var typeList = typeMap[currentName];
            build(typeList);
            setCurrent(type || typeList[0] || '');
            layer.show();
            this.adjust();
        },
        hide: function () {
            layer.hide();
        },
        adjust: function () {
            var offset = positionManager.offset(currentName);
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