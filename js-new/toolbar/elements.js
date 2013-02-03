define(function () {
    var toolbar = $('#toolbar');

    var familyBtn = toolbar.find('[data-key="font-family"]');
    var sizeBtn = toolbar.find('[data-key="font-size"]');
    var colorBtn = toolbar.find('[data-key="font-color"]');
    var boldBtn = toolbar.find('[data-key="font-bold"]');
    var italicBtn = toolbar.find('[data-key="font-italic"]');
    var linkBtn = toolbar.find('[data-key="link"]');
    var urlLinkBtn = toolbar.find('[data-key="link-url"]');
    var slideLinkBtn = toolbar.find('[data-key="link-slide"]');
    var removeLinkBtn = toolbar.find('[data-key="link-remove"]');
    var formatPlainBtn = toolbar.find('[data-key="format-plain"]');
    var formatListBtn = toolbar.find('[data-key="format-list"]');
    var indentRightBtn = toolbar.find('[data-key="indent-right"]');
    var indentLeftBtn = toolbar.find('[data-key="indent-left"]');
    var pictureBtn = toolbar.find('[data-key="picture"]');

    var familyList = familyBtn.next('.dropdown-menu');
    var sizeList = sizeBtn.next('.dropdown-menu');
    var colorList = colorBtn.next('.dropdown-menu');

    return {
        familyBtn: familyBtn,
        sizeBtn: sizeBtn,
        colorBtn: colorBtn,
        boldBtn: boldBtn,
        italicBtn: italicBtn,
        linkBtn: linkBtn,
        urlLinkBtn: urlLinkBtn,
        slideLinkBtn: slideLinkBtn,
        removeLinkBtn: removeLinkBtn,
        formatPlainBtn: formatPlainBtn,
        formatListBtn: formatListBtn,
        indentRightBtn: indentRightBtn,
        indentLeftBtn: indentLeftBtn,
        pictureBtn: pictureBtn,
        familyList: familyList,
        sizeList: sizeList,
        colorList: colorList
    };
});