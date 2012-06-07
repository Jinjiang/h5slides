define(['lib/zepto', 'data'], function ($, data) {
    var rootId = 'panel-paginations'

    var labelTotalPage = $('#' + rootId + '-total-page');
    var labelCurrentPage = $('#' + rootId + '-current-page');

    var btnNext = $('#' + rootId + '-btn-next');
    var btnPrevious = $('#' + rootId + '-btn-previous');
    var btnAdd = $('#' + rootId + '-btn-add');
    var btnRemove = $('#' + rootId + '-btn-remove');

    var list = $('#' + rootId + '-list');

    var current;
    var currentPage;

    function init() {
        var menu = data.getMenu();
        list.empty();
        menu.forEach(function (i, title) {
            var page = i + 1;
            var item = create(title);
            list.append(item);
        });
        checkHeader();
    }
    function create(title) {
        var li = $('<li><span class="title"></span></li>');
        li.find('.title').text(title || '[NO TITLE]');
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
        currentPage = 0;
        change(page);
    }
    function update(page) {
        page = parseInt(page);
        var title = data.get(page).getTitle();
        var li = list.find('li:nth-child(' + page + ')');
        li.find('.title').text(title || '[NO TITLE]');
    }
    function change(page) {
        page = parseInt(page);
        if (page === currentPage) {
            return;
        }
        setCurrent(page);
        mod.onpagechange && mod.onpagechange(currentPage);
    }
    function setCurrent(page) {
        page = parseInt(page);
        currentPage = page;
        if (current) {
            current.removeClass('current');
        }
        current = list.find('li:nth-child(' + page + ')');
        current.addClass('current');
        checkHeader();
    }
    function checkHeader() {
        var length = data.getLength();
        btnPrevious.prop('disabled', currentPage === 1);
        btnNext.prop('disabled', currentPage === length);
        btnRemove.prop('disabled', length === 1);
        btnAdd.prop('disabled', length > 20);
        labelCurrentPage.text(currentPage);
        labelTotalPage.text(length);
    }

    btnAdd.click(function () {
        add(currentPage);
    });
    btnRemove.click(function () {
        remove(currentPage);
    });
    btnNext.click(function () {
        change(currentPage + 1);
    });
    btnPrevious.click(function () {
        change(currentPage - 1);
    });
    list.delegate('li', 'click', function () {
        var index = $(this).index();
        var page = index + 1;
        change(page);
    });

    var mod = {
        build: init,
        updateCurrent: setCurrent,
        updateTitle: update
    };

    return mod;
});