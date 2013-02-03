define(['cmd-center', 'stage/elements'], function (_, root) {
    var stage = root.stage;
    var slide = root.slide;

    slide.delegate('[data-key]', 'dblclick', function (e) {
        var item = $(this);
        var key = item.attr('data-key');

        var currentItem = slide.find('.current');
        var currentKey = currentItem.attr('data-key');

        if (key == currentKey) {
            if (currentItem.hasClass('active')) {
                return;
            }
        }
        else {
            if (currentItem.has('active')) {
                currentItem.removeClass('active');
                _.blurItem(currentKey);
            }
            currentItem.removeClass('current');
            item.addClass('current');
            _.changeItem(key);
        }

        item.addClass('active');
        _.focusItem(key);
    });

    stage.click(function (e) {
        var target = $(e.target);

        var targetItem = target.closest('[data-key]', slide[0]);
        var targetKey = targetItem.attr('data-key');

        var currentItem = slide.find('.current');
        var currentKey = currentItem.attr('data-key');

        if (currentItem.hasClass('active')) {
            currentItem.removeClass('active');
            _.blurItem(currentKey);
        }

        if (currentKey && targetKey != currentKey) {
            currentItem.removeClass('current');
        }

        if (targetKey) {
            targetItem.addClass('current');
        }

        if (targetKey != currentKey) {
            _.changeItem(targetKey);
        }
    });
});