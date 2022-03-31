class Node{
	constructor(x,z) {
		this.x = x;
		this.z = z;

		this.g = 0;
		this.h = 0;
		this.f = 0;
		this.parent = null;

	}

	initF(endNode){

		let g0 = this.getG(this, this.parent);
		this.g = this.parent.g + g0;

		//对角距离
		let dx = Math.abs(this.x - endNode.x);
		let dz = Math.abs(this.z - endNode.z);
		let maxD = Math.max(dx, dz);
		let minD = Math.min(dx, dz);
		// this.h = Math.SQRT2 * minD + (maxD - minD);

		this.h = Math.sqrt(dx*dx + dz*dz);

		this.f = this.g + this.h;
	}

	getG(n1, n2){
		let g0 = Math.SQRT2;
		if(n1.x === n2.x || n1.z === n2.z){
			g0 = 1;
		}
		return g0;
	}

	equals(node){
		if(node.x === this.x && node.z === this.z){
			return true;
		}
		return false;
	}

}

export default Node;
