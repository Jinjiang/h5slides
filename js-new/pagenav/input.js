define(['cmd-center', 'pagenav/elements'], function (_, root) {
    var pageList = root.list;
    var btnList = root.btnList;
    pageList.delegate('a', 'click', function (e) {
        var item = $(this);
        var index = item.attr('data-index');
        e.preventDefault();
        if (!item.hasClass('current')) {
            _.changePage(index);
        }
    });
    btnList.forEach(function (btn, key) {
        var currentPage = pageList.find('.current');
        var currentIndex = currentPage.attr('data-index');
        btn.click(function () {
            _[key + 'Page'](currentIndex);
        });
    });
});