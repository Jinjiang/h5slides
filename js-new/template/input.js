define(['cmd-center', 'template/elements'], function (_, root) {
    var TEMPLATE_DATA = [
        {key: 'normal', thumbnail: 'normal', layout: 'normal', typeMap: {title: 'text', content: 'text'}},
        {key: 'title', thumbnail: 'title', layout: 'title', typeMap: {title: 'text', content: 'text'}},
        {key: 'picture', thumbnail: 'normal', layout: 'normal', typeMap: {title: 'text', content: 'img'}},
        {key: 'double', thumbnail: 'double', layout: 'double', typeMap: {title: 'text', content: 'text', content2: 'text'}},
        {key: 'picture-left', thumbnail: 'double', layout: 'double', typeMap: {title: 'text', content: 'img', content2: 'text'}},
        {key: 'picture-right', thumbnail: 'double', layout: 'double', typeMap: {title: 'text', content: 'text', content2: 'img'}},
        {key: 'subtitle', thumbnail: 'subtitle', layout: 'subtitle', typeMap: {title: 'text', content: 'text'}},
        {key: 'double-subtitle', thumbnail: 'double-subtitle', layout: 'double-subtitle', typeMap: {title: 'text', subtitle: 'text', subtitle2: 'text', content: 'text', content2: 'text'}}
    ];

    var list = root.list;
    list.empty();

    TEMPLATE_DATA.forEach(function (data) {
        var li = $('<li class="span1"><a href="#" class="thumbnail"><img></a></li>');
        li.find('a').attr('data-key', data.key);
        li.find('img').attr('src', 'images/layout-' + data.thumbnail + '.png');
        li.find('a').click(function (e) {
            e.preventDefault();
            _.setTemplate(data.key, data.layout, data.typeMap);
        });
        list.append(li);
    });
});