
class Entity {
	constructor(name, position = new Vector2(0, 0), size = new Vector2(1, 1) /*multiples of the default unit size*/){
		this.name = name;
		this.position = position;
		this.size = size;
		this.color = "white";
		this.selected = false;
		this.showPos = false;

		this.setSelected = (b)=>{
			this.selected = b;
		}

		this.setShowPos = (b)=>{
			this.showPos = b;
		}
	}
}

class Vector2 {
	constructor(x, y){
		this.x = parseFloat(x);
		this.y = parseFloat(y);
	}
}