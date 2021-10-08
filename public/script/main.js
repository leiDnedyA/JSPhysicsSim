const gameCanvas = document.querySelector("#gameCanvas");

const tickSpeed = 60;
importConfigJSON('/config/config.json');

const renderer = new Renderer(gameCanvas);
const sampleObj = new PhysicsEntity("player", new Vector2(2, 2)); //player
const game = new Game(sampleObj);
const physicsEngine = new PhysicsEngine(1);
const engine = new Engine(tickSpeed);
const charController = new CharControllerLocal(sampleObj);

const dummyObj = new PhysicsEntity("dummy", new Vector2(10, 10)); //dummy object

engine.setRenderer(renderer);
engine.setGame(game);
engine.setPhysicsEngine(physicsEngine);
physicsEngine.setGame(game);
charController.setEngine(engine);

engine.start();
game.start();

game.addGameObject(sampleObj); //init player
sampleObj.color = "#00ff33";

for(let i = 0; i < 10; i++){
	// game.addGameObject(new PhysicsEntity(`dummy ${i}`, new Vector2(10+i*2, 10+i*2)))
}

game.addGameObject(dummyObj); //init dummy