define(['data'], function (data) {
    return {
        init: function () {
            // console.log('init backend');
        },
        import: function () {
            var page1 = data.get(1);
            var page2 = data.add(2);
            page1.setLayout('title');
            page1.getItem('title').setValue('Title Here');
            page1.getItem('content').setValue('Content Here');
            page2.getItem('title').setValue('Title2 Here');
            page2.getItem('content').setValue('Content2 Here');
        },
        export: function () {
            // console.log('export');
        }
    }
});