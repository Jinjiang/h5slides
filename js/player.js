define(['data', 'design', 'types'], function (dataManager, designManager, typeMap) {
    var btnPreview = $('#preview-btn');

    var player = $('#player');
    var editor = $('#editor');

    var stageDom = $('#player-stage');

    var btnMenu = $('#player-btn-menu');
    var btnNext = $('#player-btn-next');
    var btnPrev = $('#player-btn-prev');
    var btnGoto = $('#player-btn-goto');
    var btnExit = $('#player-btn-exit');

    var txtPage = $('#player-page');
    var txtSum = $('#player-sum');

    var gotoDialog = $('#goto-dialog');
    var gotoNumber = $('#goto-number');

    var currentSlide = $('');
    var slideLength;

    function createItem(key, itemData) {
        var itemDom = $('<div></div>');
        var type = itemData.type || 'text';
        var typeHelper = typeMap[type];

        itemDom.attr('data-key', key);
        itemDom.attr('data-type', type);

        if (typeHelper) {
            typeHelper.build(itemData, itemDom);
        }

        return itemDom;
    }

    function createSlide(page, slideData) {
        var slideDom = $('<div class="slide"></div>');

        slideDom.attr('id', 'slide-' + slideData.sid);
        slideDom.attr('data-page', page);
        slideDom.attr('data-layout', slideData.layout);
        slideDom.attr('data-template', slideData.template);

        $.each(slideData.items, function (key, itemData) {
            var itemDom = createItem(key, itemData);
            slideDom.append(itemDom);
        });

        return slideDom;
    }

    function gotoPage(page) {
        var newCurrentSlide = $(stageDom.find('.slide')[page]);

        currentSlide.children().each(function () {
            var itemDom = $(this);
            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            if (typeHelper && typeHelper.hide) {
                typeHelper.hide(itemDom);
            }
        });

        currentSlide.removeClass('current');
        currentSlide = newCurrentSlide;
        currentSlide.addClass('current');

        currentSlide.children().each(function () {
            var itemDom = $(this);
            var type = itemDom.attr('data-type');
            var typeHelper = typeMap[type];

            if (typeHelper && typeHelper.show) {
                typeHelper.show(itemDom);
            }
        });

        txtPage.text(page - (-1));
    }

    function play() {
        var design = dataManager.getDesign();
        var title = dataManager.getTitle();
        var slideList = dataManager.getSlideList();

        // set design
        designManager.loadCssLink(design);
        stageDom.attr('data-design', design);

        // build slide list
        stageDom.empty();
        $.each(slideList, function (i, slideData) {
            var slideDom = createSlide(i, slideData);
            stageDom.append(slideDom);
        });

        slideLength = slideList.length
        txtSum.text(slideLength);
        gotoNumber.attr('min', 1);
        gotoNumber.attr('max', slideLength);

        gotoPage(0);

        // init page navigator
        // onkeydown / ontouch / onclick
        // next / prev / end
        // ongo: each item: display
    }

    function clickNext(e) {
        var currentPage;

        e.preventDefault();

        if (currentSlide.length === 0) {
            return;
        }

        currentPage = currentSlide.attr('data-page') - 0;

        if (currentPage < slideLength - 1) {
            gotoPage(currentPage + 1);
        }
    }

    function clickPrev(e) {
        var currentPage;

        e.preventDefault();

        if (currentSlide.length === 0) {
            return;
        }

        currentPage = currentSlide.attr('data-page') - 0;

        if (currentPage > 0) {
            gotoPage(currentPage - 1);
        }
    }
    function clickGoto(e) {
        var currentPage = currentSlide.attr('data-page') - 0;

        e.preventDefault();

        gotoDialog.modal('show');
        gotoNumber.val(currentPage + 1);
    }
    function clickExit(e) {
        e.preventDefault();

        currentSlide = $('');
        slideLength = null;
        stageDom.empty();
        player.hide();
        editor.show();
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