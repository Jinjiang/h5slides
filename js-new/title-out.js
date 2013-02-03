define(function () {
    var input = $('#input-title');
    var label = $('#label-title');
    return {
        updateTitle: function (title) {
            if (input.val() !== title) {
                inputVal.val(title);
            }
            if (label.text() !== title) {
                label.text(title);
            }
        }
    };
});