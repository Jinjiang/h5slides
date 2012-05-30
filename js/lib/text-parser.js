/** Text Parser */




var TextParser = {};


/**
    & < > -> &...;
 */
TextParser.txt2Html = function (txt) {
    txt = txt.toString();
    txt = txt.replace(/\&/ig, '&amp;').
            replace(/\</ig, '&lt;').
            replace(/\>/ig, '&gt;').
            replace(/ /ig, '&nbsp;').
            replace(/\n/ig, '<br />').
            replace(/\t/ig, '&nbsp;&nbsp;&nbsp;&nbsp;');
    txt = TextParser.txt2Link(txt);
    return txt;
}

/**
    \n -> <br />
    \n\n -> <p>
 */
TextParser.txt2P = function (txt) {
    txt = txt.toString();
    var list = txt.split('\n');
    $.each(list, function (index, line) {
        list[index] = TextParser.txt2Html(line);
    });
    return list.join('<br />');
}

/**
    ul > li > ul > li ...
 */
TextParser.txt2Ul = function (txt) {
    txt = txt.toString();
    var list = txt.split('\n');
    $.each(list, function (index, line) {
        list[index] = TextParser.txt2Html(line);
    });
    return '<ul><li>' + list.join('</li><li>') + '</li></ul>';
}

/**
    ol > li > ol > li ...
 */
TextParser.txt2Ol = function (txt) {
    txt = txt.toString();
    var list = txt.split('\n');
    $.each(list, function (index, line) {
        list[index] = TextParser.txt2Html(line);
    });
    return '<ol><li>' + list.join('</li><li>') + '</li></ol>';
}

/**
    <pre>
 */
TextParser.txt2Code = function (txt) {
    txt = txt.toString();
    var list = txt.split('\n');
    $.each(list, function (index, line) {
        list[index] = TextParser.txt2Html(line);
    });
    return '<pre>' + list.join('<br />') + '</pre>';
}

/**
    convert http/https/email address to link
 */
TextParser.txt2Link = function (txt) {
    txt = txt.toString();
    return txt.replace(/([a-z]+:\/\/[^\s]*)/ig, '<a href="$1" target="_blank">$1</a>');
}

