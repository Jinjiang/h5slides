define(['lib/zepto', 'data', 'status'], function ($, data, status) {
    var rootId = 'panel-paginations'

    var labelTotalPage = $('#' + rootId + '-total-page');
    var labelCurrentPage = $('#' + rootId + '-current-page');

    var btnNext = $('#' + rootId + '-btn-next');
    var btnPrevious = $('#' + rootId + '-btn-previous');
    var btnAdd = $('#' + rootId + '-btn-add');
    var btnRemove = $('#' + rootId + '-btn-remove');

    var list = $('#' + rootId + '-list');

    var current;

    function init() {
        var menu = data.getMenu();
        list.empty();
        menu.forEach(function (title, i) {
            var page = i + 1;
            var item = create(title);
            list.append(item);
        });
        checkHeader();
        setCurrent(status.page);
    }

    function create(title) {
        var li = $('<li><span class="title"></span></li>');
        li.find('.title').text(title || '[无标题]');
        return li;
    }

    function add(page) {
        page = parseInt(page);
        var length = data.getLength();
        if (page > length) {
            page = length;
        }
        if (page < 0) {
            page = 0;
        }

        var slide = data.add(page + 1);
        var title = slide.getTitle();
        var li = create(title);

        if (page == 0) {
            list.prepend(li);
        }
        else {
            var current = list.find('li:nth-child(' + page + ')');
            li.insertAfter(current);
        }

        change(page + 1);
    }

    function remove(page) {
        page = parseInt(page);
        var length = data.getLength();
        if (page > length) {
            page = length;
        }
        if (page < 1) {
            page = 1;
        }
        data.del(page);
        var li = list.find('li:nth-child(' + page + ')');
        li.remove();
        if (page > 1) {
            page--;
        }
        status.page = 0;
        change(page);
    }

    function update(page) {
        page = parseInt(page);
        var title = data.get(page).getTitle();
        var li = list.find('li:nth-child(' + page + ')');
        li.find('.title').text(title || '[无标题]');
    }

    function change(page) {
        page = parseInt(page);
        if (page === status.page) {
            return;
        }
        setCurrent(page);
        mod.onpagechange && mod.onpagechange(status.page);
    }

    function setCurrent(page) {
        page = parseInt(page);
        status.page = page;
        if (current) {
            current.removeClass('current');
        }
        current = list.find('li:nth-child(' + page + ')');
        current.addClass('current');
        checkHeader();
    }

    function checkHeader() {
        var length = data.getLength();
        btnPrevious.prop('disabled', status.page === 1);
        btnNext.prop('disabled', status.page === length);
        btnRemove.prop('disabled', length === 1);
        btnAdd.prop('disabled', length > 20);
        labelCurrentPage.text(status.page);
        labelTotalPage.text(length);
    }

    btnAdd.click(function () {
        add(status.page);
    });
    btnRemove.click(function () {
        remove(status.page);
    });
    btnNext.click(function () {
        change(status.page + 1);
    });
    btnPrevious.click(function () {
        change(status.page - 1);
    });
    list.delegate('li', 'click', function () {
        var index = $(this).index();
        var page = index + 1;
        change(page);
    });

    var mod = {
        init: init,
        updateCurrent: setCurrent,
        updateTitle: update
    };

    return mod;
});