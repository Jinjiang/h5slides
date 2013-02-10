define(function () {
    var storage = window.localStorage;

    function getTimestamp() {
        var date = new Date;
        return date.valueOf().toString();
    }

    function readData() {
        var data;
        var dataStr = storage.getItem('h5slides-data');
        if (dataStr) {
            data = JSON.parse(dataStr);
        }
        console.log('read');
        return data;
    }
    function saveData(data) {
        storage.setItem('h5slides-data', JSON.stringify(data));
        console.log('saved', (new Date).valueOf());
    }

    function readMedia(mid) {
        var key = 'h5slides-media-' + mid;
        return storage.getItem(key);
    }
    function removeMedia(mid) {
        var key = 'h5slides-media-' + mid;
        var list = getMediaList();
        var index = list.indexOf(mid);
        if (index >= 0) {
            storage.removeItem(key);
            list.splice(index, 1);
            storage.setItem('h5slides-medialist', JSON.stringify(list));
        }
    }
    function saveMedia(media) {
        var mid = getTimestamp();
        var key = 'h5slides-media-' + mid;
        var list = getMediaList();
        list.push(mid);
        storage.setItem(key, media);
        storage.setItem('h5slides-medialist', JSON.stringify(list));
        return mid;
    }
    function getMediaList() {
        var list;
        var listStr = storage.getItem('h5slides-medialist');
        if (listStr) {
            list = JSON.parse(listStr);
        }
        else {
            list = [];
        }
        return list;
    }

    return {
        readData: readData,
        saveData: saveData,
        readMedia: readMedia,
        saveMedia: saveMedia,
        removeMedia: removeMedia,
        getMediaList: getMediaList
    };
});