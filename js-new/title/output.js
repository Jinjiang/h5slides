define(['title/elements'], function (root) {
    var input = root.input;
    var label = root.label;
    return {
        updateTitle: function (title) {
            if (input.val() !== title) {
                input.val(title);
            }
            if (label.text() !== title) {
                label.text(title);
            }
        }
    };
});