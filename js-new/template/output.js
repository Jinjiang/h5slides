define(['template/elements'], function (root) {
    var list = root.list;
    return {
        setCurrent: function (key) {
            var currentItem = list.find('.current');
            var currentKey = currentItem.attr('data-key');

            var item = list.find('[data-key="' + key + '"]');

            if (key == currentKey) {
                return;
            }
            if (item.length) {
                currentItem.removeClass('current');
                item.addClass('current');
            }
        }
    };
});