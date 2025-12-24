import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FormationBoxView')
export class FormationBoxView extends Component {


    private myId:string;

    private callBack:(id)=>void;

    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    start() {
        this.node.on(Node.EventType.TOUCH_END,this.clickCB,this);
    }

    initInfo(id:string,callBack:(id)=>void){
        this.myId=id;
        this.callBack=callBack;
    }

    clickCB(){
        if(this.callBack){
            this.callBack(this.myId);
        }
    }

    update(deltaTime: number) {
        
    }
}


