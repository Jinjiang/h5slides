widget.img = {
    render: function (item, data) {
        var src = data.w_img_src;
        var img = $('<img>').attr('src', src).
                attr('alt', data.value).
                css('max-width', '100%').
                css('max-height', '100%');
        item.empty().append(img);
    }
};