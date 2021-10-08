
class Game {
	constructor(player){
		this.gameObjects = {}
		this.player = player;

		this.level;

		this.addGameObject = (newObj)=>{
			this.gameObjects[newObj.name] = newObj;
		}

		this.start = ()=>{
			this.setLevel(new TitleScreen());
			this.level.setPlayer(this.player);
		}

		this.update = ()=>{
			for(let i in this.gameObjects){
				if(this.gameObjects[i].hasOwnProperty('update')){
					this.gameObjects[i].update();
				}
			}
		}

		this.setLevel = (level)=>{
			this.level = level;
			for(let i in level.entities){
				this.addGameObject(level.entities[i]);
			}
		}
	}
}