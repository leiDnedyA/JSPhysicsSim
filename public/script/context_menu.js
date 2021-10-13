
class ContextMenu {
    constructor(domElement, targetElement = document.querySelector('body')){
        this.options = []
        this.domElement = domElement;
        this.targetElement = targetElement;
        this.optionTemplate = this.domElement.children[0];
        this.visible = false;
        this.lastEvent; //stores e value given by right click so that the menu items can use it

        this.addMenuOption = (option)=>{
            this.options.push(option);
        }

        this.start = ()=>{

            this.optionTemplate.style.visibility = 'hidden';

            this.renderMenu()

            //makes it so nothing happens when you right click on the context menu DOM element
            this.domElement.addEventListener('contextmenu', (e)=>{
                e.preventDefault();
            })

            //makes context menu pop up when u left click on target element
            this.targetElement.addEventListener('contextmenu', (e)=>{

                e.preventDefault()

                this.lastEvent = e;

                let mousePos = new Vector2(e.offsetX, e.offsetY);

                this.visible = true;

                this.domElement.style.left = `${e.offsetX}px`;
                this.domElement.style.top = `${e.offsetY}px`;
                this.setVisible(true);
            })

            //makes menu disappear after clicking away
            document.body.addEventListener('click', (e)=>{
                if(this.visible){
                    this.setVisible(false);
                }
            })
        }

        this.renderMenu = ()=>{ //converts options object into menu elements

            while(this.domElement.childNodes.length > 1){
                this.domElement.removeChild(this.domElement.lastChild);
            }

            for(let i in this.options){
                let ele = this.optionTemplate.cloneNode(true);
                ele.style.visibility = 'inherit';
                ele.addEventListener('click', ()=>{
                    this.options[i].callback(this.lastEvent);
                });
                ele.innerHTML = this.options[i].name;
                this.domElement.appendChild(ele);
            }
        }

        this.setVisible = (b)=>{
            this.visible = b;
            if(b){
                this.domElement.style.visibility = 'visible';
            }else{
                this.domElement.style.visibility = 'hidden';
            }
        }
    }
}

class MenuOption {
    constructor(name, callback){
        this.name = name;
        this.callback = callback;
    }
}