define(['stage/elements'], function (root) {
    var stage = root.stage;
    var slide = root.slide;

    function getItem(key) {
        if (!key || key == 'slide') {
            return slide;
        }
        if (key == 'stage') {
            return stage;
        }
        key = key.replace(/"/g, '');
        return slide.find('[data-key="' + key + '"]');
    }

    function setDesign(design) {
        stage.attr('data-design', design);
    }

    function setLayout(layout) {
        slide.attr('data-layout', layout);
    }

    return {
        root: stage,
        setDesign: setDesign,
        setLayout: setLayout,
        getItem: getItem
    };
});