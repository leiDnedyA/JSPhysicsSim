const gameCanvas = document.querySelector("#gameCanvas");

const tickSpeed = 20;

const renderer = new Renderer(gameCanvas);
const game = new Game();
const engine = new Engine(tickSpeed);
const sampleObj = new Entity("sample", new Vector2(2, 2));
const charController = new CharControllerLocal(sampleObj);

engine.setRenderer(renderer);
engine.setGame(game);
charController.setEngine(engine)

engine.start();

game.addGameObject(sampleObj);