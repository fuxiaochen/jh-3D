import Node from './node';

class Task{
	constructor() {
		this.pathSet = [];
		this.startNode = null;
		this.endNode = null;

		this.openSet = [];
		this.closeSet = [];
		this.wallSet = [];
	}

	setStart(x, z){
		x = x + 200;
		z = z + 90;
		this.startNode = new Node(x, z);
	}

	setEnd(x, z){
		x = x + 200;
		z = z + 90;
		this.endNode = new Node(x, z);
	}

	setWallFromArray(array) {
		this.wallSet = [];
		for (let i = 0; i < array.length; i++) {
			this.wallSet.push(new Node(array[i].x + 200, array[i].z + 90));
		}
	}

	addWall(x, z){
		x = x + 200;
		z = z + 90;
		let node = new Node(x, z);
		if(!this.findNode(this.wallSet, node)){
			this.wallSet.push(node);
		}
	}

	reSet(){
		this.pathSet = [];
		this.startNode = null;
		this.endNode = null;

		this.openSet = [];
		this.closeSet = [];
		this.wallSet = [];
	}

	findPath(a,b){
		this.pathSet = [];
		this.closeSet = [];

		if(!this.startNode){
			console.log('未设置起点');
			return;
		}
		if(!this.endNode){
			console.log('未设置终点');
			return;
		}
		if(this.findNode(this.wallSet, this.endNode)){
			console.log('终点在墙里！');
			return;
		}

		this.openSet = [this.startNode];


		while(this.openSet.length>0){
			this.openSet.sort(this.sortNode);
			let n = this.openSet[0];

			this.removeNode(this.openSet, n);
			this.addNode(this.closeSet, n);

			if(n.equals(this.endNode)){
				//找到终点
				let cur = n;
				while(cur.parent){
					this.pathSet.unshift(cur);
					cur = cur.parent;
				}

				this.pathSet.map(item => {
					item.x = (item.x -200);
					item.z = (item.z -90);
				})
				return this.pathSet
			}

			for(let x=n.x-1; x<=n.x+1; x++){
				for(let z=n.z-1; z<=n.z+1; z++){
					let m = new Node(x,z);
					if(m.equals(n) || this.findNode(this.wallSet, m) || m.x <1 || m.z < 1 || m.x > a || m.z > b || this.findNode(this.closeSet, m)){
						continue;
					}
					if(this.findNode(this.openSet, m)){
						let newG = n.g + n.getG(m,n);
						if(newG<m.g){
							m.g = newG;
							m.f = m.g + m.h;
							m.parent = n;
						}
					}else{
						m.parent = n;
						m.initF(this.endNode);
						this.addNode(this.openSet, m);
					}

				}
			}

		}
		if(this.pathSet.length === 0){
			console.log('无法找到路径');
		}
	}

	sortNode(a, b) {
		return a.f - b.f;
	}

	removeNode(set, node){
		for(let i=0; i<set.length; i++){
			if(set[i].x === node.x && set[i].z === node.z){
				let n = set[i];
				set.splice(i,1);
				return n;
			}
		}
	}

	addNode(set, node){
		set.push(node);
	}

	findNode(set, node){
		for(let i=0; i<set.length; i++){
			if(set[i].x === node.x && set[i].z === node.z){
				return true;
			}
		}
		return false;
	}
}

export default Task;
