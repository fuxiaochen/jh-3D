import * as THREE from 'three/build/three.module'
const TWEEN = require('@tweenjs/tween.js')

function generateSprite() {
	//创建canvas并设置大小
	let canvas = document.createElement('canvas');
	canvas.width = 3;
	canvas.height = 3;

	//得到2d，canvas
	let context = canvas.getContext('2d');
	//渐变方式
	let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

	gradient.addColorStop(0, 'rgb(247,70,5)');
	// gradient.addColorStop( 0.6, 'rgba(255,171,135,.5)' );
	// gradient.addColorStop( 0.8, 'rgba(241,120,82,1)' );
	gradient.addColorStop(1, 'rgba(0,0,0,1)');
	//填充方式
	context.fillStyle = gradient;
	//填充矩形
	context.fillRect(0, 0, canvas.width, canvas.height);
	return canvas;
}

function initParticle(particle1, delay1) {
	//粒子
	let particle = this instanceof THREE.Sprite ? this : particle1;
	let delay = delay1 !== undefined ? delay1 : 0;
	//粒子大小以及位置
	particle.position.set(0, 0, 0);
	particle.scale.x = particle.scale.y = Math.random() * + 4;
	//下面是一系列的动画
	let xx = Math.random() * 100 - 50;
	let yy = -Math.cos((Math.PI / 400) * xx) * 120;
	//位移
	new TWEEN.Tween(particle.position)
		.delay(delay)
		.to({x: xx, y: yy, z: Math.random() * -100 + 50}, 6000)
		.start();
	//理解为存活时间    x加一个判断
	if (Math.abs(xx) > 150) {
		new TWEEN.Tween(particle)
			.delay(delay)
			.to({}, 0)
			.onComplete(initParticle)
			.start();
	} else {
		new TWEEN.Tween(particle)
			.delay(delay)
			.to({}, 2000)
			.onComplete(initParticle)
			.start();
	}
	//大小
	new TWEEN.Tween(particle.scale)
		.delay(delay)
		.to({x: 0.01, y: 0.01}, 2000)
		.start();
}

export function addFire(pos,scale) {
	let krq = new THREE.Object3D();
	let particle;
	let material = new THREE.SpriteMaterial({
		//以canvas作为纹理
		map: new THREE.CanvasTexture(generateSprite()),
		//混合度 加法混合
		blending: THREE.AdditiveBlending
	});

	//循环1000  添加粒子
	for (let i = 0; i < 300; i++) {
		particle = new THREE.Sprite(material);
		initParticle(particle, i * 10);
		krq.add(particle);
	}

	if(pos){
		krq.position.x = pos.x ;
		krq.position.y = pos.y ;
		krq.position.z = pos.z ;
	}

	if(scale){
		krq.scale.x = scale.x
		krq.scale.y = scale.y
		krq.scale.z = scale.z
	}

	return krq
}
