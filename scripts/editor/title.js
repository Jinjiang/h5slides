define(['lib/zepto', 'data'], function ($, data) {
    var label = $('#main-title');

    function update(title) {
        if (title) {
            label.text(title).removeClass('empty');
        }
        else {
            label.text('NO TITLE').addClass('empty');
        }
    }

    label.click(function () {
        var title = data.getTitle();
        var newTitle = prompt('', title);

        if (typeof newTitle == 'object') {
            return;
        }

        data.setTitle(newTitle);
        update(newTitle);
    });

    return {
        update: update
    }
});