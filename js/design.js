define(function () {
    var cssLinkMap = {};

    function loadCssLink(key) {
        if (!cssLinkMap[key]) {
            cssLink = $('<link rel="stylesheet">').attr('href', 'css/design/' + key + '.css');
            $('head').append(cssLink);
            cssLinkMap[key] = cssLink;
        }
    }

    return {
        loadCssLink: loadCssLink
    };
});