
class TextEntity extends Entity {
	constructor(position, text, fontSize, fontColor, fontFace = "serif"){
		super(text, position, null);
		this.text = text;
		this.fontSize = fontSize;
		this.color = fontColor;
		this.centered = false;
	}
}