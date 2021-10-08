
class TitleScreen extends Level{
	constructor(){
		super("Title Screen");

		this.entities = {
			title: new TextEntity(new Vector2(3, 12), "Ayden's Test Thing", 100, "#333344")
		}
		this.entities.title.centered = true;

	}
}