define(['data/slide', 'data/event'], function (Slide, evt) {
    var data = {};

    var currentTheme = '';
    var currentTitle = '';
    var slideList = [];

    slideList.push(new Slide);

    data.getTitle = function () {
        return currentTitle;
    };
    data.setTitle = function (title) {
        title = title || '';
        currentTitle = title.toString();
        evt.change();
    };

    data.getTheme = function () {
        return currentTheme || 'blank';
    };
    data.setTheme = function (theme) {
        theme = theme || '';
        currentTheme = theme.toString();
        evt.change();
    };

    data.add = function (page) {
        var slide = new Slide();
        var index = page - 1;
        slideList.splice(index + 1, 0, slide);
        evt.change();
        return slide;
    };
    data.del = function (page) {
        var index = page - 1;
        slideList.splice(index, 1);
        evt.change();
    };
    data.set = function (page, slide) {
        var index = page - 1;
        slideList[index] = slide;
        evt.change();
    };
    data.get = function (page) {
        var index = page - 1;
        return slideList[index];
    };

    data.getLength = function () {
        return slideList.length;
    };
    data.getMenu = function () {
        var length = data.getLength();
        var result = [];
        for (var i = 1; i <= length; i++) {
            var slide = data.get(i);
            var title = slide.getTitle();
            result.push(title);
        }
        return result;
    };

    data.fromJSON = function (jsonData) {
        currentTitle = jsonData.title || '';
        currentTheme = jsonData.theme || '';
        slideList = [];
        if (jsonData.slides) {
            jsonData.slides.forEach(function (slideData) {
                var slide = new Slide(slideData);
                slideList.push(slide);
            });
        }
        if (slideList.length === 0) {
            slideList.push(new Slide());
        }
    };
    data.toJSON = function () {
        var jsonData = {
            slides: []
        };
        if (currentTitle) {
            jsonData.title = currentTitle;
        }
        if (currentTheme) {
            jsonData.theme = currentTheme;
        }
        slideList.forEach(function (slide) {
            jsonData.slides.push(slide.toJSON());
        });
        return jsonData;
    };

    data.reset = function () {
        data.fromJSON({});
        data.onreset && data.onreset();
    };

    evt.onchange = function () {
        data.onchange && data.onchange();
    };

    return data;
});