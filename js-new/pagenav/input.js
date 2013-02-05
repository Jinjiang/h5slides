define(['cmd-center', 'pagenav/elements'], function (_, root) {
    var pageList = root.list;
    var btnList = root.btnList;

    pageList.delegate('a', 'click', function (e) {
        var li = $(this).parent();
        var index = li.attr('data-index');

        e.preventDefault();

        if (!li.hasClass('active')) {
            _.changePage(index);
        }
    });
    $.each(btnList, function (key, btn) {
        $(btn).click(function (e) {
            if (key == 'remove') {
                if (!confirm('Are you sure to remove the current page?')) {
                    return;
                }
            }
            _[key + 'Page']();
        });
    });
});