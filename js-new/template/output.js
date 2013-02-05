define(['template/elements'], function (root) {
    var TEMPLATE_DATA_LIST = root.TEMPLATE_DATA_LIST;
    var list = root.list;

    return {
        build: function () {
            list.empty();
            TEMPLATE_DATA_LIST.forEach(function (dataItem) {
                var li = $('<li class="span1"><a href="#" class="thumbnail"><img></a></li>');
                li.attr('data-key', dataItem.key);
                li.find('img').attr('src', 'images-new/template/' + dataItem.thumbnail + '.png');
                list.append(li);
            });
        },
        setCurrent: function (key) {
            var currentItem = list.find('.active');
            var currentKey = currentItem.attr('data-key');

            var item = list.find('[data-key="' + key + '"]');

            if (key == currentKey) {
                return;
            }
            if (item.length) {
                currentItem.removeClass('active');
                item.addClass('active');
            }
        }
    };
});