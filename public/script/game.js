
class Game {
	constructor(){
		this.gameObjects = {}

		this.level;

		this.addGameObject = (newObj)=>{
			this.gameObjects[newObj.name] = newObj;
		}

		this.start = ()=>{
			this.setLevel(new TitleScreen());
		}

		this.setLevel = (level)=>{
			this.level = level;
			for(let i in level.entities){
				this.addGameObject(level.entities[i]);
			}
		}
	}
}