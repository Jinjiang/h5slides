define(function () {
    var dialog = $('#theme-manager');
    var tabs = $('#theme-manager-tabs');
    var root = $('#transition-stage');
    var slides = root.find('.transition-slide');

    var length = slides.length;

    var currentPage;
    var currentSlide;
    var nextSlide;
    var prevSlide;

    var isActiveTab = false;
    var isActiveDialog = false;
    var loopTimer;

    function loseSlide() {
        currentSlide.removeClass('slide-current');
        nextSlide.removeClass('slide-next');
        prevSlide.removeClass('slide-prev');
    }
    function findSlide(page) {
        currentSlide = $(slides[page]).addClass('slide-current');
        nextSlide = $(slides[(page + 1) % length]).addClass('slide-next');
        prevSlide = $(slides[(page + length - 1) % length]).addClass('slide-prev');
    }

    function next() {
        currentPage = (currentPage + 1) % length;
        loseSlide();
        findSlide(currentPage);
    }
    function prev() {
        currentPage = (currentPage + length - 1) % length;
        loseSlide();
        findSlide(currentPage);
    }

    function change(key) {
        root.attr('data-transition', key);
    }

    function init() {
        currentPage = 0;
        findSlide(currentPage);
    }

    function checkLoop() {
        clearInterval(loopTimer);
        if (isActiveDialog && isActiveTab) {
            loopTimer = setInterval(next, 1500);
        }
    }

    tabs.find('a').on('shown', function (e) {
        var target = $(e.target);
        isActiveTab = target.attr('href') === '#transition-panel';
        checkLoop();
    });
    dialog.on('shown', function () {
        isActiveDialog = true;
        checkLoop();
    });
    dialog.on('hide', function () {
        isActiveDialog = true;
        checkLoop();
    });

    init();

    return {
        change: change
    };
});