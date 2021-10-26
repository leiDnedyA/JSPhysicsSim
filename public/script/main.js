const gameCanvas = document.querySelector("#gameCanvas");


const tickSpeed = 60;
importConfigJSON('./config/config.json');

const renderer = new Renderer(gameCanvas);
const sampleObj = new PhysicsEntity("player", new Vector2(2, 2)); //player
const game = new Game(sampleObj);
const physicsEngine = new PhysicsEngine(1);
const engine = new Engine(tickSpeed);
const charController = new CharControllerLocal(sampleObj);
const entitySelector = new EntitySelector(gameCanvas, game);
const contextMenu = new ContextMenu(document.querySelector('#customContextMenu'), gameCanvas);

const dummyObj = new PhysicsEntity("dummy", new Vector2(10, 10)); //dummy object
// dummyObj.color = "#222333"

engine.setRenderer(renderer);
engine.setGame(game);
engine.setPhysicsEngine(physicsEngine);
game.setEntitySelector(entitySelector);
game.setCharController(charController)
physicsEngine.setGame(game);
charController.setEngine(engine);

engine.start(()=>{
	//setting up toast
	let toast = new bootstrap.Toast(document.querySelector('#tutorialToast'))
	toast.show()
	
	//setting up context menu

	contextMenu.addMenuOption(new MenuOption('Set player', (e)=>{
		let clickWorldPos = getClickWorldPos(e, gameCanvas);

		let selectedList = entitySelector.clickQuery(clickWorldPos);

		if(selectedList[0]){
			game.setPlayer(selectedList[0])
		}
	}))

	//spawn entity
	contextMenu.addMenuOption(new MenuOption('Spawn entity', (e)=>{
			
		let clickWorldPos = getClickWorldPos(e, gameCanvas);

		game.addGameObject(new PhysicsEntity(`Game Object(${Object.keys(game.gameObjects).length + 1})`, clickWorldPos))
	}))

	contextMenu.addMenuOption(new MenuOption('Delete entity', (e)=>{

		let clickWorldPos = getClickWorldPos(e, gameCanvas);

		let selectedList = entitySelector.clickQuery(clickWorldPos);

		for(let i in selectedList){
			delete game.gameObjects[selectedList[i].name]
		}

	}));



});
game.start();
entitySelector.start();
contextMenu.start();

game.addGameObject(sampleObj); //init player
sampleObj.color = "#6666ff"; //accent color
// sampleObj.setSelected(true);

for(let i = 0; i < 10; i++){
	// game.addGameObject(new PhysicsEntity(`dummy ${i}`, new Vector2(10+i*2, 10+i*2)))
}

// game.addGameObject(dummyObj); //init dummy
// game.addGameObject(staticObj); //init dummy

for(let i = 0; i < 8; i++){
	game.addGameObject(new PhysicsEntity(`dummy ${i}`, new Vector2(Math.random() * (gameCanvas.width / unitSize), Math.random() * (gameCanvas.height / unitSize)), Math.random() * 1 + .5))
}

const getClickWorldPos = (e, canvas)=>{
	let target = this.canvas;
    let rect = canvas.getBoundingClientRect();
	return  new Vector2((e.clientX - rect.left) / unitSize, (e.clientY - rect.top) / unitSize);
}