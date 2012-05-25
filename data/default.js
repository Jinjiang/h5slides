var defaultData = {
    "theme": "blank",
    "slides": [
        {
            "layout": "title",
            "content": {
                "title": "幻灯片标题",
                "content": "你的名字"
            }
        },
        {
            "layout": "normal",
            "content": {
                "title": "正文标题",
                "content": "正文内容\n是可以多行显示的"
            }
        },
        {
            "layout": "subtitle",
            "content": {
                "title": "THE END",
                "content": "谢谢大家"
            }
        }
    ]
};

var defaultData1 = {
    "theme": "blank",
    "slides": [
        {
            "layout": "title",
            "content": {
                "title": "幻灯片标题",
                "content": "移动过的区块"
            },
            "position": {
                "content": {
                    "left": "180px",
                    "width": "300px"
                }
            },
            "style": {
                "title": {
                    "color": "red",
                    "font-style": "italic"
                },
                "content": {
                    "text-align": "right"
                }
            }
        },
        {
            "layout": "normal",
            "content": {
                "title": "有背景图的幻灯片",
                "content": "正文内容\n是可以多行显示的\n编辑器的功能还不够完整\n有些效果还只能通过修改原代码进行实现"
            },
            "style": {
                "title": {
                    "color": "white",
                    "background-color": "rgba(192, 192, 192, 0.8)"
                },
                "slide": {
                    "background-image": "url(http://img3.cache.netease.com/photo/0005/2012-04-20/7VH2PEHJ00DE0005.jpg)"
                }
            }
        },
        {
            "layout": "subtitle",
            "content": {
                "title": "THE END",
                "content": "谢谢大家"
            }
        }
    ]
};

var defaultData2 = {
    "format": "hs_2_0",

    "design": "design_blank",
    "transition": "transition_horizontal",

    "slides": [
        {
            "layout": "layout_title",
            "transition": "",

            "items": {

                "title": {

                    "value": "正文标题",
                    "type": "text",

                    "position": {
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "style": {
                        "color": "blue"
                    }
                },

                "content": {

                    "value": "你的名字",
                    "type": "text",

                    "position": {
                    },
                    "style": {
                    }
                },

                "extra_RANDOM_ID_1": {

                    "value": "http://www.baidu.com/favicon.ico",
                    "type": "img",
                    "config": {
                        "alt": "图片描述"
                    },

                    "position": {
                        "left": "400px",
                        "top": "100px"
                    },

                }

            }
        }
    ]

};



