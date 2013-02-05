define(['pagenav/elements'], function (root) {
    var list = root.list;

    function findLi(index) {
        return list.find('[data-index="' + index + '"]');
    }

    function getLength() {
        return list.children().length;
    }

    function rebuildIndex() {
        list.find('li').each(function (i, li) {
            $(li).attr('data-index', i);
        });
    }

    function append(index, itemData) {
        var li = $('<li><a href="#"></a></li>');
        li.find('a').text(itemData.title);
        list.append(li);
    }

    return {
        build: function (dataList) {
            var self = this;

            list.empty();
            dataList.forEach(function (itemData, i) {
                append(i, itemData);
            });

            rebuildIndex();
        },
        getCurrent: function () {
            var currentPage = list.find('.active');
            var currentIndex = currentPage.attr('data-index');

            return currentIndex;
        },
        setCurrent: function (index) {
            var li = findLi(index);
            var currentPage = list.find('.active');
            var currentIndex = currentPage.attr('data-index');

            if (index != currentIndex) {
                currentPage.removeClass('active');
                li.addClass('active');
            }
        },
        add: function (index, itemData) {
            var li;
            var liTemp;
            var length
            
            li = $('<li><a href="#"></a></li>');
            li.find('a').text(itemData.title);

            length = getLength();
            if (index >= length) {
                liTemp = findLi(length - 1);
                liTemp.after(li);
            }
            else {
                liTemp = findLi(index);
                liTemp.before(li);
            }
            console.log(index, liTemp);
            rebuildIndex();
        },
        remove: function (index) {
            var length = getLength();
            var li = findLi(index);
            li.remove();
            rebuildIndex();
            if (index = length - 1) {
                index = length - 2;
            }
            if (index >= 0) {
                li = findLi(index);
                li.addClass('active');
            }

            rebuildIndex();
        },
        move: function (indexFrom, indexTo) {
            var liA;
            var liB;
            var length;

            if (indexTo == indexFrom || indexTo == indexFrom + 1) {
                return;
            }

            length = getLength();
            liA = findLi(indexFrom);

            if (indexTo >= length) {
                liB = findLi(length - 1);
                liB.after(liA);
            }
            else {
                liB = findLi(indexTo);
                liB.before(liA);
            }

            rebuildIndex();
        },
        swap: function (indexA, indexB) {
            var indexTemp;
            var liA;
            var liB;
            var liTemp;
            var length;

            if (indexA == indexB) {
                return;
            }
            if (indexA > indexB) {
                indexTemp = indexA;
                indexA = indexB;
                indexB = indexTemp;
            }

            length = getLength();
            liA = findLi(indexA);
            liB = findLi(indexB);

            if (indexB - indexA == 1) {
                liB.after(liA);
            }
            else {
                liTemp = liB.prev();
                liA.after(liB);
                liTemp.after(liA);
            }

            rebuildIndex();
        }
    };
});