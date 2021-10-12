
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
                
                let target = this.canvas;
                let rect = target.getBoundingClientRect();

                this.mousePos = new Vector2((e.clientX - rect.left) / unitSize, (e.clientY - rect.top) / unitSize);

            })

            this.canvas.addEventListener('click', ()=>{
                this.checkSelection(this.mousePos, true);
            })

            this.canvas.dispatchEvent(new Event('mousemove'));
        }

        this.update = ()=>{
            this.checkSelection(this.mousePos, false);
        }

        this.checkSelection = (mousePos, isClicked)=>{
            //set up to get the cursor pos relative to target(canvas)
            let target = this.canvas;
            let rect = target.getBoundingClientRect();

            //pos adjusted for unitSize (not needed because of mousemove listener)
            // let clickPos = new Vector2((e.clientX - rect.left) / unitSize, (e.clientY - rect.top) / unitSize);
            
            //looking through gameObjects to check if any are being clicked
            let gameObjects = this.game.gameObjects;

            for(let i in gameObjects){
                let entity = gameObjects[i];
                if(entity instanceof PhysicsEntity){
                    if(pointInEntity(entity, this.mousePos)){
                        // console.log(entity);
                        entity.setSelected(true);
                    }else{
                        entity.setSelected(false);
                    }
                }
                
            }
        }
    }

    
}