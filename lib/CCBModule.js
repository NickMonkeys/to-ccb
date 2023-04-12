/**
 * 1.ccb文件根节点是文件基础信息
 * 2.ccb中nodeGraph属性是节点树根节点
 * 3.ccb根节点是一个CCBLayer类型的节点
 * 4.ccb中节点的子节点在children数组中
 * 5.ccb中label、sprite都是节点，只是拥有特有属性
 * 6.ccb中不同类型的节点通过baseClass属性进行区别
 */

const CCBFile = {
    "centeredOrigin": false,
    "currentResolution": 0,
    "currentSequenceId": 0,
    "fileType": "CocosBuilder",
    "fileVersion": 4,
    "guides": [],
    "jsControlled": true,
    "nodeGraph": null,
    "notes": [],
    "resolutions": [ // 屏幕方案
        {
            "centeredOrigin": false,
            "ext": "iphone",
            "height": 1336,
            "name": "iPhone Landscape",
            "scale": 1,
            "width": 640
        }
    ],
    "sequences": [
        {
            "autoPlay": true,
            "callbackChannel": {
                "keyframes": [],
                "type": 10
            },
            "chainedSequenceId": -1,
            "length": 10,
            "name": "Default Timeline",
            "offset": 0,
            "position": 0,
            "resolution": 30,
            "scale": 128,
            "sequenceId": 0,
            "soundChannel": {
                "keyframes": [],
                "type": 9
            }
        }
    ],
    "stageBorder": 0
}

const CCBLayer = {
    "baseClass": "CCLayer",
    "children": [],
    "customClass": "",
    "displayName": "CCLayer",
    "memberVarAssignmentName": "",
    "memberVarAssignmentType": 0,
    "properties": [
        {
            "name": "contentSize",
            "type": "Size",
            "value": [
                100,
                100,
                1
            ]
        },
        {
            "name": "anchorPoint",
            "type": "Point",
            "value": [
                0.5,
                0.5
            ]
        },
        {
            "name": "scale",
            "type": "ScaleLock",
            "value": [
                1,
                1,
                false,
                0
            ]
        },
        {
            "name": "ignoreAnchorPointForPosition",
            "type": "Check",
            "value": true
        },
        {
            "name": "touchEnabled",
            "platform": "iOS",
            "type": "Check",
            "value": true
        },
        {
            "name": "mouseEnabled",
            "platform": "Mac",
            "type": "Check",
            "value": true
        }
    ]
}

const CCBNode =  {
    "baseClass": "CCNode",
    "children": [],
    "customClass": "",
    "displayName": "CCNode",
    "memberVarAssignmentName": "",
    "memberVarAssignmentType": 0,
    "properties": [
        {
            "name": "position",
            "type": "Position",
            "value": [
                141,
                128,
                0
            ]
        },
        {
            "name": "anchorPoint",
            "type": "Point",
            "value": [
                0,
                0
            ]
        },
        {
            "name": "scale",
            "type": "ScaleLock",
            "value": [
                1,
                1,
                false,
                0
            ]
        },
        {
            "name": "ignoreAnchorPointForPosition",
            "type": "Check",
            "value": false
        }
    ]
}

const CCBLabelNode = {
    "baseClass": "CCLabelTTF",
    "children": [],
    "customClass": "",
    "displayName": "CCLabelTTF",
    "memberVarAssignmentName": "helloLabel",
    "memberVarAssignmentType": 1,
    "properties": [
        {
            "name": "position",
            "type": "Position",
            "value": [
                50,
                65,
                4
            ]
        },
        {
            "name": "anchorPoint",
            "type": "Point",
            "value": [
                0.5,
                0.5
            ]
        },
        {
            "name": "scale",
            "type": "ScaleLock",
            "value": [
                1,
                1,
                false,
                0
            ]
        },
        {
            "name": "ignoreAnchorPointForPosition",
            "type": "Check",
            "value": false
        },
        {
            "name": "fontName",
            "type": "FontTTF",
            "value": "MarkerFelt-Thin"
        },
        {
            "name": "fontSize",
            "type": "FloatScale",
            "value": [
                48,
                1
            ]
        },
        {
            "name": "dimensions",
            "type": "Size",
            "value": [
                0,
                0,
                0
            ]
        },
        {
            "name": "horizontalAlignment",
            "type": "IntegerLabeled",
            "value": 0
        },
        {
            "name": "verticalAlignment",
            "type": "IntegerLabeled",
            "value": 0
        },
        {
            "name": "string",
            "type": "Text",
            "value": "Hello CocosBuilder"
        }
    ]
};

const CCBButton =  {
    "baseClass": "CCControlButton",
    "children": [],
    "customClass": "",
    "displayName": "CCControlButton",
    "memberVarAssignmentName": "",
    "memberVarAssignmentType": 0,
    "properties": [
        {
            "name": "position",
            "type": "Position",
            "value": [
                71,
                98,
                0
            ]
        },
        {
            "name": "anchorPoint",
            "type": "Point",
            "value": [
                0.5,
                0.5
            ]
        },
        {
            "name": "scale",
            "type": "ScaleLock",
            "value": [
                1,
                1,
                false,
                0
            ]
        },
        {
            "name": "ignoreAnchorPointForPosition",
            "type": "Check",
            "value": true
        },
        {
            "name": "ccControl",
            "type": "BlockCCControl",
            "value": [
                "",
                0,
                32
            ]
        },
        {
            "name": "enabled",
            "type": "Check",
            "value": true
        },
        {
            "name": "title|1",
            "type": "String",
            "value": "NickBtn"
        },
        {
            "name": "titleTTF|1",
            "type": "FontTTF",
            "value": "Helvetica"
        },
        {
            "name": "titleTTFSize|1",
            "type": "FloatScale",
            "value": [
                12,
                0
            ]
        },
        {
            "name": "labelAnchorPoint",
            "type": "Point",
            "value": [
                0.5,
                0.5
            ]
        },
        {
            "name": "preferredSize",
            "type": "Size",
            "value": [
                140,
                60,
                0
            ]
        },
        {
            "name": "zoomOnTouchDown",
            "type": "Check",
            "value": true
        },
        {
            "name": "backgroundSpriteFrame|1",
            "type": "SpriteFrame",
            "value": [
                "",
                "clickme.png"
            ]
        },
        {
            "name": "titleColor|1",
            "type": "Color3",
            "value": [
                255,
                255,
                255
            ]
        },
        {
            "name": "backgroundSpriteFrame|2",
            "type": "SpriteFrame",
            "value": [
                "",
                "clickme-down.png"
            ]
        },
        {
            "name": "titleColor|2",
            "type": "Color3",
            "value": [
                255,
                255,
                255
            ]
        },
        {
            "name": "backgroundSpriteFrame|3",
            "type": "SpriteFrame",
            "value": [
                "",
                "clickme-down.png"
            ]
        },
        {
            "name": "titleColor|3",
            "type": "Color3",
            "value": [
                255,
                255,
                255
            ]
        }
    ]
};

const CCBSpriteNode = {
    "baseClass": "CCSprite",
    "children": [],
    "customClass": "",
    "displayName": "clickme",
    "memberVarAssignmentName": "",
    "memberVarAssignmentType": 0,
    "properties": [
        {
            "name": "position",
            "type": "Position",
            "value": [
                202,
                -48,
                0
            ]
        },
        {
            "name": "anchorPoint",
            "type": "Point",
            "value": [
                0.5,
                0.5
            ]
        },
        {
            "name": "scale",
            "type": "ScaleLock",
            "value": [
                1,
                1,
                false,
                0
            ]
        },
        {
            "name": "ignoreAnchorPointForPosition",
            "type": "Check",
            "value": false
        },
        {
            "name": "displayFrame",
            "type": "SpriteFrame",
            "value": [
                "",
                "clickme.png"
            ]
        }
    ],
    "selected": true
}

module.exports = {
    CCBFile,
    CCBLayer,
    CCBNode,
    CCBLabelNode,
    CCBButton,
    CCBSpriteNode,
}