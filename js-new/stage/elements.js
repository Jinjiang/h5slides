define(function () {
    var stage = $('#editor-stage');
    var slide = $('#editor-slide');
    var itemList = slide.find('[data-key]');
    var title = $('#slide-title');
    var content = $('#slide-content');
    var content2 = $('#slide-content2');
    var subtitle = $('#slide-subtitle');
    var subtitle2 = $('#slide-subtitle2');

    return {
        stage: stage,
        slide: slide,
        itemList: itemList,
        title: title,
        content: content,
        content2: content2,
        subtitle: subtitle,
        subtitle2: subtitle2
    };
});