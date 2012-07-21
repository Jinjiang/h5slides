define('stylesheet', {
    loadedMap: {
        folders: {},
        files: {}
    },
    /**
        参数是由“目录名/子目录名/.../文件名”组成的数组
        检查文件是否被注册
        如果未注册
            注册文件
            加载文件
     */
    load: function () {
        var nameList = Array.prototype.slice.call(arguments);

        var length = nameList.length;
        var folderList = nameList.slice(0, length - 1);
        var fileName = nameList[length - 1];

        var tempMap = this.loadedMap;
        var name = folderList.shift();

        while (name) {
            if (!tempMap.folders[name]) {
                tempMap.folders[name] = {
                    folders: {},
                    files: {}
                };
            }
            tempMap = tempMap.folders[name];
            name = folderList.shift();
        }

        if (!tempMap.files[fileName]) {
            this.append(nameList);
            tempMap.files[fileName] = true;
            return true;
        }

        return false;
    },
    append: function (nameList) {
        var path = 'css/' + nameList.join('/') + '.css';
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
    }
});