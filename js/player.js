define(['data', 'design', 'types'], function (dataManager, designManager, typeMap) {
    var btnPreview = $('#preview-btn');

    var player = $('#player');
    var editor = $('#editor');

    var stageDom = $('#player-stage');
    var slidesContainer = $('#player-slides-container');
    var unscalableContainer = $('#player-unscalable-container');

    var btnMenu = $('#player-btn-menu');
    var btnNext = $('#player-btn-next');
    var btnPrev = $('#player-btn-prev');
    var btnGoto = $('#player-btn-goto');
    var btnExit = $('#player-btn-exit');

    var txtPage = $('#player-page');
    var txtSum = $('#player-sum');

    var gotoDialog = $('#goto-dialog');
    var gotoNumber = $('#goto-number');

    var currentPage;
    var slideLength;

    var fullscreenEnabled = document.webkitFullscreenEnabled;

    function createItem(key, itemData, unscalable) {
        var itemDom = $('<div><div class="output"></div></div>');
        var type = itemData.type || 'text';
        var typeHelper = typeMap[type];
        var output = itemDom.find('.output');

        itemDom.attr('data-key', key);
        itemDom.attr('data-type', type);

        if (typeHelper) {
            if (typeHelper.unscalable == unscalable) {
                typeHelper.build(itemData, output);
            }
            if (typeHelper.unscalable && unscalable) {
                itemDom.attr('data-unscalable', true);
            }
            if (typeHelper.unscalable && !unscalable) {
                itemDom.attr('data-placeholder', true);
            }
            if (typeHelper.unscalable || !unscalable) {
                return itemDom;
            }
        }
    }

    function createSlide(page, slideData, unscalable) {
        var slideDom = $('<div></div>');

        if (unscalable) {
            slideDom.addClass('unscalable-slide');
        }
        else {
            slideDom.addClass('slide');
        }

        slideDom.attr('id', 'slide-' + slideData.sid);
        slideDom.attr('data-page', page);
        slideDom.attr('data-layout', slideData.layout);
        // slideDom.attr('data-template', slideData.template);

        $.each(slideData.items, function (key, itemData) {
            var itemDom = createItem(key, itemData, unscalable);
            if (itemDom) {
                slideDom.append(itemDom);
            }
        });

        return slideDom;
    }

    function handleAllPageDom(page, handle) {
        var slideDom = $(slidesContainer.find('.slide')[page]);
        var unscalableDom = $(unscalableContainer.find('.unscalable-slide')[page]);

        handle(slideDom);
        handle(unscalableDom);
    }

    function hidePage(dom) {
        dom.children().each(function () {
            var itemDom = $(this);
            var output = itemDom.find('.output');
            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            if (!itemDom.attr('data-placeholder') && typeHelper && typeHelper.hide) {
                typeHelper.hide(output);
            }
        });
        dom.removeClass('slide-current');
        dom.prev().removeClass('slide-prev');
        dom.next().removeClass('slide-next');
    }

    function showPage(dom) {
        dom.addClass('slide-current');
        dom.prev().addClass('slide-prev');
        dom.next().addClass('slide-next');

        dom.children().each(function () {
            var itemDom = $(this);
            var output = itemDom.find('.output');
            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            if (!itemDom.attr('data-unscalable') && typeHelper && typeHelper.show) {
                typeHelper.show(output);
            }
        });
    }

    function resizeUnscalableItems(page) {
        var slideDom = $(slidesContainer.find('.slide')[page]);
        var unscalableDom = $(unscalableContainer.find('.unscalable-slide')[page]);
        unscalableDom.children().each(function () {
            var itemDom = $(this);
            var output = itemDom.find('.output');
            var key = itemDom.attr('data-key');
            var oriDom = slideDom.find('[data-key="' + key + '"]');

            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            var rect = oriDom[0].getBoundingClientRect();

            output.css('top', rect.top + 'px');
            output.css('left', rect.left + 'px');
            output.css('width', rect.width + 'px');
            output.css('height', rect.height + 'px');

            if (typeHelper.adjust) {
                typeHelper.adjust(output);
            }
            if (typeHelper.show) {
                typeHelper.show(output);
            }
        });
    }

    function gotoPage(page) {
        handleAllPageDom(currentPage, hidePage);
        currentPage = page - 0;
        txtPage.text(page - (-1));
        handleAllPageDom(currentPage, showPage);
        resizeUnscalableItems(currentPage);
    }

    function scaleSlides() {
        var WIDTH = 640;
        var HEIGHT = 480;

        var stageWidth = player.width() - 40;
        var stageHeight = player.height() - 60;

        var scale = Math.min(stageWidth / WIDTH, stageHeight / HEIGHT);

        scale = Math.floor(scale * 100) / 100;

        slidesContainer.css('-webkit-transform', 'scale(' + scale + ')');
    }

    function goNext() {
        if (currentPage < slideLength - 1) {
            gotoPage(currentPage + 1);
        }
    }
    function goPrev() {
        if (currentPage > 0) {
            gotoPage(currentPage - 1);
        }
    }
    function exitFullscreen() {
        if (fullscreenEnabled && document.webkitIsFullScreen) {
            document.webkitExitFullscreen();
        }
    }
    function doExit() {
        slidesContainer.css('-webkit-transform', '');

        currentPage = -1;

        slideLength = null;
        slidesContainer.empty();
        unscalableContainer.empty();

        $(window).unbind('resize', scaleSlides);
        $(window).unbind('keydown', keydown);

        if (fullscreenEnabled) {
            document.onwebkitfullscreenchange = null;
        }

        player.hide();
        editor.show();
    }

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
            if (fullscreenEnabled) {
                exitFullscreen();
            }
            doExit();
            break;
        default:
            ;
        }
    }

    function play() {
        var design = dataManager.getDesign();
        var transition = dataManager.getTransition();
        var title = dataManager.getTitle();
        var slideList = dataManager.getSlideList();

        // set design
        designManager.loadCssLink(design);
        stageDom.attr('data-design', design);
        stageDom.attr('data-transition', transition);

        // build slide list
        slidesContainer.empty();
        $.each(slideList, function (i, slideData) {
            var slideDom = createSlide(i, slideData);
            var unscalableDom = createSlide(i, slideData, true);

            slidesContainer.append(slideDom);
            unscalableContainer.append(unscalableDom);
        });

        slideLength = slideList.length
        txtSum.text(slideLength);
        gotoNumber.attr('min', 1);
        gotoNumber.attr('max', slideLength);

        gotoPage(0);

        $(window).bind('resize', scaleSlides);
        $(window).bind('keydown', keydown);

        if (fullscreenEnabled) {
            document.body.webkitRequestFullscreen();
            document.onwebkitfullscreenchange = function (e) {
                if (!document.webkitIsFullScreen) {
                    doExit();
                }
            };
        }
    }

    function clickNext(e) {
        e.preventDefault();
        goNext();
    }
    function clickPrev(e) {
        e.preventDefault();
        goPrev();
    }
    function clickGoto(e) {
        e.preventDefault();

        gotoDialog.modal('show');
        gotoNumber.val(currentPage + 1);
    }
    function clickExit(e) {
        e.preventDefault();
        if (fullscreenEnabled) {
            exitFullscreen();
        }
        doExit();
    }

    btnPreview.click(function (e) {
        e.preventDefault();
        editor.hide();
        player.show();
        play();
    });
    btnNext.click(clickNext);
    btnPrev.click(clickPrev);
    btnGoto.click(clickGoto);
    btnExit.click(clickExit);

    gotoDialog.find('[data-action="go"]').click(function (e) {
        var newPage = gotoNumber.val() - 1;
        gotoPage(newPage);
    });

    return {};
});