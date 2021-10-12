const gameCanvas = document.querySelector("#gameCanvas");


const tickSpeed = 60;
importConfigJSON('/config/config.json');

const renderer = new Renderer(gameCanvas);
const sampleObj = new PhysicsEntity("player", new Vector2(2, 2)); //player
const game = new Game(sampleObj);
const physicsEngine = new PhysicsEngine(1);
const engine = new Engine(tickSpeed);
const charController = new CharControllerLocal(sampleObj);
const entitySelector = new EntitySelector(gameCanvas, game);

const dummyObj = new PhysicsEntity("dummy", new Vector2(10, 10)); //dummy object
dummyObj.color = "#222333"

const staticObj = new PhysicsEntity("static", new Vector2(20, 20), new Vector2(2, 1), true);
staticObj.color = "#333366"

engine.setRenderer(renderer);
engine.setGame(game);
game.setEntitySelector(entitySelector);
engine.setPhysicsEngine(physicsEngine);
physicsEngine.setGame(game);
charController.setEngine(engine);

engine.start(()=>{
	let toast = new bootstrap.Toast(document.querySelector('#tutorialToast'))
	toast.show()
});
game.start();
entitySelector.start();

game.addGameObject(sampleObj); //init player
sampleObj.color = "#6666ff"; //accent color
// sampleObj.setSelected(true);

for(let i = 0; i < 10; i++){
	// game.addGameObject(new PhysicsEntity(`dummy ${i}`, new Vector2(10+i*2, 10+i*2)))
}

game.addGameObject(dummyObj); //init dummy
// game.addGameObject(staticObj); //init dummy