
class Entity {
	constructor(name, position = new Vector2(0, 0), size = new Vector2(1, 1) /*multiples of the default unit size*/){
		this.name = name;
		this.position = position;
		this.size = size;
		this.color = "white";
	}
}

class Vector2 {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}