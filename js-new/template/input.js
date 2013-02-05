define(['cmd-center', 'template/elements'], function (_, root) {
    var TEMPLATE_DATA_MAP = root.TEMPLATE_DATA_MAP;

    var list = root.list;
    var templateMap = {};

    list.delegate('a', 'click', function (e) {
        var li = $(this).parent();
        var key;
        var dataItem;

        e.preventDefault();

        if (!li.hasClass('active')) {
            key = li.attr('data-key');
            dataItem = TEMPLATE_DATA_MAP[key];
            _.setTemplate(key, dataItem.layout, dataItem.typeMap);
        }
    });
});