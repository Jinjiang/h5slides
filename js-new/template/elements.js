define(function () {
    var TEMPLATE_DATA_LIST = [
        {key: 'normal', thumbnail: 'normal', layout: 'normal', typeMap: {title: 'text', content: 'text'}},
        {key: 'title', thumbnail: 'title', layout: 'title', typeMap: {title: 'text', content: 'text'}},
        {key: 'picture', thumbnail: 'picture', layout: 'normal', typeMap: {title: 'text', content: 'img'}},
        {key: 'double', thumbnail: 'double', layout: 'double', typeMap: {title: 'text', content: 'text', content2: 'text'}},
        {key: 'picture-left', thumbnail: 'picture-left', layout: 'double', typeMap: {title: 'text', content: 'img', content2: 'text'}},
        {key: 'picture-right', thumbnail: 'picture-right', layout: 'double', typeMap: {title: 'text', content: 'text', content2: 'img'}},
        {key: 'subtitle', thumbnail: 'subtitle', layout: 'subtitle', typeMap: {title: 'text', content: 'text'}},
        {key: 'double-subtitle', thumbnail: 'double-subtitle', layout: 'double-subtitle', typeMap: {title: 'text', subtitle: 'text', subtitle2: 'text', content: 'text', content2: 'text'}}
    ];

    var TEMPLATE_DATA_MAP = {};

    TEMPLATE_DATA_LIST.forEach(function (dataItem) {
        TEMPLATE_DATA_MAP[dataItem.key] = dataItem;
    });

    return {
        TEMPLATE_DATA_LIST: TEMPLATE_DATA_LIST,
        TEMPLATE_DATA_MAP: TEMPLATE_DATA_MAP,
        list: $('#template-list')
    };
});