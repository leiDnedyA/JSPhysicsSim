
class ButtonEntity extends Entity{
	constructor(name, text, position, onClick, subtext = null){
		super(name, position, new Vector2(6, 2));
		this.text = text;
		this.subtext = subtext;
		this.onClick = onClick;

	}
}