define(['cmd-center'], function (_) {
    $('reset-btn').click(function () {
        _.reset();
    });
    $('preview-btn').click(function () {
        _.preview();
    });
    $('publish-btn').click(function () {
        _.publish();
    });
    $('remove-btn').click(function () {
        _.remove();
    });
});