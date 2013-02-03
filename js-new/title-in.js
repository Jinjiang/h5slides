define(['cmd-center'], function (_) {
    var inputWrapper = $('#title-editor-wrapper');
    var labelWrapper = $('#title-label-wrapper');
    var input = $('#input-title');
    var label = $('#label-title');

    inputWrapper.hide();
    label.on('click', function () {
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