
class Game {
	constructor(player){
		this.gameObjects = {}
		this.player = player;
		this.entitySelector; //set with setEntitySelector()
		this.charController; //set with setCharController()
		this.selectedEntity; //set by entity selector

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

		this.setCharController = (charController)=>{
			this.charController = charController;
		}

		this.setPlayer = (newPlayer)=>{
			
			//setting old player back to regular entity
			this.player.color = "#222333";
			this.player.move = new Vector2(0, 0);

			//setting up new player
			this.player = newPlayer;
			this.player.color = "#6666ff";

			this.level.setPlayer(this.player);

			if(this.charController){
				this.charController.setPlayer(this.player)
			}
		}

		this.setEntitySelector = (entitySelector)=>{
			this.entitySelector = entitySelector;
		}
	}
}