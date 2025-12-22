

import { DataBaseService } from "../../GlobalService";

import { App_ChildBoxBoard } from "./App_ChildBoxBoard";
import { App_ChildBagPop } from "./App_ChildBagPop";
import {App_BagManager} from "./App_BagManager";


export class BagApp{

    private static _instance:BagApp;

    public static get instance(){
        if(!this._instance){
            this._instance=new BagApp();
        }
        return this._instance;
    }
    constructor(){
        this.DataBaseService=DataBaseService.instance;
    }

    //全局数据服务
    private DataBaseService:DataBaseService;
    //训练界面UI
    private BagEntryUI=null;
    //子类
    private ChildBoxBoard:App_ChildBoxBoard;
    private ChildBagPop:App_ChildBagPop;

//提供给外部调用的方法
    clickItemBox(ItemID:string){
        console.log("BagApplication: 点击角色框",ItemID);
        this.ChildBagPop.openItemPop(ItemID);
    }
    clickWeaponBox(WeaponID:string){
        console.log("BagApplication: 点击武器框",WeaponID);
        this.ChildBagPop.openWeaponPop(WeaponID);
    }

    UILoadOver(){
        console.log("BagApplication: UI 加载完毕");
        this.ChildBoxBoard.syncBagItem("Item");
    }

    SwitchToWeapon(){
        console.log("Bag App：切换到Weapon");
        this.ChildBoxBoard.syncBagItem("Weapon");
    }
    SwitchToItem(){
        console.log("BagApp: 切换到Item");
        this.ChildBoxBoard.syncBagItem("Item");
    }



//外部进行注入
    initEntryUI(BagUI){
        this.BagEntryUI=BagUI;
        // this.initChildBoxBoard();
        this.checkOutLoadOver();
    }
//确认注入成功，进行组合
    checkOutLoadOver(){
        if(this.BagEntryUI==null){
            console.log("BagApplication: 外部资源加载中。。。");
            return;
        }else{
            console.log("BagApplication: 外部资源加载完毕");
            this.initChildBoxBoard();
            this.initChildBagPop();
        }
    }
//子类进行组合
    //面板
    initChildBoxBoard(){
        this.ChildBoxBoard=new App_ChildBoxBoard(this.DataBaseService,this.BagEntryUI);
    }
    //弹窗
    initChildBagPop(){
        this.ChildBagPop=new App_ChildBagPop(this.DataBaseService,this.BagEntryUI);
    }


}