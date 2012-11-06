define(['editor/widget/slide',
    'editor/widget/blank',
    'editor/widget/text',
    'editor/widget/img'
], function (Slide, Blank, Text, Img) {
    return {
        'slide': Slide,
        '': Blank,
        'text': Text,
        'title': Text,
        'img': Img
    };
});