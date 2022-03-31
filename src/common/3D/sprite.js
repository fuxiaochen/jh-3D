import * as THREE from 'three/build/three.module'

// 生成一个雪碧图
export const initSprite = (url,pos) => {
	let img = url ? ur :'/static/img/sprite.png'
	let texture = new THREE.TextureLoader().load( img );
	let material = new THREE.SpriteMaterial({map:texture,transparent:true});
	let mesh = new THREE.Sprite(material);
	mesh.scale.set(1,1,1);
	mesh.position.set(pos.x,pos.y+30,pos.z)
	mesh.name = 'sprite-line';
	return mesh;
}

export function createSprite(type){
	let url = '';
	switch (type) {
		case 'start':
			url = '/static/img/start.png';
			break;
		case 'pass':
			url = '/static/img/pass1.png';
			break;
		case 'end':
			url = '/static/img/end.png';
			break;
		default:
			url = '/static/img/end.png';
			break;
	}

	let texture = new THREE.TextureLoader().load( url );
	let material = new THREE.SpriteMaterial({map:texture});
	let mesh = new THREE.Sprite(material);
	/*4、放大图片，每个精灵有自己的大小，默认情况下都是很小的，如果你不放大，基本是看不到的*/
	mesh.scale.set(15,15,1);
	return mesh;
}

export function createScatter(r, init, ring,uniform) {
	uniform = {
		u_color: {value: new THREE.Color("#c51a1b")},
		u_r: {value: init},
		u_ring: {
			value: ring,
		},
	};
	uniform.name = 'my-uniform';

	let vs = `
		varying vec3 vPosition;
		void main(){
			vPosition=position;
			gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}`;

	let fs = `
		varying vec3 vPosition;
		uniform vec3 u_color;
		uniform float u_r;
		uniform float u_ring;

		void main(){
			float pct=distance(vec2(vPosition.x,vPosition.y),vec2(0.0));
			if(pct>u_r || pct<(u_r-u_ring)){
				gl_FragColor = vec4(1.0,0.0,0.0,0);
			}else{
				float dis=(pct-(u_r-u_ring))/(u_r-u_ring);
				gl_FragColor = vec4(u_color,dis);
			}
		}
	`;
	const geometry = new THREE.CircleGeometry(r, 120);
	let material = new THREE.ShaderMaterial({
		vertexShader: vs,
		fragmentShader: fs,
		side: THREE.DoubleSide,
		uniforms: uniform,
		transparent: true,
		depthWrite: false,
	});

	return new THREE.Mesh(geometry, material);
}


