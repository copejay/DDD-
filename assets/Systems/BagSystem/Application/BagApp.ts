

import { DataBaseService } from "../../GlobalService";
import { TemplateService } from "../../GlobalService";


import { BagCells } from "./Assistant/BagCells";
import { BagPop } from "./Assistant/BagPop";


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
        this.TemplateService=TemplateService.instance;
    }

    //全局数据服务
    private DataBaseService:DataBaseService;
    //模板服务
    private TemplateService:TemplateService;
    //训练界面UI
    private BagEntryUI=null;
    //子类
    // private ChildBoxBoard:App_ChildBoxBoard;
    // private ChildBagPop:App_ChildBagPop;
    private BagCells:BagCells;
    private BagPop:BagPop;

//提供给外部调用的方法
    clickItemBox(ItemID:string){
        console.log("BagApplication: 点击角色框",ItemID);
        this.BagPop.openItemPop(ItemID);
    }
    clickWeaponBox(WeaponID:string){
        console.log("BagApplication: 点击武器框",WeaponID);
        this.BagPop.openWeaponPop(WeaponID);
    }

    UILoadOver(){
        console.log("BagApplication: UI 加载完毕");
        this.BagCells.syncBagItem("Item");
    }

    SwitchToWeapon(){
        console.log("Bag App：切换到Weapon");
        this.BagCells.syncBagItem("Weapon");
    }
    SwitchToItem(){
        console.log("BagApp: 切换到Item");
        this.BagCells.syncBagItem("Item");
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
        this.BagCells=new BagCells(this.DataBaseService,this.TemplateService,this.BagEntryUI);
    }
    //弹窗
    initChildBagPop(){
        this.BagPop=new BagPop(this.DataBaseService,this.BagEntryUI);
    }


}