define(['lib/zepto', 'data', 'status',
    'editor/dialog/index', 'editor/dialog/elements'
], function ($, data, status, dialogSet, elements) {
    var current;

    function adjust() {
        var windowWidth = $(window).width();
        var dialogWidth = elements.root.width();
        var left = Math.round((windowWidth - dialogWidth) / 2);
        elements.root.css('left', left + 'px');
    }

    elements.btnSubmit.click(function () {
        var value = current.val();
        data.get(status.page).getItem(status.name).setProp(status.prop, value);
        mod.onsubmit && mod.onsubmit(status.page, status.name, status.prop, value);
        mod.hide();
        current.clear();
    });
    elements.btnReset.click(function () {
        data.get(status.page).getItem(status.name).setProp(status.prop, '');
        mod.onreset && mod.onreset(status.page, status.name, status.prop);
        mod.hide();
        current.clear();
    });
    elements.btnCancel.click(function () {
        mod.hide();
        current.clear();
    });

    var mod = {
        init: function (type, title) {
            if (current) {
                current.clear();
            }
            current = dialogSet[type];
            if (current) {
                current.build(title);
                elements.header.text(title);
                elements.root.attr('data-type', type).show();
                adjust();
            }
            else {
                elements.header.text('');
                elements.root.removeAttr('data-type').hide();
            }
        },
        hide: function () {
            elements.root.hide();
        }
    };

    return mod;
});