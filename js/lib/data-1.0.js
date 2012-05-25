/** Data HS1 Interface */




function DataHS1() {
    this.page = 1;
    this.title = '';
    this.theme = '';
    this.slides = [];
    this.format = 'hs_1_0';
}




(function () {
    var stat = {};

    stat.getLength = function () {

        return this.slides.length;
    };

    stat.getMenu = function () {
        var result = [];
        $.each(this.slides, function (index, slideData) {
            result.push(slideData.content.title || '');
        })
        return result;
    };

    $.extend(DataHS1.prototype, stat);
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

    $.extend(DataHS1.prototype, list);
})();




(function () {
    var slide = {};

    slide.setContent = function (page, key, value) {
        var index = page - 1;
        var slideData = this.slides[index];
        var oldValue;
        var that = this;

        slideData.content[key] = value;
        this.saveDraft();
    };

    slide.setPicture = function (file, handler) {
        var filename;
        var extname = {
                'image/jpeg': 'jpg',
                'image/png': 'png',
                'image/gif': 'gif'
            }[file.type] || 'dat';

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

        filename = getTimestamp() + '.' + extname;

        this.writeFile(filename, file, handler);
    }

    slide.setStyle = function (page, id, style) {
        var key = style.key;
        var value = style.value;
        var type = style.type;
        var oldValue;

        var index = page - 1;
        var slideData = this.slides[index];

        id = id || 'slide';
        type = type || 'style';

        if (!slideData[type]) {
            slideData[type] = {};
        }
        if (!slideData[type][id]) {
            slideData[type][id] = {};
        }
        slideData[type][id][key] = value;

        this.saveDraft();
    };

    slide.setLayout = function (page, layout) {
        var index = page - 1;
        var slideData = this.slides[index];
        slideData.layout = layout;
        this.saveDraft();
    };

    $.extend(DataHS1.prototype, slide);
})();




(function () {
    var io = {};
    var f = {};

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

    io.searchLocal = function (keywords) {
        // TODO
    }

    $.extend(DataHS1.prototype, io);

    f.readFile = function (url, handler) {
        window.webkitResolveLocalFileSystemURL(url,
                function(fileEntry) {
            fileEntry.file(function(file) {
                if (handler) {
                    handler(file);
                }
            });
        });
    };

    f.writeFile = function (filename, file, handler) {
        var that = this;
        that.fileSystem.root.getFile(filename,
                {create: true, exclusive: true},
                function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                var url = fileEntry.toURL();

                fileWriter.write(file);

                if (handler) {
                    setTimeout(function () {
                        handler(url);
                    }, 13);
                }
            });
        });
    };

    f.delFile = function (url, handler) {
        window.webkitResolveLocalFileSystemURL(url,
                function(fileEntry) {
            fileEntry.remove(function () {
                if (handler) {
                    handler();
                }
            });
        });
    };

    f.readFileData = function (file, handler) {
        var reader = new FileReader;
        reader.onload = function (event) {
            result = event.target.result;
            if (handler) {
                handler(result);
            }
        };
        reader.readAsDataURL(file);
    };

    if (window.webkitRequestFileSystem) {
        window.webkitRequestFileSystem(
                window.TEMPORARY,
                1024 * 1024, function (fs) {
            f.fileSystem = fs;
            $.extend(DataHS1.prototype, f);
            DataHS1.completed = true;
        });
    }
})();




(function () {
    var src = {};
    var draftName = 'ppt:draft';

    src.openDraft = function () {

        return this.getLocal(draftName);
    };

    src.saveDraft = function () {
        var data = {
            theme: this.theme,
            slides: this.slides
        };
        this.setLocal(draftName, data);
    };

    src.delDraft = function () {

        this.setLocal(draftName, '');
    };

    $.extend(DataHS1.prototype, src);
})();




