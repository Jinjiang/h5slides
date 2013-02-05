define(['cmd-center', 'design/elements'], function (_, root) {
    var dialog = root.dialog;
    var list = root.list;
    var closeBtn = root.closeBtn;

    list.delegate('a', 'click', function (e) {
        var li = $(this).parent();
        var key = li.attr('data-key');
        var currentLi = list.find('.active');
        var currentKey = currentLi.attr('data-key');

        e.preventDefault();

        if (key != currentKey) {
            _.previewDesign(key);
        }
    });
    closeBtn.click(function (e) {
        var target = $(this);
        var oldKey = dialog.attr('data-key');
        var currentLi = list.find('.active');
        var currentKey = currentLi.attr('data-key');

        e.preventDefault();

        if (currentKey != oldKey) {
            if (target.attr('data-action') == 'save') {
                _.saveDesign(currentKey);
            }
            else {
                _.revertDesign();
            }
        }
    });
});