
const cordList = {
	'x' : 'x',
	'y' : 'y'
};
const defaultAcceleration = 25;

const gravitySim = (entity, deltaTime) =>{
	// if(entity.getIsGrounded() == false){
	// 	// do gravity calculations
	// }else {
	// 	entity.velocity.y = 0;
	// }
}

const frictionSim = (entity, deltaTime) =>{

	let velocitySign = new Vector2(Math.sign(entity.velocity.x), Math.sign(entity.velocity.y));

	for(let i in cordList){
		if(entity.move[i] == 0 && entity.velocity[i] != 0){

			entity.acceleration[i] = -velocitySign[i] * defaultAcceleration * Math.abs(entity.velocity[i] / 3);
		}
	}
}

function moveObj(e, deltaTime){

	for(let i in cordList){
		e.velocity[i] = e.velocity[i] + (e.acceleration[i] * deltaTime / 1000);

		e.position[i] = e.position[i] + (e.velocity[i] / deltaTime);
	}
}

class PhysicsEngine {
	constructor(gravity = 1){
		
		this.gravity = gravity;

		this.game; //set with this.setGame()

		this.update = (deltaTime)=>{

			for(let i in this.game.gameObjects){
				let currObj = this.game.gameObjects[i];
				
				if (currObj instanceof PhysicsEntity){

					//working out acceleration based on speed + 'move' factor from char controller

					for(let i in cordList){
						if (Math.abs(currObj.velocity[i]) < currObj.speed){
							currObj.acceleration[i] = currObj.move[i] * defaultAcceleration;						
						}else{
							currObj.acceleration[i] = 0;
						}
					}

					// console.log(currObj.acceleration)

					// if(Math.abs(currObj.velocity.x) < currObj.speed){
						
					// }else{
					// 	currObj.acceleration.x = 0;
					// }

					
					gravitySim(currObj, deltaTime);	
					frictionSim(currObj, deltaTime);			
					moveObj(currObj, deltaTime)


				}
			}
		}

		this.setGame = (game) =>{
			this.game = game;
		}

	}
}

class PhysicsEntity extends Entity {
	constructor(name, position = new Vector2(0, 0), size = new Vector2(1, 1)){
		super(name, position, size);
		this.velocity = new Vector2(0, 0);
		this.move = new Vector2(0, 0);
		this.acceleration = new Vector2(0, 0)
		this.mass = 1;
		this.speed = 30;

		this.update = ()=>{
			console.log("wa")
		}

		this.getIsGrounded = ()=>{
			return true;
		}

		this.getVelocity = ()=>{
			return this.velocity;
		}

		this.setVelocity = (newVelocity)=>{
			this.velocity = newVelocity;
		}

	}
}