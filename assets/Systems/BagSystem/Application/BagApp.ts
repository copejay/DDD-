

import { DataBaseService } from "../../GlobalService";

import { ItemPanelData } from "../Domain/ItemPanelData";

import { ChildItemPanel } from "./ChildItemPanel";
import { ChildBoxBoard } from "./ChildBoxBoard";
import { ChildWeaponPanel } from "./ChildWeaponPanel";

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
    //
    private BagType="Item";
    //训练界面UI
    private BagEntryUI=null;
    private ItemPanelUI=null;
    private WeaponPanelUI=null;

    //数据体
    private ItemPanelData:ItemPanelData;

    //子类
    private ChildItemPanel:ChildItemPanel;
    private ChildBoxBoard:ChildBoxBoard;
    private ChildWeaponPanel:ChildWeaponPanel;



    // clickWeaponBox(WeaponID:string){
    //     console.log("BagApplication: 点击武器框",WeaponID);
    //     this.ChildWeaponPanel.openWeaponPanel(WeaponID);
    // }
    //提供给外部调用的方法
    clickItemBox(ItemID:string){
        console.log("BagApplication: 点击角色框",ItemID);
        this.ChildItemPanel.openItemPanel(ItemID);
    }
    clickWeaponBox(WeaponID:string){
        console.log("BagApplication: 点击武器框",WeaponID);
        this.ChildWeaponPanel.openWeaponPanel(WeaponID);
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


    //角色弹窗UI,外部注入，交给子类管理
    initItemPanelUI(ItemPanelUI){
        this.ItemPanelUI=ItemPanelUI;
        // this.initChildItemPanel();
        this.checkOutLoadOver();
    }
    initWeaponPanelUI(WeaponPanelUI){
        this.WeaponPanelUI=WeaponPanelUI;
        this.checkOutLoadOver();
    }
    initEntryUI(BagUI){
        this.BagEntryUI=BagUI;
        // this.initChildBoxBoard();
        this.checkOutLoadOver();
    }


    checkOutLoadOver(){
        if(this.BagEntryUI==null || this.ItemPanelUI==null || this.WeaponPanelUI==null){
            console.log("BagApplication: 外部资源加载中。。。");
            return;
        }else{
            console.log("BagApplication: 外部资源加载完毕");
            this.initChildBoxBoard();
            this.initChildItemPanel();
            this.initChildWeaponPanel();
        }
    }

    //建立子类管理
    //物品弹窗
    initChildItemPanel(){
        this.ChildItemPanel=new ChildItemPanel(this.DataBaseService,this.ItemPanelUI);
    }
    //物品面板
    initChildBoxBoard(){
        this.ChildBoxBoard=new ChildBoxBoard(this.DataBaseService,this.BagEntryUI);
    }
    //武器弹窗
    initChildWeaponPanel(){
        this.ChildWeaponPanel=new ChildWeaponPanel(this.DataBaseService,this.WeaponPanelUI);
    }



    //接收UI注入
    //训练界面入口UI
    // initEntryUI(BagUI){
    //     this.BagEntryUI=BagUI;
    //     // this.initChildBoxBoard();
    // }


    // //子角色面板板
    // initChildBoxBoard(){
    //     this.ChildBoxBoard=new ChildBoxBoard(this.DataBaseService,this.BagEntryUI);
    // }

}