

//引入全局服务
import { DataBaseService } from "../../GlobalService";

//非挂载，全局可访问单例
import { AutoTimeID } from "../Infrastructure";

import { RoleRow } from "../../GlobalService";

export class ResourceApp{

    private static _instance:ResourceApp;

    public static get instance(){
        if(!this._instance){
            this._instance=new ResourceApp();
        }
        return this._instance;
    }

    private DataBaseService;

    private UI;

    private unKnowNum=0;


    //构造时传入系统所需数据,组件
    private constructor(){
        this.DataBaseService=DataBaseService.instance;

    }


    //初始化UI代表着这个视图层开始了
    //需要第一时间进行同步更新
    initUI(ui){
        this.UI=ui;
        this.syncUI();
    }

    syncUI(){
        this.UI.syncGoldUI(this.DataBaseService.getGold());
        this.UI.syncFoodUI(this.DataBaseService.getFood());
    }


    setRole(){
        const TimeID=AutoTimeID();
        const role:RoleRow={
            id:TimeID,
            baseInfo:{
                name:`孙悟空${this.unKnowNum}`,
                level:100,
                exp:0,
            },
            equipList:[],
            skillList:[{id:'tianwaifeigun',up:true}],
            // name:`大圣${this.unKnowNum}`,
            // templateID:"1",
            // level:93,
            // exp:0,
        }
        this.DataBaseService.setRole(role);
        this.unKnowNum++;
    }

    // addStackItem(){
    //     let id="四级魔力结晶";
    //     let num=10;
    //     let StackItemRow={
    //         id:id,
    //         count:num,
    //     }
    //     this.DataBaseService.addStackItem(id,num);
    // }


    //接收用户输入并传入子系统
    //接收输入，利用Domain层，逻辑世界做出改变
    //读取逻辑世界，更新视图层
    //把逻辑世界的数据写入持久数据库

    uiEvent(event:{type:any,message:any}){
        if(event.type=="click"){
            if(event.message=="goldAdd"){
                this.eventGoldAdd();
            }else if(event.message=="foodAdd"){
                this.eventFoodAdd();
            }else{
                console.log("ResourcesApp: 未知点击指令",event.message);
            }
        }else if(event.type=="input"){

        }else{
            console.log("ResourcesApp: 未知输入指令",event.message);
        }

    }

    eventGoldAdd(){
        this.DataBaseService.addGold(500);
        this.setRole();
        this.UI.syncGoldUI(this.DataBaseService.getGold());
    }


    eventFoodAdd(){
        this.DataBaseService.addFood(500);
        // this.setRole();
        // this.addStackItem();
        this.UI.syncFoodUI(this.DataBaseService.getFood());
    }


    // click(eventName:string){
    //     if(eventName=="金币增加"){
    //         console.log("ResourcesApp:受到金币增加指令");
    //         this.DataBaseService.addGold(69);
    //         this.setRole();
    //         this.UI.syncGoldUI(this.DataBaseService.getGold());
    //     }else if(eventName=="食物增加"){
    //         console.log("ResourcesApp:受到食物增加指令");
    //         this.DataBaseService.addFood(99);
    //         this.UI.syncFoodUI(this.DataBaseService.getFood());
    //     }
    // }

    update(){
       
    }
}