import * as THREE from 'three/build/three.module'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';


/* 绘制动态线
* */

const el = document.getElementById('my-parking')
const textureLoader = new THREE.TextureLoader();
const resolution = new THREE.Vector2( el.offsetWidth,  el.offsetHeight );

function getSphereHeightPoints (v0, v3, n1, n2, p0) {
	// 夹角
	const angle = (v0.angleTo(v3) * 180) / Math.PI / 10 // 0 ~ Math.PI
	const aLen = angle * (n1 || 10)
	const hLen = angle * angle * (n2 || 120)
	p0 = p0 || new THREE.Vector3(0, 0, 0) // 默认以 坐标原点为参考对象
	// 法线向量
	const rayLine = new THREE.Ray(p0, v0.clone().add(v3.clone()).divideScalar(2))
	// 顶点坐标
	const vtop = rayLine.at(hLen / rayLine.at(1).distanceTo(p0))
	// 计算制高点
	const getLenVector = (v1, v2, len) => v1.lerp(v2, len / v1.distanceTo(v2))
	// 控制点坐标
	return [getLenVector(v0.clone(), vtop, aLen), getLenVector(v3.clone(), vtop, aLen)]
}

/*  **** **** ****   ****/
function createAnimateLine (option) {
	let curve
	if (option.kind === 'sphere') { // 由两点之间连线成贝塞尔曲线
		const sphereHeightPointsArgs = option.sphereHeightPointsArgs
		const pointList = this.getSphereHeightPoints(...sphereHeightPointsArgs) // v0,v3,n1,n2,p0
		curve = new THREE.CubicBezierCurve3(sphereHeightPointsArgs[0], pointList[0], pointList[1], sphereHeightPointsArgs[1])
	} else { // 由多个点数组构成的曲线 通常用于道路
		const l = []
		option.pointList.forEach(e => l.push(new THREE.Vector3(e[0], e[1], e[2])))
		curve = new THREE.CatmullRomCurve3(l) // 曲线路径
	}
	if (option.type === 'pipe') { // 使用管道线
		// 管道体
		const tubeGeometry = new THREE.TubeGeometry(curve, option.number || 50, option.radius || 1, option.radialSegments)
		return new THREE.Mesh(tubeGeometry, option.material)
	} else { // 使用 meshLine
		if (!MeshLine || !MeshLineMaterial) console.error('you need import MeshLine & MeshLineMaterial!')
		else {
			const geo = new THREE.Geometry()
			geo.vertices = curve.getPoints(option.number || 50)
			const meshLine = new MeshLine()
			meshLine.setGeometry(geo)
			return new THREE.Mesh(meshLine.geometry, option.material)
		}
	}
}

const pointList1 = [
	[20,5,10],
	[10,5,-9],
	[10,5,20],
	[-40,5,-40]
]
let line1;
textureLoader.load( '/static/img/sprite.png', function (texture1) {
	const material1 = new MeshLineMaterial({
		color: "green",
		map: texture1,
		useMap: true,
		lineWidth: 4,
		resolution: resolution,
		dashArray: 0.8,  // 破折号之间的长度和间距。(0 -无破折号)
		dashRatio: 0.5, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
		dashOffset: 0,
		transparent: true,
		sizeAttenuation: 1, //使线宽不变，不管距离(1个单位是屏幕上的1px)(0 -衰减，1 -不衰减)
		side: THREE.FrontSide,
		depthTest: true,
		blending: THREE.AdditiveBlending,
		near: camera.near,
		far: camera.far,
	})
	const l = []
	pointList1.forEach(e => l.push(new THREE.Vector3(e[0], e[1], e[2])))
	let curve = new THREE.CatmullRomCurve3(l) // 曲线路径
	const geo = new THREE.Geometry()
	geo.vertices = curve.getPoints( 50)
	const meshLine = new MeshLine()
	meshLine.setGeometry(geo)
	line1=new THREE.Mesh(meshLine.geometry, material1)
	scene.add(line1)
})

/** 2：绘制普通pipeLine**/

const pointList2 = [
	[-20,5,-10],
	[30,5,-15],
	[10,5,20],
	[40,5,40]
]
const texture2 = textureLoader.load("../../images/ysThree/red_line.png")
texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping; //每个都重复
texture2.repeat.set(1, 1)
const material2 = new THREE.MeshBasicMaterial({map:texture2,side:THREE.BackSide,transparent:true})
const line2 = createAnimateLine({
	// kind: 'sphere',//默认不填 为普通 ; 如为sphere,则表示球面建点
	type: 'pipe',//默认不填 为MeshLine ; 如为pipe,则表示管道线
	pointList: pointList2,
	material: material2,
	number: 100
})
scene.add(line2)

/** 1：在球面上绘制meshLine**/
const v0 =  new THREE.Vector3( -80, 10,  0 )
const v3 =  new THREE.Vector3( 80, 10,  0 )

let line3
textureLoader.load( '../../images/ysThree/green_line.png', function (texture3) {
	const material3 = new MeshLineMaterial({
		color: "green",
		map: texture3,
		useMap: true,
		lineWidth: 4,
		resolution: resolution,
		dashArray: 0.8,  // 破折号之间的长度和间距。(0 -无破折号)
		dashRatio: 0.5, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
		dashOffset: 0,
		transparent: true,
		sizeAttenuation: 1, //使线宽不变，不管距离(1个单位是屏幕上的1px)(0 -衰减，1 -不衰减)
		side: THREE.FrontSide,
		depthTest: true,
		blending: THREE.AdditiveBlending,
		near: camera.near,
		far: camera.far,
	})
	line3 = createAnimateLine({
		kind: 'sphere',//默认不填 为普通 ; 如为sphere,则表示球面建点
		// type: 'pipe',//默认不填 为MeshLine ; 如为pipe,则表示管道线
		sphereHeightPointsArgs: [v0,v3],
		material: material3
	})
	scene.add(line3)
})

/** 1：在球面上绘制pipeLine**/

const v0_1 =  new THREE.Vector3( -60, 10,  0 )
const v3_1 =  new THREE.Vector3( 60, 10,  0 )

const texture4 = textureLoader.load("../../images/ysThree/red_line.png")
texture4.wrapS = texture4.wrapT = THREE.RepeatWrapping; //每个都重复
texture4.repeat.set(1, 1)
const materia4 = new THREE.MeshBasicMaterial({map:texture4,side:THREE.BackSide,transparent:true})
const line4 = createAnimateLine({
	kind: 'sphere',//默认不填 为普通 ; 如为sphere,则表示球面建点
	type: 'pipe',//默认不填 为MeshLine ; 如为pipe,则表示管道线
	sphereHeightPointsArgs: [v0_1,v3_1],
	material: materia4,
	number: 100,
	radius: 1 // 默认
})
scene.add(line4)
