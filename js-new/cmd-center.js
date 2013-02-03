define(['title-out'], function (title) {
    return {
        changeTitle: function (val) {
            title.updateTitle(val);
        },
        reset: function () {
            console.log('reset');
        },
        preview: function () {
            console.log('preview');
        },
        publish: function () {
            console.log('publish');
        },
        remove: function () {
            console.log('remove');
        }
    };
})