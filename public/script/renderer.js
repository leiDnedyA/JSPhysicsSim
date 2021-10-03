
const unitSize = 40; //everything on canvas will be in multiples of this

class Renderer {
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');

		this.draw = (gameObjects)=>{
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			for(let i in gameObjects){
				this.drawObject(gameObjects[i])
			}
		}

		this.drawObject = (obj)=>{
			this.ctx.fillStyle = obj.color;
			this.ctx.fillRect(obj.position.x * unitSize, obj.position.y * unitSize, obj.size.x * unitSize, obj.size.y * unitSize);
		}

		this.autoScale = ()=>{
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		}

		window.addEventListener('resize', this.autoScale);

		this.autoScale();
	}
}