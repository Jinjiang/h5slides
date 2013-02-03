define(['toolbar/elements'], function (root) {
    return {
        setTextBtns: function (enabled) {
            if (enabled) {
                // root.familyBtn.removeClass('disabled');
                root.sizeBtn.removeClass('disabled');
                root.colorBtn.removeClass('disabled');
                // ...
            }
            else {
                // root.familyBtn.addClass('disabled');
                root.sizeBtn.addClass('disabled');
                root.colorBtn.addClass('disabled');
                // ...
            }
        },
        setLinkBtns: function (enabled) {},
        setSelectionBtns: function (enabled) {}
    };
});