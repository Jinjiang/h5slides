define(['cmd-center'], function (_) {
    $('#reset-btn').click(function (e) {
        e.preventDefault();
        _.reset();
    });
    $('#preview-btn').click(function (e) {
        e.preventDefault();
        _.preview();
    });
    $('#publish-btn').click(function (e) {
        e.preventDefault();
        _.publish();
    });
    $('#remove-btn').click(function (e) {
        e.preventDefault();
        _.remove();
    });
});