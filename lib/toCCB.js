const fs = require("fs");
const toCCB = {
    temp: [],
    startTrans(selectionUrl){
        Editor.log("开始转换");
        ///加载对象
        let prefab = fs.readFileSync(Editor.url(selectionUrl, 'utf8'));
        console.log(prefab);
        let operationObj = JSON.parse(prefab);
        let length = operationObj.length;
        let isTransOk = true;
        for (let i = 0; i < length; i++) {
            const item = operationObj[i];
            const type = data["__type__"];
            switch(type) {
                case "cc.Node": {
                    break;
                }
                case "cc.Sprite": {
                    let ownId = item["node"]["__id__"];
                    break;
                }
                case "cc.Label": {
                    break;
                }
            }
            
        }
        return;
        for (let i = 0; i < length; i++) {
            let data = operationObj[i];
            //类型
            let dataType = data["__type__"];
            ///转sprite
            if(dataType == "cc.Sprite"){
                let _id = data["node"]["__id__"];
                // Editor.log("sprite - parent id is : " + _id);
                let parentObj = operationObj[_id];//this.findParentObj(operationObj,data["node"]["__id__"]);
                // Editor.log("sprite - parent: " + JSON.stringify(parentObj));
                if(parentObj){
                    data["__type__"] = multiSpriteType;
                    if(data["_materials"][0]){
                        data["_materials"][0]["__uuid__"] = multiMaterial;
                    }else{
                        data["_materials"][0] = {"__uuid__":multiMaterial};
                    }
                    data["cColor"] = parentObj["_color"];
                    data["gray"]=false;

                    Editor.log("转化Sprite : " + parentObj["_name"] + "  OK");
                }else{
                    isTransOk = false;
                    Editor.warn(parentObj["_name"]+",Label挂载的node没有找到！！！请检查！");
                }
            }
            //转label
            if(dataType == "cc.Label"){
                // let parentObj = this.findParentObj(operationObj,data["node"]["__id__"]);
                let _id = data["node"]["__id__"];
                let parentObj = operationObj[_id]
                if(parentObj){
                    ///文本是缓存模式 或者 是富文本的Label
                    if(data["_N$cacheMode"] == 1 || parentObj["_name"] == "RICHTEXT_CHILD" ){
                        data["__type__"] = multiLabelType;
                        // data["_materials"][0]["__uuid__"] = multiMaterial;
                        if(data["_materials"][0]){
                            data["_materials"][0]["__uuid__"] = multiMaterial;
                        }else{
                            data["_materials"][0] = {"__uuid__":multiMaterial};
                        }
                        data["cColor"] = parentObj["_color"];
                        data["gray"]=false;
                        Editor.log("转化Label : " + parentObj["_name"]+ "  OK");
                    }else{
                        Editor.warn(parentObj["_name"]+",挂载的Label，不是Bitmap类型，请确认是否正确。")
                    }
                }else{
                    isTransOk = false;
                    Editor.warn(parentObj["_name"]+",Label挂载的node没有找到！！！请检查！");
                }
            }
            ///richText转化
            if(dataType == "cc.RichText"){
                data["__type__"] = multiRichTextType;
                data["labMaterial"] = {"__uuid__": "c61ebc82-8975-4d37-b3f2-85a8543c0c02"};
            }
        }
        if(isTransOk){
            Editor.assetdb.saveExists(selectionUrl,JSON.stringify(operationObj));
            Editor.success("---转化完成----")
        }else{
            Editor.warn("---转化失败----")
        }
    },
}

module.exports = toCCB;
