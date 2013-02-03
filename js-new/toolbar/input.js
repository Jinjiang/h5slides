define(['cmd-center', 'toolbar/elements'], function (_, root) {
    root.familyList.delegate('a', 'click', function (e) {
        var val = $(this).text();
        _.changeFontFamily(val);
        e.preventDefault();
    });
});