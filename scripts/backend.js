define(['data'], function (data) {
    return {
        init: function () {
            // console.log('init backend');
        },
        import: function () {
            var dataString = localStorage.getItem('draft2');
            // console.log('import', dataString);
            if (dataString) {
                var dataJSON = JSON.parse(dataString);
                data.fromJSON(dataJSON);
                // console.log('load from localStorage');
            }
            else {
                var page1 = data.get(1);
                var page2 = data.add(2);
                page1.setLayout('title');
                // page1.getItem('title').setValue('Title Here');
                // page1.getItem('content').setValue('Content Here');
                // page2.getItem('title').setValue('Title2 Here');
                // page2.getItem('content').setValue('Content2 Here');
                // console.log('load by default');
            }
        },
        export: function () {
            // console.log('export');
        },
        clear: function () {
            localStorage.removeItem('draft2');
        },
        mark: function () {
            var dataJSON = data.toJSON();
            localStorage.setItem('draft2', JSON.stringify(dataJSON));
        }
    }
});