define(['lib/zepto', 'data', 'status'], function ($, data, status) {
    var label = $('#main-title');

    function init() {
        update(data.getTitle());
    }

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
        init: init,
        update: update
    }
});