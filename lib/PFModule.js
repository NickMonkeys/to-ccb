/**
 * 1.预制件是一个数组数据
 * 2.数据中__id__代表数组的idx
 * 3.数组开头是【PFStart】
 * 4.数组下标1是根节点【PFNode】
 * 5.之后是其子节点的【PFNode】
 * 6.之后是其子节点的组件【PFComp<?>】
 * 7.之后是其子节点的【PFNodeExtra】
 * 8.然后是其他子节点的信息（5～7）
 * 9.再之后是根节点其他信息（6～7）
 */

const PFStart = {
	"__type__": "cc.Prefab",
	"_name": "",
	"_objFlags": 0,
	"_native": "",
	"data": {
		"__id__": 1
	},
	"optimizationPolicy": 0,
	"asyncLoadAssets": false,
	"readonly": false
}

const PFNodeExtra = {
	"__type__": "cc.PrefabInfo",
	"root": {
		"__id__": 1 // 所属预制件根节点idx
	},
	"asset": {
		"__uuid__": "afa6397d-9e0c-4d5e-86d5-6aaa8ce91e4a" // 所属预制件的资源uuid
	},
	"fileId": "10dbeVGFFCHKcx8WzXoHRm", // 1.根节点为""；2.子节点值各不相同
	"sync": false
}

const PFNode = {
	"__type__": "cc.Node",
	"_name": "nickSub1",
	"_objFlags": 0,
	"_parent": { // 根节点是null
		"__id__": 1
	},
	"_children": [
		{
			"__id__": 3
		}
	],
	"_active": true,
	"_components": [],
	"_prefab": {
		"__id__": 5
	},
	"_opacity": 255,
	"_color": {
		"__type__": "cc.Color",
		"r": 255,
		"g": 255,
		"b": 255,
		"a": 255
	},
	"_contentSize": {
		"__type__": "cc.Size",
		"width": 0,
		"height": 0
	},
	"_anchorPoint": {
		"__type__": "cc.Vec2",
		"x": 0.5,
		"y": 0.5
	},
	"_trs": {
		"__type__": "TypedArray",
		"ctor": "Float64Array",
		"array": [
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			1,
			1,
			1
		]
	},
	"_eulerAngles": {
		"__type__": "cc.Vec3",
		"x": 0,
		"y": 0,
		"z": 0
	},
	"_skewX": 0,
	"_skewY": 0,
	"_is3DNode": false,
	"_groupIndex": 0,
	"groupIndex": 0,
	"_id": ""
}

const PFSprite = {
	"__type__": "cc.Sprite",
	"_name": "",
	"_objFlags": 0,
	"node": {
		"__id__": 1
	},
	"_enabled": true,
	"_materials": [
		{
			"__uuid__": "eca5d2f2-8ef6-41c2-bbe6-f9c79d09c432"
		}
	],
	"_srcBlendFactor": 770,
	"_dstBlendFactor": 771,
	"_spriteFrame": {
		"__uuid__": "805bede6-3155-42eb-9674-8ef233acebcc"
	},
	"_type": 1,
	"_sizeMode": 1,
	"_fillType": 0,
	"_fillCenter": {
		"__type__": "cc.Vec2",
		"x": 0,
		"y": 0
	},
	"_fillStart": 0,
	"_fillRange": 0,
	"_isTrimmedMode": true,
	"_atlas": null,
	"_id": ""
}

const PFLabel = {
	"__type__": "cc.Label",
	"_name": "",
	"_objFlags": 0,
	"node": {
		"__id__": 5
	},
	"_enabled": true,
	"_materials": [
		{
			"__uuid__": "eca5d2f2-8ef6-41c2-bbe6-f9c79d09c432"
		}
	],
	"_srcBlendFactor": 770,
	"_dstBlendFactor": 771,
	"_string": "11",
	"_N$string": "11",
	"_fontSize": 40,
	"_lineHeight": 40,
	"_enableWrapText": true,
	"_N$file": null,
	"_isSystemFontUsed": true,
	"_spacingX": 0,
	"_batchAsBitmap": false,
	"_styleFlags": 0,
	"_underlineHeight": 0,
	"_N$horizontalAlign": 0,
	"_N$verticalAlign": 0,
	"_N$fontFamily": "Arial",
	"_N$overflow": 0,
	"_N$cacheMode": 0,
	"_id": ""
}

const PFButton = {
	"__type__": "cc.Button",
	"_name": "",
	"_objFlags": 0,
	"node": {
		"__id__": 4
	},
	"_enabled": true,
	"_normalMaterial": null,
	"_grayMaterial": null,
	"duration": 0.1,
	"zoomScale": 1.2,
	"clickEvents": [
		{
			"__id__": 13
		}
	],
	"_N$interactable": true,
	"_N$enableAutoGrayEffect": false,
	"_N$transition": 2,
	"transition": 2,
	"_N$normalColor": {
		"__type__": "cc.Color",
		"r": 230,
		"g": 230,
		"b": 230,
		"a": 255
	},
	"_N$pressedColor": {
		"__type__": "cc.Color",
		"r": 200,
		"g": 200,
		"b": 200,
		"a": 255
	},
	"pressedColor": {
		"__type__": "cc.Color",
		"r": 200,
		"g": 200,
		"b": 200,
		"a": 255
	},
	"_N$hoverColor": {
		"__type__": "cc.Color",
		"r": 255,
		"g": 255,
		"b": 255,
		"a": 255
	},
	"hoverColor": {
		"__type__": "cc.Color",
		"r": 255,
		"g": 255,
		"b": 255,
		"a": 255
	},
	"_N$disabledColor": {
		"__type__": "cc.Color",
		"r": 120,
		"g": 120,
		"b": 120,
		"a": 200
	},
	"_N$normalSprite": {
		"__uuid__": "f0048c10-f03e-4c97-b9d3-3506e1d58952"
	},
	"_N$pressedSprite": {
		"__uuid__": "e9ec654c-97a2-4787-9325-e6a10375219a"
	},
	"pressedSprite": {
		"__uuid__": "e9ec654c-97a2-4787-9325-e6a10375219a"
	},
	"_N$hoverSprite": {
		"__uuid__": "f0048c10-f03e-4c97-b9d3-3506e1d58952"
	},
	"hoverSprite": {
		"__uuid__": "f0048c10-f03e-4c97-b9d3-3506e1d58952"
	},
	"_N$disabledSprite": {
		"__uuid__": "29158224-f8dd-4661-a796-1ffab537140e"
	},
	"_N$target": {
		"__id__": 5
	},
	"_id": ""
}

const PFClick = {
	"__type__": "cc.ClickEvent",
	"target": {
		"__id__": 14 // 回调函数的目标节点
	},
	"component": "", // 代码资源名字
	"_componentId": "f6c9dYYSMJEeqf4UYhXmaON", // 代码资源uuid
	"handler": "func", // 函数名
	"customEventData": "" // 自定义数据
}

module.export = {
	PFStart,
	PFNode,
	PFNodeExtra,
	PFSprite,
	PFLabel,
	PFButton,
	PFClick,
};
