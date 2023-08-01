const fs = require("fs");
const plist = require("plist");
const save = require("./save");
const CCBModule = require("./CCBModule");
const PFModule = require("./PFModule");

const toCCB = {
    prefab: [],
    tempCCB: [],
    startTrans(prefabUrl){
        const prefabName = prefabUrl.split('/').pop();
        const fileName = prefabName.split('.')[0];
        Editor.log("开始转换 prefabName:", prefabName);

        this.tempCCB.length = 0;
        this.prefab.length = 0;
        ///加载对象
        let pfb = fs.readFileSync(Editor.url(prefabUrl, 'utf8'));
        this.prefab = JSON.parse(pfb);
        // 找出所有节点
        for (let i = 0,len = this.prefab.length; i < len; i++) {
            const pfbItem = this.prefab[i];
            const type = pfbItem["__type__"];
            if (type == "cc.Node") {
                this.createNode(pfbItem, i);
            } else {
                Editor.log("非cc.Node:", type);
            }
        }
        // 根节点
        const root = this.tempCCB[1];

        this.createCCBFile(root, fileName);
    },

    outputFile(file, fileName) {
        const outputPath = save.getOutput();
        const filePath = outputPath + '/' + fileName + '.ccb';

        Editor.log('filePath：', filePath);

        const ccb = plist.build(file);
        fs.writeFile(filePath, ccb, {flag: 'w'}, function (err) {
            if(err) {
                Editor.error(err);
            } else {
                Editor.log('写入成功');
            }
        });
    },

    createCCBFile(root, fileName) {
        Editor.log('createCCBFile start:', root)
        const ccbFile = this.copyTemp(CCBModule.CCBFile);
        const ccbLayer = this.copyTemp(CCBModule.CCBLayer);
        ccbFile.nodeGraph = ccbLayer;
        ccbLayer.children.push(root);
        Editor.log('createCCBFile finish');
        this.outputFile(ccbFile, fileName);
    },

    createNode(pfbNode, idx) {
        Editor.log("=== 创建节点:", pfbNode._name);
        if (this.tempCCB[idx]) {
            Editor.log("已经存在：Node ", idx);
            return;
        }
        // 父节点
        Editor.log("节点parent:", pfbNode._parent);
        const parentIdx = pfbNode._parent ? pfbNode._parent.__id__ : -1;
        Editor.log("节点parentIdx:", parentIdx);
        const pfbParent = this.prefab[parentIdx];
        Editor.log("节点parent:", pfbParent);

        // 记录节点
        const ccbNode = this.copyTemp(CCBModule.CCBNode);
        this.tempCCB[idx] = ccbNode;

        // 添加组件
        const components = pfbNode._components;
        for (let index = 0; index < components.length; index++) {
            const ele = components[index];
            const pfbCom = this.prefab[ele.__id__];
            const type = pfbCom["__type__"];
            Editor.log("add组件:", type);
            switch (type) {
                case "cc.Sprite":
                    this.addSprite(ccbNode, pfbCom);
                    break;
                case "cc.Label":
                    this.addLabel(ccbNode, pfbCom);
                    break;
                default:
                    break;
            }
        }
        Editor.log("节点属性update:");
        // 名字
        ccbNode.displayName = pfbNode._name;
        
        // 设置位置
        Editor.log("节点位置:", pfbNode._trs.array);
        const x = pfbNode._trs.array[0];
        const y = pfbNode._trs.array[1];
        this.updatePosition(ccbNode.properties, x, y, pfbParent);

        // 尺寸
        Editor.log("节点大小:", pfbNode._contentSize);
        const w = pfbNode._contentSize.width;
        const h = pfbNode._contentSize.height;
        this.updateSize(ccbNode.properties, w, h);

        // 设置锚点
        Editor.log("节点锚点:", pfbNode._anchorPoint);
        const ax = pfbNode._anchorPoint.x;
        const ay = pfbNode._anchorPoint.y;
        this.updateAnchor(ccbNode.properties, ax, ay);

        // 设置缩放
        const sx = pfbNode._trs.array[7];
        const sy = pfbNode._trs.array[8];
        this.updateScale(ccbNode.properties, sx, sy);

        // 设置父节点
        if (parentIdx >= 0) {
            const ccbParent =  this.tempCCB[parentIdx];
            if (ccbParent) {
                ccbParent.children.push(ccbNode);
            }
        }
        Editor.log("=== createNode finish:", pfbNode._name);
    },

    addSprite(ccbNode, pfbCom) {
        Editor.log("添加组件:Sprite");
        const nodeIdx = pfbCom.node.__id__;
        const pfbNode = this.prefab[nodeIdx];

        let sprite = null;
        if (pfbCom._sizeMode == 0) {
            ccbNode.baseClass = "CCSprite";
            sprite = {
                "name": "displayFrame",
                "type": "SpriteFrame",
                "value": [
                    "", // 图集
                    "", // 纹理
                ]
            };
        } else {
            ccbNode.baseClass = "CCScale9Sprite";
            sprite = {
                "name": "spriteFrame",
                "type": "SpriteFrame",
                "value": [
                    "", // 图集
                    "", // 纹理
                ]
            };
        }
        // 设置纹理
        if (pfbCom._atlas) {
            const uuid = pfbCom._atlas.__uuid__;
            const url = Editor.assetdb.uuidToUrl(uuid);
            Editor.log('Atlas url:', url);
            let arr = url.split("/");
            arr = arr.splice(4);
            arr.unshift('..', '..');
            sprite.value[0] = arr.join('/');
        }
        if (pfbCom._spriteFrame) {
            const uuid = pfbCom._spriteFrame.__uuid__;
            const url = Editor.assetdb.uuidToUrl(uuid);
            Editor.log('SpriteFrame url:', url);
            let arr = [];
            if (pfbCom._atlas) {
                arr = url.split("/");
                arr = arr.splice(arr.length - 1, 1);
            } else {
                arr = url.split("/");
                arr = arr.splice(5, arr.length - 6);
            }
            sprite.value[1] = arr.join('/');
        }
        ccbNode.properties.push(sprite);

        if (pfbCom._sizeMode == 0) {
            Editor.log('add sprite finish');
            return;
        }
        // 优先size
        const preSize = {
            "name": "preferredSize",
            "type": "Size",
            "value": [
                pfbNode._contentSize.width,
                pfbNode._contentSize.height,
                0
            ]
        };
        ccbNode.properties.push(preSize);
        // 透明度
        const opa = {
            "name": "opacity",
            "type": "Byte",
            "value": pfbNode._opacity
        }
        // 颜色
        ccbNode.properties.push(opa);
        const color = {
            "name": "color",
            "type": "Color3",
            "value": [
                pfbNode._color.r,
                pfbNode._color.g,
                pfbNode._color.b,
            ]
        }
        ccbNode.properties.push(color);
        // 九宫图配置
        const sfuuid = pfbCom._spriteFrame;
        const info = Editor.assetdb.assetInfoByUuid(sfuuid);
        Editor.log("Sprite info:", info);
        const insetL = {
            "name": "insetLeft",
            "type": "Float",
            "value": 0
        }
        ccbNode.properties.push(insetL);
        const insetT = {
            "name": "insetTop",
            "type": "Float",
            "value": 0
        }
        ccbNode.properties.push(insetT);
        const insetR = {
            "name": "insetRight",
            "type": "Float",
            "value": 0
        }
        ccbNode.properties.push(insetR);
        const insetB = {
            "name": "insetBottom",
            "type": "Float",
            "value": 0
        }
        ccbNode.properties.push(insetB);
        Editor.log('add sprite9 finish');
    },

    addLabel(ccbNode, pfbCom) {
        Editor.log("添加组件:Label");
        ccbNode.baseClass = "CCLabelTTF";
        const label = [
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
        ];
        label[1].value[0] = pfbCom['_fontSize'];
        label[5].value = pfbCom['_string'];

        ccbNode.properties.push(...label);
        Editor.log('add label finish')
    },

    copyTemp(data) {
        return JSON.parse(JSON.stringify(data));
    },

    getProp(properties, propName) {
        for (let idx = 0; idx < properties.length; idx++) {
            let prop = properties[idx];
            if (prop.name == propName) {
                return prop;
            }
        }
        return null;
    },

    updatePosition(properties, x, y, pfbParent) {
        const prop = this.getProp(properties, 'position');
        if (prop) {
            if (pfbParent) {
                const parentW = pfbParent._contentSize.width;
                const parentH = pfbParent._contentSize.height;

                const parentAX = pfbParent._anchorPoint.x;
                const parentAY = pfbParent._anchorPoint.y;

                prop.value[0] = x + parentW * parentAX;
                prop.value[1] = y + parentH * parentAY;
            } else {
                prop.value[0] = x;
                prop.value[1] = y;
            }
        }
    },
    updateSize(properties, w, h) {
        const prop = this.getProp(properties, 'contentSize');
        if (prop) {
            prop.value[0] = w;
            prop.value[1] = h;
        }
    },
    updateAnchor(properties, ax, ay) {
        const prop = this.getProp(properties, 'anchorPoint');
        if (prop) {
            prop.value[0] = ax;
            prop.value[1] = ay;
        }
    },
    updateScale(properties, sx, sy) {
        const prop = this.getProp(properties, 'scale');
        if (prop) {
            prop.value[0] = sx;
            prop.value[1] = sy;
        }
    },
}

module.exports = toCCB;
