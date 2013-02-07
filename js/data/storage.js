define(function () {
    var data = {
        design: 'default',
        transition: '',
        title: '',
        slides: [
            {
                layout: 'title',
                items: {
                    title: {
                        content: 'Title Here'
                    },
                    content: {
                        content: 'your name'
                    }
                }
            },
            {
                layout: 'normal',
                items: {
                    title: {
                        content: 'menu here'
                    },
                    content: {
                        content: 'main content here'
                    }
                }
            }
        ]
    };

    return data;
});