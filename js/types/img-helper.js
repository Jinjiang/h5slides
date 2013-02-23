define(function () {
    var MAX_WIDTH = 640;
    var MAX_HEIGHT = 480;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = MAX_WIDTH;
    canvas.height = MAX_HEIGHT;

    function adjustSize(sw, sh, dw, dh) {
        var x, y, w, h, scale;
        var dRatio = dh / dw;
        var sRatio = sh / sw;

        if (sw <= dw && sh <= dh) {
            scale = 1;
            w = sw;
            h = sh;
            x = parseInt((dw - sw) / 2);
            y = parseInt((dh - sh) / 2);
        }
        else {
            if (sRatio >= dRatio) {
                scale = dh / sh;
                y = 0;
                h = dh;
                w = sw * scale;
                x = parseInt((dw - w) / 2);
            }
            else {
                scale = dw / sw;
                x = 0;
                w = dw;
                h = sh * scale;
                y = parseInt((dh - h) / 2);
            }
        }

        return {
            scale: scale,
            w: w,
            h: h,
            x: x,
            y: y
        };
    }

    function loadImg(src, callback, errorCallback) {
        var img = new Image;
        var timer = setTimeout(function () {
            errorCallback && errorCallback(img);
        }, 500);

        img.src = src;
        img.onload = function () {
            clearTimeout(timer);
            callback && callback(img);
        };
        img.onerror = function () {
            errorCallback && errorCallback(img);
        };
    }

    function minify(src, callback) {
        loadImg(src,
            function (img) {
                var newSrc;

                var nw = img.naturalWidth;
                var nh = img.naturalHeight;

                var ref = adjustSize(nw, nh, MAX_WIDTH, MAX_HEIGHT);

                canvas.width = ref.w;
                canvas.height = ref.h;

                context.drawImage(img, 0, 0, ref.w, ref.h);
                newSrc = canvas.toDataURL();
                context.clearRect(0, 0, ref.w, ref.h);

                callback && callback(newSrc, ref);
            },
            function (img) {
                callback && callback('', {});
            }
        );
    }
    function embed(src, dom, placeHolder) {
        var dw;
        var dh;

        dw = dom.width();
        dh = dom.height();

        loadImg(src,
            function (img) {
                var nw = img.naturalWidth;
                var nh = img.naturalHeight;

                ref = adjustSize(nw, nh, dw, dh);

                img.style.width = ref.w + 'px';
                img.style.height = ref.h + 'px';
                img.style.padding = ref.y + 'px ' + ref.x + 'px';

                dom.empty().append(img);
            },
            function (img) {
                dom.html(placeHolder);
            }
        );
    }
    return {
        minify: minify,
        embed: embed
    };
});