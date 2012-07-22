define(function () {
    function genKey() {
        return 'f_' + (new Date).valueOf();
    }
    var mod = {
        get: function (key) {
            var key = getKey(page, name);
            var val = localStorage.getItem(key);
        },
        set: function (key, file) {
            if (!key) {
                key = genKey();
            }
            var reader = new FileReader;
            reader.readAsDataURL(file);
            reader.onload = function () {
                try {
                    localStorage.setItem(key, reader.result);
                }
                catch (e) {
                    return '';
                }
            };
            return key;
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        clear: function () {
            var keyList = [];
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.match(/^f_.+/)) {
                    keyList.push(key);
                }
            }
            keyList.forEach(function (key) {
                localStorage.removeItem(key);
            });
        }
    };
    return mod;
});