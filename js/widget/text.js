widget.text = {
    render: function (item, data) {
        var size = item.data('css-size') || '';

        item.html(TextParser.txt2P(data.value));
        item.removeClass('small-font-size large-font-size');

        if (size && size != 'normal') {
            item.addClass(size + '-font-size');
        }
    }
};