define(['pagenav/elements'], function (root) {
    var list = root.list;

    function rebuildIndex() {
        list.each(function (i, li) {
            li = $(li);
            li.find('a').attr('data-index', i);
        });
    }

    return {
        build: function (dataList) {
            list.empty();
            dataList.forEach(function (itemData, i) {
                this.add(itemData, i);
            });
        },
        setCurrent: function (index) {
            var item = list.find('[data-index="' + index + '"]');
            var currentPage = pageList.find('.current');
            var currentIndex = currentPage.attr('data-index');

            if (index != currentIndex) {
                currentPage.removeClass('current');
                item.addClass('current');
            }
        },
        add: function (index, itemData) {
            var li = $('<li><a href="#"></a></li>');
            li.find('a').attr('data-index', index).text(itemData.title);
            list.append(li);
        },
        remove: function (index) {
            var length = list.length;
            var li = list.find('[data-index="' + index + '"]').parent();
            li.remove();
            rebuildIndex();
            if (index = length - 1) {
                index = length - 2;
            }
            if (index >= 0) {
                li = list.find('[data-index="' + index + '"]');
                li.addClass('current');
            }
        },
        swap: function (i, j) {},
        move: function (i, j) {}
    };
});