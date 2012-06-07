define(function () {
    return function (jsonData) {
        var currentValue;
        var currentType;
        var currentStyle = {};
        var currentPosition = {};
        var currentConfig = {};

        this.getValue = function () {
            return currentValue || '';
        };
        this.setValue = function (value) {
            currentValue = (value || '').toString();
        };

        this.getType = function () {
            return currentType || '';
        };
        this.setType = function (type) {
            currentType = (type || '').toString();
        };
        this.hasType = function () {
            return !!currentType;
        };
        this.clearType = function () {
            currentType = '';
        };

        function cloneMap(map) {
            var newMap = {}
            for (var i in map) {
                var value = map[i];
                if (value) {
                    newMap[i] = value;
                }
            }
            return newMap;
        }
        function updateMap(map, newMap) {
            for (var i in newMap) {
                var value = newMap[i];
                if (value) {
                    map[i] = value;
                }
                else {
                    delete map[i];
                }
            }
        }

        this.getPosition = function () {
            return cloneMap(currentPosition);
        };
        this.setPosition = function (position) {
            updateMap(currentPosition, position);
        };
        this.resetPosition = function () {
            currentPosition = {};
        };

        this.getStyle = function () {
            return cloneMap(currentStyle);
        };
        this.setStyle = function (style) {
            updateMap(currentStyle, style);
        };
        this.resetStyle = function () {
            currentStyle = {};
        };

        this.getConfig = function () {
            return cloneMap(currentConfig);
        };
        this.setConfig = function (config) {
            updateMap(currentConfig, config);
        };
        this.resetConfig = function () {
            currentStyle = {};
        };

        this.isEmpty = function () {
            if (currentType || currentValue) {
                return false;
            }
            for (var i in currentPosition) {
                return false;
            }
            for (var i in currentStyle) {
                return false;
            }
            for (var i in currentConfig) {
                return false;
            }
            return true;
        };

        this.fromJSON = function (jsonData) {
            currentValue;
            currentType;
            currentStyle = {};
            currentPosition = {};
            currentConfig = {};

            if (jsonData) {
                currentValue = (jsonData.value || '').toString;
                currentType = (jsonData.type || '').toString;
                if (jsonData.position) {
                    this.setPosition(jsonData.position);
                }
                if (jsonData.style) {
                    this.setStyle(jsonData.style);
                }
                if (jsonData.config) {
                    this.setConfig(jsonData.config);
                }
            }
        };
        this.toJSON = function () {
            var jsonData = {};
            if (currentValue) {
                jsonData.value = currentValue;
            }
            if (currentType) {
                jsonData.type = currentType;
            }
            for (var i in currentPosition) {
                var value = currentPosition[i];
                if (value) {
                    if (!jsonData.position) {
                        jsonData.position = {};
                    }
                    jsonData.position[i] = value;
                }
            }
            for (var i in currentStyle) {
                var value = currentStyle[i];
                if (value) {
                    if (!jsonData.style) {
                        jsonData.style = {};
                    }
                    jsonData.style[i] = value;
                }
            }
            for (var i in currentConfig) {
                var value = currentConfig[i];
                if (value) {
                    if (!jsonData.config) {
                        jsonData.config = {};
                    }
                    jsonData.config[i] = value;
                }
            }
            return jsonData;
        };
    }
})