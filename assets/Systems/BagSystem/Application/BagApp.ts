

import { DataBaseService } from "../../GlobalService";

import { ItemPanelData } from "../Domain/ItemPanelData";

import { ChildItemPanel } from "./ChildItemPanel";
import { ChildBoxBoard } from "./ChildBoxBoard";

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
    private ItemPanelUI=null;

    //数据体
    private ItemPanelData:ItemPanelData;

    //子类
    private ChildItemPanel:ChildItemPanel;
    private ChildBoxBoard:ChildBoxBoard;


    //提供给外部调用的方法
    clickItemBox(ItemID:string){
        console.log("BagApplication: 点击角色框",ItemID);
        this.ChildItemPanel.openItemPanel(ItemID);
    }
    UILoadOver(){
        console.log("BagApplication: UI 加载完毕");
        this.ChildBoxBoard.syncBagItem();
    }


    //角色弹窗UI,外部注入，交给子类管理
    initItemPanelUI(ItemPanelUI){
        this.ItemPanelUI=ItemPanelUI;
        // this.initChildItemPanel();
        this.checkOutLoadOver();
    }
    initEntryUI(BagUI){
        this.BagEntryUI=BagUI;
        // this.initChildBoxBoard();
        this.checkOutLoadOver();
    }


    checkOutLoadOver(){
        if(this.BagEntryUI==null || this.ItemPanelUI==null){
            console.error("BagApplication: 外部资源加载中。。。");
            return;
        }else{
            console.log("BagApplication: 外部资源加载完毕");
            this.initChildBoxBoard();
            this.initChildItemPanel();
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