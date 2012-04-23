/**
    @fileOverview
    input class
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    幻灯片文本编辑区域的构造器
    @constructor
 */
function InputLayer() {
    var root = $('#layer-for-input');
    var input = $('#layer-for-input-textarea');

    var currentTarget;
    var lastMouseDownTarget;
    var isShown = false;
    var that = this;

    function changeValue(value) {
        value = value || '';
        input.val(value);
    }

    function changeBox(target, justMove) {
        if (!justMove) {
            if (currentTarget) {
                currentTarget.css('visibility', 'visible');
            }
            currentTarget = target;
            currentTarget.css('visibility', 'hidden');
        }

        input.css({
            left: target.css('left'),
            top: target.css('top'),
            width: target.css('width'),
            height: target.css('height'),
            fontSize: target.css('fontSize'),
            fontFamily: target.css('fontFamily'),
            padding: target.css('padding'),
            margin: target.css('margin'),
            textAlign: target.css('textAlign'),
            fontWeight: target.css('fontWeight')
        });
    }

    function blurFileInput(event) {
        var target = event.target;
        lastMouseDownTarget = target;
    }

    input.bind('input', function () {
        that.notify(currentTarget.attr('id'), $(this).val());
    }).bind('blur', function (event) {
        // var target = lastMouseDownTarget;
        // var layerRoot = $('#layer-container')[0];

        // if ($.contains(layerRoot, target)) {
        //     this.focus();
        //     return;
        // }
        that.notify('blur');
    });

    $('body').bind('mousedown', blurFileInput);
    
    this.init = function (value, target) {
        changeValue(value);
        changeBox(target);
        root.show();
        input.focus();
    };
    this.setValue = function (value) {
        changeValue(value);
    };
    this.adjust = function () {
        changeBox(currentTarget, true);
    };
    this.show = function () {
        root.show();
        isShown = true;
    };
    this.hide = function () {
        root.hide();
        isShown = false;
        if (currentTarget) {
            currentTarget.css('visibility', 'visible');
        }
    };
    this.isShown = function () {
        return isShown;
    }
}


reg(InputLayer);



