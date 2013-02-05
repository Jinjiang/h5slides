define(['design/elements'], function (root) {
    var DESIGN_DATA_LIST = root.DESIGN_DATA_LIST;

    var dialog = root.dialog;
    var list = root.list;

    var cssFileMap = {};

    return {
        build: function () {
            list.empty();
            DESIGN_DATA_LIST.forEach(function (dataItem) {
                var li = $('<li class="span2"><a href="#" class="thumbnail"><img><span class="title"></span></a></li>');
                li.attr('data-key', dataItem.key);
                li.find('img').attr('src', 'images-new/design/' + dataItem.key + '.png');
                li.find('.title').text(dataItem.title);
                list.append(li);
            });
        },
        save: function (key) {
            dialog.attr('data-key', key);
        },
        setCurrent: function (key) {
            var li = list.find('[data-key="' + key + '"]');
            var currentLi = list.find('.active');
            var currentKey = currentLi.attr('data-key');

            if (key != currentKey) {
                currentLi.removeClass('active');
                li.addClass('active');

                if (!cssFileMap[key]) {
                    cssFileMap[key] = $('<link rel="stylesheet">').
                        attr('href', 'css-new/design/' + key + '.css').
                        appendTo($('head'));
                }
            }
        }
    };
});