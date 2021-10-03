
class Game {
	constructor(){
		this.gameObjects = {}

		this.addGameObject = (newObj)=>{
			this.gameObjects[newObj.name] = newObj;
		}
	}
}