
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
	constructor(name, position = new Vector2(0, 0), size = new Vector2(1, 1), isStatic = false){
		super(name, position, size);
		this.velocity = new Vector2(0, 0);

		this.properties = {
			isStatic: isStatic,
			isBouncy: true
		}

		this.isStatic = isStatic;
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

						//distances from center to edge
						let sudoDiameter1 = new Vector2(obj1.size.x / 2, obj1.size.y / 2);
						let sudoDiameter2 = new Vector2(obj2.size.x / 2, obj2.size.y / 2);

						//position of point at center of obj
						let centerPos1 = new Vector2(obj1.position.x + sudoDiameter1.x, obj1.position.y + sudoDiameter1.y);
						let centerPos2 = new Vector2(obj2.position.x + sudoDiameter2.x, obj2.position.y + sudoDiameter2.y);

						if(Math.abs(centerPos1.x - centerPos2.x) < (sudoDiameter1.x + sudoDiameter2.x) && Math.abs(centerPos1.y - centerPos2.y) < (sudoDiameter1.y + sudoDiameter2.y)){
							
							// console.log(`obj1 : ${obj1.name}, obj2: ${obj2.name}`)
							// console.log(`obj1 pos: (${obj1.position.x}, ${obj1.position.y})`)
							// console.log(`obj2 pos: (${obj2.position.x}, ${obj2.position.y})`)
							let doCollision = true;
							for(let k in collisions){
								if(collisions[k] != [i, j]){
									doCollision = false;
								}
							}

							if(calcPercentDifference(obj1.velocity.x,obj2.velocity.x) >= this.minVelocityPercentDif ||calcPercentDifference(obj1.velocity.y,obj2.velocity.y) >= this.minVelocityPercentDif ){
								if(doCollision){

									if(obj1.isStatic == false && obj2.isStatic == false){ //done if neither object is static
										let tempVelocity = obj1.velocity;
										obj1.velocity = obj2.velocity;
										obj2.velocity = tempVelocity;
									}else if(obj1.isStatic == true && obj2.isStatic == false){
										bounceOff(obj1, obj2)
									}else if(obj1.isStatic == false && obj2.isStatic == true){
										bounceOff(obj2, obj1)
									}else if(obj1.isStatic == true && obj2.isStatic == true){

									}

									

									collisions.push([i, j])
									collisions.push([j, i])

									

								}
							}

						}
					}
				}
			}



		}



	}
}

const bounceOff = (statObj, dynObj)=>{

	let statRadius = new Vector2(statObj.size.x / 2, statObj.size.y / 2)
	let dynRadius = new Vector2(dynObj.size.x / 2, dynObj.size.y / 2)

	// let edge = calcCollisionEdge(statObj, dynObj);
	let edge = null;
	// console.log(edge)

	if(edge == null){
		dynObj.velocity = new Vector2(-dynObj.velocity.x, -dynObj.velocity.y);
	}else if (edge[0] % 2 == 0){
		dynObj.velocity = new Vector2(-dynObj.velocity.x, dynObj.velocity.y);
	}else{
		dynObj.velocity = new Vector2(dynObj.velocity.x, -dynObj.velocity.y);
	}

	
}

const maxCollisionMargin = .2;

const calcCollisionEdge = (obj1, obj2)=>{ //calculates the edge being touched between two colliding objects format: [obj1's edge, obj2's edge]
	
	let edges1 = [obj1.position.y, obj1.position.x + obj1.size.x, obj1.position.y + obj1.size.y, obj1.position.x]; //clockwise starting from top edge
	let edges2 = [obj2.position.y, obj2.position.x + obj2.size.x, obj2.position.y + obj2.size.y, obj2.position.x];

	let candidates = []
	let candidatesDif = []

	console.log(edges1)
	console.log(edges2)

	for(let i in edges1){
		for(let j in edges2){
			// console.log(edges1[i] - edges2[j])
			let dif = Math.abs(edges1[i] - edges2[j]);
			if(dif <= maxCollisionMargin){
				// console.log([i, j])
				candidates.push([i, j]);
				candidatesDif.push(dif)
			}
		}
	}

	let closest;
	let closestDif;

	for(let i in candidates){
		if(closest == null){
			closest = candidates[i];
			closestDif = candidatesDif[i];
		}else if(candidatesDif[i] < closestDif){
			closest = candidates[i];
			closestDif = candidatesDif[i]
		}
	}

	return closest;
}

const calcPercentDifference = (x, y)=>{
	let dif = (Math.abs(x-y))/((x+y)/2) * 100;
	if(dif == NaN){
		dif = 100;
	}
	dif = Math.abs(dif)
	// console.log(dif);
	return dif
}