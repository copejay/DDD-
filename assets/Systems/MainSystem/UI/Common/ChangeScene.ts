import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeScene')
export class ChangeScene extends Component {


    @property({tooltip:"切换的场景名"})
    SceneName:string="";

    private isLoading:boolean=false;

    start() {
        if(this.isLoading==false){
            this.node.on(Node.EventType.TOUCH_END,this.onClick,this);
            this.isLoading=true;
        }else{
            console.log("ChangeScene:此常驻节点已经初始化过了");
        }
    }

    onClick(){
        if(this.SceneName){
            director.loadScene(this.SceneName);
        }
    }

    update(deltaTime: number) {
        
    }
}


