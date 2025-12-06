

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


    //构造时传入系统所需数据,组件
    private constructor(){
        this.DataBaseService=DataBaseService.instance;

    }


    //初始化UI代表着这个视图层开始了
    //需要第一时间进行同步更新
    initUI(ui){
        // this.DataBaseService=DataBaseService.instance;
        this.UI=ui;
        // this.UI.syncGoldUI(this.DataBaseService.getGold());
        // this.UI.syncFoodUI(this.DataBaseService.getFood());
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
            name:"古月方源",
            templateID:"1",
            level:93,
            exp:0,
        }
        this.DataBaseService.setRole(role);
    }


    //接收用户输入并传入子系统
    //接收输入，利用Domain层，逻辑世界做出改变
    //读取逻辑世界，更新视图层
    //把逻辑世界的数据写入持久数据库
    click(eventName:string){
        if(eventName=="金币增加"){
            console.log("ResourcesApp:受到金币增加指令");
            this.DataBaseService.addGold(69);
            this.setRole();
            this.UI.syncGoldUI(this.DataBaseService.getGold());
        }else if(eventName=="食物增加"){
            console.log("ResourcesApp:受到食物增加指令");
            this.DataBaseService.addFood(99);
            this.UI.syncFoodUI(this.DataBaseService.getFood());
        }
    }

    update(){
       
    }
}