import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

import { GlobalApp } from '../../../GlobalSystem/Application/GlobalApp';

@ccclass('ChangeScene')
export class ChangeScene extends Component {


    @property({tooltip:"切换的场景名"})
    SceneName:string="";

    private isLoading:boolean=false;

    private GlobalApp;

    start() {
        // this.GlobalApp=GlobalApp.instance;
        if(this.isLoading==false){
            this.node.on(Node.EventType.TOUCH_END,this.onClick,this);
            this.isLoading=true;
        }else{
            console.log("ChangeScene:此常驻节点已经初始化过了");
        }
    }

    onClick(){
        if(this.SceneName){
            console.log(`ChangeScene: App:${this.GlobalApp}`);
            this.GlobalApp=GlobalApp.instance;
            console.log(`ChangeScene: App2:${this.GlobalApp}`);
            // director.loadScene(this.SceneName);
            GlobalApp.instance.changeScene(this.SceneName);
        }
    }

    update(deltaTime: number) {
        
    }
}


