define(['data', 'design', 'types', 'vm'], function (dataManager, designManager, typeMap, vm) {
    var btnPreview = $('#preview-btn');
    var btnPreviewCurrent = $('#preview-current-btn');

    var player = $('#player');
    var editor = $('#editor');

    var stageDom = $('#player-stage');
    var slidesContainer = $('#player-slides-container');

    var btnMenu = $('#player-btn-menu');
    var btnNext = $('#player-btn-next');
    var btnPrev = $('#player-btn-prev');
    var btnGoto = $('#player-btn-goto');
    var btnExit = $('#player-btn-exit');

    var txtPage = $('#player-page');
    var txtSum = $('#player-sum');

    var gotoDialog = $('#goto-dialog');
    var gotoNumber = $('#goto-number');
    var btnGo = gotoDialog.find('[data-action="go"]');

    var slideLength;
    var currentPage;

    var currentSlideDom;
    var nextSlideDom;
    var prevSlideDom;

    var fullscreenEnabled = document.webkitFullscreenEnabled;
    var isPlaying = false;


    /**
        进入全屏模式
     */
    function gotoFullscreen() {
        if (fullscreenEnabled) {
            document.body.webkitRequestFullscreen();
        }
    }
    /**
        退出全屏模式
     */
    function exitFullscreen() {
        if (fullscreenEnabled && isFullscreen()) {
            document.webkitExitFullscreen();
        }
    }
    /**
        判断是否全屏状态
     */
    function isFullscreen() {
        return document.webkitIsFullScreen;
    }
    /**
        绑定全屏模式事件
        @param {function} handler(isFullscreen)
     */
    function bindFullscreenChange(handler) {
        if (fullscreenEnabled) {
            document.onwebkitfullscreenchange = function (e) {
                handler && handler(isFullscreen());
            };
        }
    }


    /**
        创建一个元素
     */
    function createItem(key, itemData) {
        var itemDom = $('<div><div class="output"></div></div>');
        var type = itemData.type || 'text';
        var typeHelper = typeMap[type];
        var output = itemDom.find('.output');

        itemDom.attr('data-key', key);
        itemDom.attr('data-type', type);

        if (typeHelper) {
            typeHelper.build(itemData, output);
        }

        return itemDom;
    }
    /**
        创建一页幻灯片
     */
    function createSlide(page, slideData) {
        var slideDom = $('<div></div>');

        slideDom.addClass('slide');

        slideDom.attr('id', 'slide-' + slideData.sid);
        slideDom.attr('data-layout', slideData.layout);
        slideDom.attr('data-page', page);

        $.each(slideData.items, function (key, itemData) {
            var itemDom = createItem(key, itemData);
            if (itemDom) {
                slideDom.append(itemDom);
            }
        });

        return slideDom;
    }


    /**
        获取某一页幻灯片
     */
    function getSlideDom(page) {
        if (page < 0) {
            return $();
        }
        return $(slidesContainer.find('.slide')[page]);
    }


    /**
        隐藏一页幻灯片
     */
    function hidePage(dom) {
        dom.children().each(function () {
            var itemDom = $(this);
            var output = itemDom.find('.output');
            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            if (typeHelper && typeHelper.hide) {
                typeHelper.hide(output);
            }
        });
    }
    /**
        显示一页幻灯片
     */
    function showPage(dom) {
        dom.children().each(function () {
            var itemDom = $(this);
            var output = itemDom.find('.output');
            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            if (typeHelper && typeHelper.show) {
                typeHelper.show(output);
            }
        });
    }


    /**
        切换两页幻灯片
     */
    function switchPage(newPage) {
        var next = -1;
        var prev = -1;

        var oldPage = -1;
        var oldNext = -1;
        var oldPrev = -1;

        // get old current/next/prev
        if (currentSlideDom) {
            oldPage = currentSlideDom.attr('data-page') - 0;
        }
        if (nextSlideDom) {
            oldNext = nextSlideDom.attr('data-page') - 0;
        }
        if (prevSlideDom) {
            oldPrev = prevSlideDom.attr('data-page') - 0;
        }

        if (oldPage == newPage) {
            return;
        }

        // get new current/next/prev
        if (newPage > 0) {
            prev = newPage - 1;
        }
        if (newPage < slideLength - 1) {
            next = newPage + 1;
        }
        if (oldPage >= 0) {
            if (oldPage > newPage) {
                next = oldPage;
            }
            else if (oldPage < newPage) {
                prev = oldPage;
            }
        }

        currentSlideDom && currentSlideDom.removeClass('slide-current');
        nextSlideDom && nextSlideDom.removeClass('slide-next');
        prevSlideDom && prevSlideDom.removeClass('slide-prev');

        currentSlideDom = null;
        nextSlideDom = null;
        prevSlideDom = null;

        if (newPage >= 0) {
            currentSlideDom = getSlideDom(newPage).addClass('slide-current');
        }
        if (next >= 0) {
            nextSlideDom = getSlideDom(next).addClass('slide-next');
        }
        if (prev >= 0) {
            prevSlideDom = getSlideDom(prev).addClass('slide-prev');
        }
    }

    /**
        跳转到某一页
     */
    function gotoPage(page) {
        var oldPage = currentPage;
        var newPage = page - 0;

        var oldSlideDom = currentSlideDom;
        var newSlideDom = getSlideDom(page);;

        if (oldPage == newPage) {
            return;
        }

        if (oldSlideDom) {
            hidePage(oldSlideDom);
        }
        if (newSlideDom) {
            showPage(newSlideDom);
        }

        currentPage = newPage;
        txtPage.text(newPage + 1);

        switchPage(newPage);
    }


    /**
        下一页
     */
    function goNext() {
        if (currentPage < slideLength - 1) {
            gotoPage(currentPage + 1);
        }
    }
    /**
        前一页
     */
    function goPrev() {
        if (currentPage > 0) {
            gotoPage(currentPage - 1);
        }
    }


    /**
        绑定点击下一页按钮的事件
     */
    function clickNext(e) {
        e.preventDefault();
        goNext();
    }
    /**
        绑定点击前一页按钮的事件
     */
    function clickPrev(e) {
        e.preventDefault();
        goPrev();
    }
    /**
        绑定点击弹出跳转对话框按钮的事件
     */
    function clickGoto(e) {
        e.preventDefault();

        gotoDialog.modal('show');
        gotoNumber.val(currentPage + 1);
    }
    /**
        绑定点击跳转按钮的事件
     */
    function clickGo(e) {
        var newPage = gotoNumber.val() - 1;
        gotoPage(newPage);
    }


    /**
        退出播放器，显示编辑器
     */
    function doExit() {
        slidesContainer.css('-webkit-transform', '');

        currentSlideDom = null;
        nextSlideDom = null;
        prevSlideDom = null;

        currentPage = -1;

        slideLength = null;
        slidesContainer.empty();

        $(window).unbind('keydown', keydown);

        bindFullscreenChange(null);
        exitFullscreen();

        player.hide();
        editor.show();

        isPlaying = false;
    }

    /**
        启动播放器，初始化幻灯片和屏幕
     */
    function doPlay(page) {
        var design = dataManager.getDesign();
        var transition = dataManager.getTransition();
        var title = dataManager.getTitle();
        var slideList = dataManager.getSlideList();

        designManager.loadCssLink(design);
        stageDom.attr('data-design', design);
        stageDom.attr('data-transition', transition);

        slidesContainer.empty();
        $.each(slideList, function (i, slideData) {
            var slideDom = createSlide(i, slideData);

            slidesContainer.append(slideDom);
        });

        slideLength = slideList.length
        txtSum.text(slideLength);
        gotoNumber.attr('min', 1);
        gotoNumber.attr('max', slideLength);
            
        gotoPage(parseInt(page) || 0);

        $(window).bind('keydown', keydown);

        gotoFullscreen();
        bindFullscreenChange(function (isFullscreen) {
            if (!isFullscreen) {
                 doExit();
            }
        });

        isPlaying = true;
    }


    /**
        绑定键盘事件
     */
    function keydown(e) {
        switch (e.keyCode) {
        case 38:
        case 37:
            goPrev();
            break;
        case 13:
        case 39:
        case 40:
            goNext();
            break;
        case 27:
            doExit();
            break;
        default:
            ;
        }
    }

    /**
        绑定点击退出按钮的事件
     */
    function clickExit(e) {
        e.preventDefault();
        doExit();
    }

    /**
        绑定点击播放按钮的事件
     */
    function clickPreview(e) {
        e.preventDefault();
        editor.hide();
        player.show();
        doPlay();
    }

    /**
        绑定点击播放按钮的事件
     */
    function clickPreviewCurrent(e) {
        e.preventDefault();
        editor.hide();
        player.show();
        doPlay(vm.currentPage());
    }


    btnPreview.click(clickPreview);
    btnPreviewCurrent.click(clickPreviewCurrent);
    btnNext.click(clickNext);
    btnPrev.click(clickPrev);
    btnGoto.click(clickGoto);
    btnExit.click(clickExit);
    btnGo.click(clickGo);


    return {};
});