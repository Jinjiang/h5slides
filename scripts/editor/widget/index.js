define(['editor/widget/slide',
    'editor/widget/blank',
    'editor/widget/text',
    'editor/widget/img',
    'editor/widget/demo'
], function (Slide, Blank, Text, Img, Demo) {
    return {
        'slide': Slide,
        '': Blank,
        'text': Text,
        'title': Text,
        'img': Img,
        'demo': Demo
    };
});