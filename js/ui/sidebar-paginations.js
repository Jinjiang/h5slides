/**
    @fileOverview
    页面切换面板
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    页面切换面板的构造器
    @constructor
 */
function Paginations() {
    var rootId = 'panel-paginations'
    var max = 1;
    var min = 1;
    var currentPage;
    var titleArray = [];

    var root = $('#' + rootId);
    var header = $('#' + rootId + ' .header');
    var labelTotalPage = $('#' + rootId + '-total-page');
    var labelCurrentPage = $('#' + rootId + '-current-page');
    var btnNext = $('#' + rootId + '-btn-next');
    var btnPrevious = $('#' + rootId + '-btn-previous');
    var btnAdd = $('#' + rootId + '-btn-add');
    var btnRemove = $('#' + rootId + '-btn-remove');
    var list = $('#' + rootId + '-list');

    var isExpanded = root.hasClass('expanded');
    var isUpdated = true;

    var that = this;


    //// MODEL ////


    function changeCurrentPage(page) {

        if (page > max) {
            page = max;
        }
        if (page < min) {
            page = min;
        }

        currentPage = page - 0;

        return currentPage;
    }

    function setMaxPage(m) {
        var newCurrentPage;

        if (m > 0) {
            max = m - 0;
            if (currentPage > max) {
                currentPage = max;
                newCurrentPage = currentPage;
            }
        }
        else {
            max = 1;
        }

        return newCurrentPage;
    }

    function setTitleArray(list) {
        titleArray.length = 0;
        $.each(list, function (index, title) {
            titleArray[index] = title;
        });
    }

    function addTitle(page, title) {
        var index = page - 1;
        titleArray.splice(index + 1, 0, title);
    }

    function removeTitle(page) {
        var index = page - 1;
        titleArray.splice(index, 1);
    }

    function changeTitle(page, title) {
        var index = page - 1;
        titleArray[index] = title;
    }


    /// VIEW ///


    function checkNavEnabled() {
        btnPrevious.prop('disabled', currentPage == min);
        btnNext.prop('disabled', currentPage == max);
        btnRemove.prop('disabled', max == 1);
    }

    function showList() {
        isExpanded = true;
    }

    function hideList() {
        isExpanded = false;
    }

    function setCurrentTitle(page) {
        var li = list.find('li:nth-child(' + page + ')');
        list.find('li.current').removeClass('current');
        li.addClass('current');
    }

    function renderTitleArray(newTitleArray) {
        list.empty();
        $.each(newTitleArray, function (index, title) {
            title = title || 'Unknown';
            var li = $('<li><span class="title"></span></li>').
                appendTo(list).find('.title').text(title);
            if (index == currentPage - 1) {
                li.addClass('current');
            }
        });
    }

    function renderAddedTitle(page, title) {
        var prev;
        var li = $('<li><span class="title"></span></li>');

        li.find('.title').text(title || 'Unknown');

        if (page == 0) {
            list.prepend(li);
        }
        else {
            prev = list.find('li:nth-child(' + page + ')');
            li.insertAfter(prev);
        }
    }

    function renderRemovedTitle(page) {
        var li = list.find('li:nth-child(' + page + ')');
        li.remove();
    }

    function renderChangedTitle(page, title) {
        var li = list.find('li:nth-child(' + page + ')');
        li.find('.title').text(title || 'Unknown');
    }


    /// CONTROLLER ///


    this.go = function (page) {
        changeCurrentPage(page);
        if (isExpanded) {
            setCurrentTitle(currentPage);
        }
        else {
            isUpdated = false;
        }
        labelCurrentPage.text(currentPage);
        checkNavEnabled();
    };
    this.setMax = function (m) {
        var newCurrentPage = setMaxPage(m);

        if (newCurrentPage) {
            this.go(newCurrentPage);
        }
        labelTotalPage.text(max);
        checkNavEnabled();
    };
    this.expand = function () {
        showList();
        if (!isUpdated) {
            renderTitleArray(titleArray);
        }
        isUpdated = true;
    };
    this.collapse = function () {

        hideList();
    };
    this.add = function (page, title) {
        setMaxPage(max + 1);
        labelTotalPage.text(max);
        if (page > max) {
            page = max;
        }
        addTitle(page, title);
        if (isExpanded) {
            renderAddedTitle(page, title);
        }
        else {
            isUpdated = false;
        }
        this.go(page);
    };
    this.remove = function (page) {
        if (max == 1) {
            return;
        }
        setMaxPage(max - 1);
        labelTotalPage.text(max);
        removeTitle(page);
        if (isExpanded) {
            renderRemovedTitle(page);
        }
        else {
            isUpdated = false;
        }
        this.go(page - 1);
    };
    this.setTitle = function (page, title) {
        changeTitle(page, title);
        if (isExpanded) {
            renderChangedTitle(page, title);
        }
        else {
            isUpdated = false;
        }
    };
    this.initData = function (newTitleArray) {
        if (newTitleArray.length > 0) {
            setMaxPage(newTitleArray.length);
            labelTotalPage.text(max);
            changeCurrentPage(1);
            setTitleArray(newTitleArray);
            if (isExpanded) {
                renderTitleArray(newTitleArray);
            }
            else {
                isUpdated = false;
            }
            this.go(1);
        }
    };


    /// EVENTS ///


    header.bind('click', function () {
        if (isExpanded) {
            that.collapse();
        }
        else {
            that.expand();
        }
    }).bind('mousedown', function () {
        return false;
    });
    list.delegate('li', 'click', function (event) {
        var index = $(this).index();
        var page = index + 1;
        that.notify('go', page);
    })
    btnNext.bind('click', function () {
        that.notify('nav', 'next');
    });
    btnPrevious.bind('click', function () {
        that.notify('nav', 'previous');
    });
    btnAdd.bind('click', function () {
        that.notify('nav', 'add');
    });
    btnRemove.bind('click', function () {
        if (confirm('Are you sure to remove this slide?')) {
            that.notify('nav', 'remove');
        }
    });
}


reg(Paginations);



