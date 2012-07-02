define(['lib/zepto', 'data', 'status',
    'editor/dialog/index', 'editor/dialog/elements'
], function ($, data, status, dialogSet, elements) {
    var current;

    var page;
    var name;
    var prop;

    function adjust() {
        var windowWidth = $(window).width();
        var dialogWidth = elements.root.width();
        var left = Math.round((windowWidth - dialogWidth) / 2);
        elements.root.css('left', left + 'px');
    }

    elements.btnSubmit.click(function () {
        var value = current.val();
        data.get(page).getItem(name).setProp(prop, value);
        mod.onsubmit && mod.onsubmit(page, name, prop, value);
    });
    elements.btnReset.click(function () {
        data.get(page).getItem(name).setProp(prop, '');
        mod.onsubmit && mod.onsubmit(page, name, prop);
    });
    elements.btnCancel.click(function () {
        mod.hide();
    });

    var mod = {
        init: function (type, title) {
            if (current) {
                current.clear();
            }
            current = dialogSet[type];
            if (current) {
                page = status.page;
                name = status.name;
                prop = status.prop;

                current.build(title);
                elements.header.text(title);
                elements.mask.show();
                elements.root.attr('data-type', type).show();
                adjust();
            }
            else {
                page = name = prop = '';
                elements.header.text('');
                elements.root.removeAttr('data-type').hide();
                elements.mask.hide();
            }
        },
        adjust: function () {
            if (current) {
                adjust();
            }
        },
        hide: function () {
            if (current) {
                current.clear();
            }
            current = null;
            page = name = prop = '';
            elements.header.text('');
            elements.root.removeAttr('data-type').hide();
            elements.mask.hide();
        }
    };

    return mod;
});