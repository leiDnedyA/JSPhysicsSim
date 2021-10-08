const gameCanvas = document.querySelector("#gameCanvas");

const tickSpeed = 20;
importConfigJSON('/config/config.json');

const renderer = new Renderer(gameCanvas);
const game = new Game();
const physicsEngine = new PhysicsEngine(1);
const engine = new Engine(tickSpeed);
const sampleObj = new PhysicsEntity("sample", new Vector2(2, 2));
const charController = new CharControllerLocal(sampleObj);

engine.setRenderer(renderer);
engine.setGame(game);
engine.setPhysicsEngine(physicsEngine);
physicsEngine.setGame(game);
charController.setEngine(engine)

engine.start();
game.start();

game.addGameObject(sampleObj);