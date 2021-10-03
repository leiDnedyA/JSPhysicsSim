
class TitleScreen extends Level{
	constructor(){
		super("Title Screen");

		this.entities = {
			"startButton" : new ButtonEntity("startButton", "START", new Vector2(4, 10), ()=>{alert("start")}, "empezar"),
			"settingsButton" : new ButtonEntity("settingsButton", "SETTINGS", new Vector2(20, 10), ()=>{alert("settings")}, "configuración")
		}

	}
}