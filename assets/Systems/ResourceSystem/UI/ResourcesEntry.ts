import { _decorator, Component, Node } from 'cc';
// import { Event } from 'cc';
const { ccclass, property } = _decorator;

import { ResourceApp } from '../Application/ResourceApp';
//接收预制体的字节点
import { PrefabNode } from './PrefabNode';



@ccclass('ResourcesEntry')
export class ResourcesEntry extends Component {

    @property({type:Node,tooltip:"增加金币按钮"})
    addGold:Node=null;
    
    @property({type:Node,tooltip:"增加食物按钮"})
    addFood:Node=null;


    private ResourceApp:ResourceApp=null;

    private GoldBoardView;
    private FoodBoardView;



    //UI层只能做事件接收
    onLoad() {
        this.addGold.on(Node.EventType.TOUCH_START,this.AddGold,this);
        this.addFood.on(Node.EventType.TOUCH_START,this.AddFood,this);

        this.GoldBoardView=this.node.getChildByName("PrefabNode").getComponent(PrefabNode).getGoldBoardView();
        this.FoodBoardView=this.node.getChildByName("PrefabNode").getComponent(PrefabNode).getFoodBoardView();
        
        // this.ResourceApp=new ResourceApp(GoldBoardView);
    }

    start(){
        console.log("ResourcesEntry: start开始");
        this.ResourceApp=ResourceApp.instance;
        this.ResourceApp.initUI(this);
    }

    syncGoldUI(goldNum:number){
        this.GoldBoardView.setString(goldNum);
    }

    syncFoodUI(foodNum:number){
        this.FoodBoardView.setString(foodNum);
    }



    //这里应该传给Application层，而不是自己处理
    AddGold(){
        this.ResourceApp.uiEvent({type:"click",message:"goldAdd"});
    }

    AddFood(){
        this.ResourceApp.uiEvent({type:"click",message:"foodAdd"});
    }


    update(deltaTime: number) {
        this.ResourceApp.update();
    }
}


