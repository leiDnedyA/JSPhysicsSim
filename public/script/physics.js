
const cordList = {
	'x' : 'x',
	'y' : 'y'
};
const defaultAcceleration = 15;

const frictionConst = .03;

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

			entity.acceleration[i] = Math.round((-velocitySign[i] * defaultAcceleration * Math.abs(entity.velocity[i] * frictionConst))*10000)/10000;
		}else if (document.hidden){
		entity.acceleration[i] = Math.round((-velocitySign[i] * defaultAcceleration * Math.abs(entity.velocity[i] * frictionConst))*10000)/10000;
		
		}
	}
}

function moveObj(e, deltaTime){

	for(let i in cordList){
		e.velocity[i] = Math.round((e.velocity[i] + (e.acceleration[i] * deltaTime / 1000)) * 10000) / 10000;

		e.position[i] = Math.round((e.position[i] + (e.velocity[i] / deltaTime))*100000)/100000;
	}
}

class PhysicsEngine {
	constructor(gravity = 1){
		
		this.gravity = gravity;

		this.game; //set with this.setGame()

		this.collisionEngine = new CollisionEngine();

		this.update = (deltaTime)=>{

			for(let i in this.game.gameObjects){
				let currObj = this.game.gameObjects[i];
				
				if (currObj instanceof PhysicsEntity){

					//working out acceleration based on speed + 'move' factor from char controller

					for(let i in cordList){
						if (Math.abs(currObj.velocity[i]) < currObj.speed){
							currObj.acceleration[i] = Math.round((currObj.move[i] * defaultAcceleration)*100000)/100000;
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

			this.collisionEngine.update(this.game.gameObjects);
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
		this.speed = 1000;

		this.update = ()=>{
			  if(this.position.x < (bounds.x[0] / unitSize)){
			    this.position.x = bounds.x[1] / unitSize;
			  }else if(this.position.x > (bounds.x[1] / unitSize)){
			    this.position.x = bounds.x[0] / unitSize;
			  }
			  if(this.position.y < (bounds.y[0] / unitSize)){
			    this.position.y = bounds.y[1] / unitSize;
			  }else if(this.position.y > (bounds.y[1] / unitSize)){
			    this.position.y = bounds.y[0] / unitSize;
			  }
			
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

class CollisionEngine {
	constructor(){

		this.minVelocityPercentDif = 60;

		this.update = (gameObjects)=>{
			
			let physicsObjects = [];

			for (let i in gameObjects){
				if(gameObjects[i] instanceof PhysicsEntity){
					physicsObjects.push(gameObjects[i]);
				}
			}

			let collisions = []

			for(let i in physicsObjects){
				for(let j in physicsObjects){
					if(i != j){

						let obj1 = physicsObjects[i];
						let obj2 = physicsObjects[j];

						if(Math.abs(obj1.position.x - obj2.position.x) < obj1.size.x && Math.abs(obj1.position.y - obj2.position.y) < obj1.size.y){
							let doCollision = true;
							for(let k in collisions){
								if(collisions[k] != [i, j]){
									doCollision = false;
								}
							}

							if(calcPercentDifference(obj1.velocity.x,obj2.velocity.x) >= this.minVelocityPercentDif ||calcPercentDifference(obj1.velocity.y,obj2.velocity.y) >= this.minVelocityPercentDif ){
								if(doCollision){

									collisions.push([i, j])
									collisions.push([j, i])

									let tempVelocity = obj1.velocity;
									obj1.velocity = obj2.velocity;
									obj2.velocity = tempVelocity;

								}
							}

						}
					}
				}
			}



		}



	}
}

const calcPercentDifference = (x, y)=>{
	let dif = (Math.abs(x-y))/((x+y)/2) * 100;
	if(dif == NaN){
		dif = 100;
	}
	dif = Math.abs(dif)
	console.log(dif);
	return dif
}