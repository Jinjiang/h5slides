define(['cmd-center', 'title/elements'], function (_, root) {
    var inputWrapper = root.inputWrapper;
    var labelWrapper = root.labelWrapper;
    var input = root.input;
    var label = root.label;

    inputWrapper.hide();
    label.on('click', function (e) {
        e.preventDefault();
        labelWrapper.hide();
        inputWrapper.show();
        input.focus();
    });
    input.on('blur', function () {
        inputWrapper.hide()
        labelWrapper.show();
    });
    input.on('input', function () {
        _.changeTitle(input.val());
    });
});