const bounds = {
      x: [0, window.innerWidth],
      y: [0, window.innerHeight]
      }

      
class TitleScreen extends Level{
	constructor(){
		super("Title Screen");

		this.entities = {
			title: new TextEntity(new Vector2(3, 12), "Ayden's Test Thing", 100, "#333344"),
			playerPos: new TextEntity(new Vector2(1, 1), "(0, 0)", 15, "#6666ff")
		}
		this.entities.title.centered = true;

		this.setPlayer = (player)=>{
			this.player = player;
		}

		this.entities.playerPos.update = ()=>{

			if(this.player){
				this.entities.playerPos.text = `(${Math.round(this.player.position.x * 100)/100}, ${Math.round(this.player.position.y * 100)/100})`;
				  // console.log("wa")
				}
		}

	}
}