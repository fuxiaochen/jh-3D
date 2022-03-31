// 加载器
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

let gltfLoader = new GLTFLoader();
let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/static/3D/draco/gltf/');
gltfLoader.setDRACOLoader(dracoLoader);

// 3D卡片的
import {CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer'
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'

// 资源释放
import ResourceTracker from "@/common/3D/dispose";
let resMgr2 = new ResourceTracker()
let track2 = resMgr2.track.bind(resMgr2)

// a-star算法
import Task from '@/common/astar/task'
let AStar = {};
AStar.Task = Task;

// 控制旋转器
import * as THREE from 'three/build/three.module'
let OrbitControls = require('three-orbit-controls')(THREE)

// 动画库
const TWEEN = require('@tweenjs/tween.js')

export function FactoryObject() {
	this.AStar = AStar;
	this.loadModel = gltfLoader;
	this.CSS3DObject = CSS3DObject;
	this.resourceTrack = new ResourceTracker();
	this.THREE = THREE;
	this.renderer = () => {
		let _renderer;
		_renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		_renderer.autoClear = false;
		_renderer.setClearColor(0xffffff, 0);
		_renderer.setPixelRatio(window.devicePixelRatio);
		_renderer.setSize(1860, 930);
		_renderer.gammaInput = true;
		_renderer.gammaOutput = true;
		return _renderer
	};
	this.renderer2 = () => {
		let _renderer2;
		_renderer2 = new CSS3DRenderer();
		_renderer2.setSize(1860, 930);
		_renderer2.domElement.style.position = 'absolute';
		_renderer2.domElement.style.top = '0px';
		_renderer2.domElement.style.left = '0px';
		return _renderer2
	}
	this.orbitControls = (camera, renderer, renderer2) => {
		let _controls;
		_controls = new OrbitControls(camera, renderer.domElement);
		_controls = new OrbitControls(camera, renderer2.domElement);
		_controls.enableDamping = true;//是否有惯性
		_controls.minPolarAngle = 0; // radians
		_controls.maxPolarAngle = Math.PI / 2.2; // radians
		_controls.enableZoom = true;//缩放
		_controls.autoRotate = false;//自动旋转
		_controls.enablePan = true;//右键拖拽
		return _controls
	};
	this.keepMeshMaterial = (arr) => { // 存储旧的材质
		try {
			let result = []
			for (let i = 0; i < arr.length; i++) {
				let obj = {
					'name': arr[i].name,
					'material': arr[i].material
				}
				result.push(obj)
			}
			return result
		}catch (e) {
		
		}
	};
	this.restoreMeshMaterial = (arrNew, arrOld) => { // 重新贴新的材质
		try {
			for (let i = 0; i < arrNew.length; i++) {
				for (let j = 0; j < arrOld.length; j++) {
					if (arrNew[i].name === arrOld[j].name) {
						arrNew[i].material = arrOld[j].material
						break
					}
				}
			}
		}catch (e) {
		
		}
	};
	this.scaleModelPrev = (prevModel, scene) => { // 上一个模型消失
		track2(prevModel);
		let option1 = {
			scaleX: prevModel.scale.x,
			scaleY: prevModel.scale.y,
			scaleZ: prevModel.scale.z
		};
		let tween1 = new TWEEN.Tween(option1).to({
			scaleX: 0.0001,
			scaleY: 0.0001,
			scaleZ: 0.0001
		}, 500).onUpdate(function (e) {
			prevModel.scale.set(e.scaleX, e.scaleY, e.scaleZ)
		}).delay(10)
		tween1.onComplete(function () {
			prevModel.visible = false;
			scene.remove(prevModel);
			resMgr2 && resMgr2.dispose()
		})
		tween1.easing(TWEEN.Easing.Linear.None);
		tween1.start();
	};
	this.scaleModelNext = (nextModel, currentModel) => {// 载入新的模型
		let option2 = {
			scaleX: nextModel.scale.x,
			scaleY: nextModel.scale.y,
			scaleZ: nextModel.scale.z
		};
		let tween2 = new TWEEN.Tween(option2).to({
			scaleX: 1,
			scaleY: 1,
			scaleZ: 1
		}, 500).onUpdate(function (e) {
			nextModel.scale.set(e.scaleX, e.scaleY, e.scaleZ)
		}).delay(10)
		tween2.onComplete(() => {// 动画执行完毕的回调
			currentModel = nextModel
		})
		tween2.easing(TWEEN.Easing.Linear.None);// 动画形式，
		tween2.start()
	};
	this.getBlocks = (arr) => { // 获取障碍点
		let result = [];
		arr && arr.forEach(item => {
			if (item.name.includes('fang')) {
				item.geometry.computeBoundingSphere();
				let realPosition = item.geometry.boundingSphere.center;
				result.push({
					x: Math.floor(realPosition.x),
					y: 1,
					z: Math.floor(realPosition.z)
				})
			}
		})
		return result
	};
	this.controlDoor = (door, end) => {
		let option = {
			x: door.position.x,
			y: door.position.y,
			z: door.position.z,
		};
		let tween = new TWEEN.Tween(option).to({
			x: end[0],
			y: end[1],
			z: end[2],
		}, 2000).onUpdate(function (e) {
			door.position.x = e.x
			door.position.y = e.y
			door.position.z = e.z
		}).delay(10)
		tween.onComplete(function () {
		})
		tween.easing(TWEEN.Easing.Cubic.InOut);
		tween.start();
	};
	this.drawWalkerPath = (arr)=> {

	}
}
