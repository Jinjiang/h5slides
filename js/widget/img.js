widget.img = {
    render: function (item, data) {
        var src = data.config ? data.config.src : '#' || '#';
        var img = $('<img>').attr('src', src).
                attr('alt', data.value).
                css('display', 'block').
                css('margin', 'auto').
                css('max-width', '100%').
                css('max-height', '100%');
        item.empty().append(img);
    },
    edit: function (page, name, handler) {
        var slideData = window.data.get(page);
        var itemData = slideData.items[name];

        var oldSrc = itemData.config ? itemData.config.src : '';
        var newSrc = prompt('请输入图片的URL', oldSrc || '');

        window.data.setValue(page, name, !!newSrc);
        window.data.setType(page, name, 'img');
        window.data.setConfig(page, name, {src: newSrc});

        handler && handler();
    }
};