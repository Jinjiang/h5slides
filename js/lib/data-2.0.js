/** Data HS1 Interface */




function DataHS2() {
    this.page = 1;
    this.title = '';
    this.design = '';
    this.transition = '';
    this.slides = [];
    this.format = 'hs_2_0';
}




(function () {
    var stat = {};

    stat.getLength = function () {

        return this.slides.length;
    };

    stat.getMenu = function () {
        var result = [];
        $.each(this.slides, function (index, slideData) {
            var title = '';
            if (slideData && slideData.items) {
                title = slideData.items.title || '';
                if (typeof title != 'string') {
                    title = slideData.items.title.value || '';
                }
            }
            result.push(title);
        })
        return result;
    };

    $.extend(DataHS2.prototype, stat);
})();




(function () {
    var list = {};

    list.add = function (page, slideData) {
        var index = page - 1;

        this.slides.splice(index + 1, 0, slideData);

        if (this.page >= page) {
            this.page++;
        }

        this.saveDraft();
    };

    list.del = function (page) {
        var index = page - 1;
        var slideData = this.slides[index];

        this.slides.splice(index, 1);

        if (this.page > 1 && this.page >= page) {
            this.page--;
        }

        this.saveDraft();
    };

    list.set = function (page, slideData) {
        var index = page - 1;
        this.slides[index] = slideData;
        this.saveDraft();
    };

    list.get = function (page) {
        var index = page - 1;
        return this.slides[index];
    };

    $.extend(DataHS2.prototype, list);
})();




(function () {
    var slide = {};

    slide.setLayout = function (page, layout) {
        var index = page - 1;
        var slideData = this.slides[index];

        slideData.layout = layout;
        this.saveDraft();
    };
    slide.setTransition = function (page, transition) {
        var index = page - 1;
        var slideData = this.slides[index];

        slideData.transition = transition;
        this.saveDraft();
    };

    slide.addItem = function (page, item) {

        function getTimestamp() {
            var date = new Date;
            var timestamp = date.getFullYear() +
                    ('0' + date.getMonth()).replace(/0(..)/, '$1') +
                    ('0' + date.getDate()).replace(/0(..)/, '$1') +
                    ('0' + date.getHours()).replace(/0(..)/, '$1') +
                    ('0' + date.getMinutes()).replace(/0(..)/, '$1') +
                    ('0' + date.getSeconds()).replace(/0(..)/, '$1');
            return timestamp;
        }

        var index = page - 1;
        var slideData = this.slides[index];
        var randomName = 'extra_' + getTimestamp(); // TODO: use a random id

        slideData.items[randomName] = item;
        this.saveDraft();
    };
    slide.removeItem = function (page, name) {
        var index = page - 1;
        var slideData = this.slides[index];

        delete slideData.items[name];
        this.saveDraft();
    };

    $.extend(DataHS2.prototype, slide);
})();



(function () {
    var item = {};

    item.setValue = function (page, name, value) {
        var index = page - 1;
        var slideData = this.slides[index];

        slideData.items[name].value = value;
        this.saveDraft();
    };
    item.setPosition = function (page, name, style) {
        var index = page - 1;
        var slideData = this.slides[index];

        $.each(style, function (key, value) {
            slideData.items[name].position.key = value;
        });
        this.saveDraft();
    };
    item.setStyle = function (page, name, style) {
        var index = page - 1;
        var slideData = this.slides[index];

        $.each(style, function (key, value) {
            slideData.items[name].style.key = value;
        });
        this.saveDraft();
    };

    item.setType = function (page, name, type) {
        var index = page - 1;
        var slideData = this.slides[index];

        slideData.items[name].type = type;
        this.saveDraft();
    };
    item.setConfig = function (page, name, config) {
        var index = page - 1;
        var slideData = this.slides[index];

        $.each(config, function (key, value) {
            slideData.items[name].config[key] = value;
        });
        this.saveDraft();
    };

    $.extend(DataHS2.prototype, item);
})();




(function () {
    var io = {};

    io.getLocal = function (key) {
        var value = localStorage.getItem(key);
        var object;

        if (!value) {
            return null;
        }

        try {
            return JSON.parse(value);
        }
        catch (e) {
            return null;
        }
    };

    io.setLocal = function (key, object) {
        var value;

        if (!object) {
            localStorage.removeItem(key);
        }

        try {
            value = JSON.stringify(object);
            localStorage.setItem(key, value);
        }
        catch (e) {
            localStorage.removeItem(key);
        }
    };

    $.extend(DataHS2.prototype, io);
})();




(function () {
    var src = {};
    var draftName = 'ppt:draft';

    src.openDraft = function () {
        var data = this.getLocal(draftName);

        if (!data.format || data.format < 'hs_2_0') {
            this.fromHS1(data);
        }

        return data;
    };

    src.saveDraft = function () {
        var data = {
            design: this.design,
            transition: this.transition,
            slides: this.slides,
            format: 'hs_2_0'
        };
        // this.setLocal(draftName, data);
    };

    src.delDraft = function () {

        this.setLocal(draftName, '');
    };

    $.extend(DataHS2.prototype, src);
})();




(function () {
    var converter = {};

    converter.fromHS1 = function (data) {
        data.design = data.theme;
        delete data.theme;

        if (!data.slides) {
            data.slides = {};
        }

        $.each(data.slides, function (i, slide) {

            if (slide.layout) {
                slide.layout = 'layout_' + slide.layout;
            }

            slide.items = {};

            if (slide.content) {
                $.each(slide.content, function (name, value) {
                    if (!slide.items[name]) {
                        slide.items[name] = {type: 'text'};
                    }
                    slide.items[name].value = value;
                });
                delete slide.content;
            }

            if (slide.position) {
                $.each(slide.position, function (name, position) {
                    if (!slide.items[name]) {
                        slide.items[name] = {type: 'text'};
                    }
                    slide.items[name].position = position;
                });
                delete slide.position;
            }

            if (slide.style) {
                $.each(slide.style, function (name, style) {
                    if (!slide.items[name]) {
                        slide.items[name] = {type: 'text'};
                    }
                    slide.items[name].style = style;
                });
                delete slide.style;
            }
        });

        data.format = 'hs_2_0';

        return data;
    };

    $.extend(DataHS2.prototype, converter);
})();




