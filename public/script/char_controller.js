
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

			let m = new Vector2(0, 0);
			if(this.keysDown['W']){
				m.y -= 1;
			}
			if(this.keysDown['S']){
				m.y += 1;
			}
			if(this.keysDown['A']){
				m.x -= 1;
			}
			if(this.keysDown['D']){
				m.x += 1;
			}

			this.player.move = m;

			// console.log(this.player.position)

			// this.player.position.x += this.velocity.x * this.playerSpeed * this.engine.getDeltaTime();
			// this.player.position.y += this.velocity.y * this.playerSpeed *this.engine.getDeltaTime();
		}

		this.keyEvent = (e, value)=>{
			let key = e.key;

			if(this.keysDown.hasOwnProperty(key.toUpperCase())){
				this.keysDown[key.toUpperCase()] = value;
			}
		}

		this.setPlayer = (newPlayer)=>{
			this.player = newPlayer;
		}

		window.addEventListener('keydown', (e)=>{this.keyEvent(e, true)});
		window.addEventListener('keyup', (e)=>{this.keyEvent(e, false)});
	}
}