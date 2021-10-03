
class CharControllerLocal {
	constructor(player, unitSize){

		this.player = player;
		this.playerSpeed = .005; //units per second
		this.engine; //set with this.setEngine();
		this.tickSpeed; //set with this.setEngine();

		this.velocity = new Vector2(0, 0);

		this.keysDown = {
			'W': false,
			'A': false,
			'S': false,
			'D': false
		}

		this.setEngine = (engine)=>{
			this.engine = engine;
			this.engine.addUpdateFunc(this.updateFunc);
		}

		this.updateFunc = ()=>{

			let v = new Vector2(0, 0);
			if(this.keysDown['W']){
				v.y -= 1;
			}
			if(this.keysDown['S']){
				v.y += 1;
			}
			if(this.keysDown['A']){
				v.x -= 1;
			}
			if(this.keysDown['D']){
				v.x += 1;
			}

			this.velocity = v;

			// console.log(this.player.position)

			this.player.position.x += this.velocity.x * this.playerSpeed * this.engine.getDeltaTime();
			this.player.position.y += this.velocity.y * this.playerSpeed *this.engine.getDeltaTime();
		}

		this.keyEvent = (e, value)=>{
			let key = e.key;

			if(this.keysDown.hasOwnProperty(key.toUpperCase())){
				this.keysDown[key.toUpperCase()] = value;
			}
		}

		window.addEventListener('keydown', (e)=>{this.keyEvent(e, true)});
		window.addEventListener('keyup', (e)=>{this.keyEvent(e, false)});
	}
}