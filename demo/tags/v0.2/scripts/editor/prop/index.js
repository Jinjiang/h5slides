define(['editor/prop/color',
    'editor/prop/backgroundimage',
    'editor/prop/text',
    'editor/prop/img'
], function (Color, BackgroundImage, Text, Img) {
    return {
        'color': Color,
        'background-image': BackgroundImage,
        '-val-text': Text,
        '-val-title': Text,
        '-val-img': Img
    };
});