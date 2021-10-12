
class Game {
	constructor(player){
		this.gameObjects = {}
		this.player = player;
		this.entitySelector; //set with setEntitySelector()

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

			if(this.entitySelector){
				this.entitySelector.update();
			}
		}

		this.setLevel = (level)=>{
			this.level = level;
			for(let i in level.entities){
				this.addGameObject(level.entities[i]);
			}
		}

		this.setPlayer = (newPlayer)=>{
			this.player = newPlayer;
			this.level.setPlayer(this.player);
		}

		this.setEntitySelector = (entitySelector)=>{
			this.entitySelector = entitySelector;
		}
	}
}