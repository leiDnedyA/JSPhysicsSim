
class Engine {
	constructor(tickSpeed){

		this.tickSpeed = tickSpeed;

		this.renderer; //set with method this.setRenderer()
		this.game; //set with method this.setGame()
		this.physicsEngine; //set with method this.setPhysicsEngine()

		this.updateFunctions = [];

		//deltaTime stuff
		this.lastUpdate = Date.now();
		this.deltaTime = -1;

		this.start = ()=>{
			setInterval(this.update,  1000/this.tickSpeed)
			alert("Controls: W = up, A = left, S = down, D = right")
		}

		this.update = ()=>{

			this.tick(); // keeps time

			this.renderer.draw(this.game.gameObjects);

			this.physicsEngine.update(this.getDeltaTime());

			this.game.update()

			for(let i in this.updateFunctions){
				this.updateFunctions[i]();
			}
		}

		this.tick = ()=>{
			let now = Date.now();
			this.deltaTime = now - this.lastUpdate;
			this.lastUpdate = now;
		}

		this.addUpdateFunc = (newFunc)=>{
			this.updateFunctions.push(newFunc);
		}

		this.setRenderer = (renderer) =>{
			this.renderer = renderer;
		}

		this.setGame = (game) =>{
			this.game = game;
		}


		this.setPhysicsEngine = (physicsEngine) =>{
			this.physicsEngine = physicsEngine;
		}

		this.getDeltaTime = ()=>{
			return this.deltaTime;
		}

		this.getTickSpeed = ()=>{
			return this.tickSpeed;
		}
	}
}