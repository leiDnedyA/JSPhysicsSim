
const unitSize = 40; //everything on canvas will be in multiples of this

const bounds = {
	x: [0, window.innerWidth],
	y: [0, window.innerHeight]
	}

class Renderer {
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');

		this.ctx.globalAlpha = .3;

		this.draw = (gameObjects)=>{
			this.ctx.fillStyle = "white";
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			for(let i in gameObjects){
				if(gameObjects[i] instanceof TextEntity){
					this.drawText(gameObjects[i])
				}else{
					this.drawObject(gameObjects[i])
				}
				
			}
		}

		this.drawObject = (obj)=>{
			this.ctx.fillStyle = obj.color;

			let sizeAdj = [obj.size.x * unitSize, obj.size.y * unitSize];

			let posAdj = [obj.position.x * unitSize, obj.position.y * unitSize, (obj.position.x * unitSize) + sizeAdj[0], (obj.position.y * unitSize) + sizeAdj[1]];

			this.ctx.fillRect(posAdj[0], posAdj[1], sizeAdj[0], sizeAdj[1]);

			let objPadding = .1 * unitSize;

			if(obj.selected){
				this.ctx.strokeStyle = "#6666ff";
				this.ctx.strokeRect(posAdj[0] - objPadding, posAdj[1] - objPadding, sizeAdj[0] + objPadding*2, sizeAdj[1] + objPadding*2);
				// this.ctx.stroke();
				// this.ctx.closePath();
			}
		}

		this.drawText = (obj)=>{
			this.ctx.font = `${obj.fontSize}px ${obj.fontFace}`;
			this.ctx.fillStyle = obj.color;
			if(obj.centered){
				let measureText = this.ctx.measureText(obj.text);
				let centerPos = new Vector2((this.canvas.width - measureText.width) / 2, (this.canvas.height - obj.fontSize) / 2)
				this.ctx.fillText(obj.text, centerPos.x, centerPos.y)
			}else{

				this.ctx.fillText(obj.text, obj.position.x * unitSize, obj.position.y * unitSize)
			}
		}

		this.autoScale = ()=>{
			this.canvas.width = this.canvas.parentElement.clientWidth;
			this.canvas.height = window.innerHeight;
			let canvasOffset = this.canvas.getBoundingClientRect();
			bounds.x = [canvasOffset.left, this.canvas.width];
			bounds.y = [canvasOffset.top, this.canvas.height];
		}

		window.addEventListener('resize', this.autoScale);

		this.autoScale();
	}
}