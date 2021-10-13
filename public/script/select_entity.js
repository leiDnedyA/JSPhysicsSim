
//check if point in world is within bounds of entity
const pointInEntity = (entity, point)=>{
    if(point.x > entity.position.x && point.x < entity.position.x + entity.size.x && point.y > entity.position.y && point.y < entity.position.y + entity.size.y){
        return true;
    }
    return false;
}

class EntitySelector {
    constructor(canvas, game){
        this.canvas = canvas;
        this.game = game;

        this.mousePos;

        this.start = ()=>{
            this.canvas.addEventListener('mousemove', (e)=>{
                
                this.mousePos = this.getPosFromEvent(e);
                
            })

            this.canvas.addEventListener('click', (e)=>{

                // this.checkSelection(this.mousePos, true);

                this.playerChange(this.getPosFromEvent(e));

            })

            this.canvas.dispatchEvent(new Event('mousemove'));
        }

        this.playerChange = (mousePos)=>{
            let entities = this.clickQuery(mousePos);

            if(entities[0]){
                this.game.setPlayer(entities[0]);
            }
        }

        this.update = ()=>{
            this.checkSelection(this.mousePos, false);
        }

        this.getPosFromEvent = (e)=>{
            let target = this.canvas;
            let rect = target.getBoundingClientRect();

            let mousePos = new Vector2((e.clientX - rect.left) / unitSize, (e.clientY - rect.top) / unitSize);

            return mousePos;

        }

        this.clickQuery = (mousePos)=>{
            let gameObjects = this.game.gameObjects;

            let clickedList = [];

            for(let i in gameObjects){
                let entity = gameObjects[i];
                if(entity instanceof PhysicsEntity){
                    if(pointInEntity(entity, this.mousePos)){
                        // console.log(entity);
                        clickedList.push(entity);
                    }
                }
                
            }

            return clickedList;
            
        }
        
        this.checkSelection = (mousePos, isClicked)=>{
            //set up to get the cursor pos relative to target(canvas)
        
            //pos adjusted for unitSize (not needed because of mousemove listener)
            // let clickPos = new Vector2((e.clientX - rect.left) / unitSize, (e.clientY - rect.top) / unitSize);
            
            //looking through gameObjects to check if any are being clicked
            
            let entitiesClicked = this.clickQuery(mousePos);
            
            let gameObjects = this.game.gameObjects;

            for(let i in gameObjects){
                gameObjects[i].setSelected(false)
            }
            for(let i in entitiesClicked){
                entitiesClicked[i].setSelected(true);
            }

        }
    }

    
}