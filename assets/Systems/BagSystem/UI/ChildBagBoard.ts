import { _decorator, Component, Node } from 'cc';

import {Prefab,UITransform} from 'cc';
const { ccclass, property } = _decorator;

import { ItemBoxManager } from './Assistant/ItemBoxManager';
import { WeaponBoxManager } from './Assistant/WeaponBoxManager';

// import { BagApp } from '../Application/BagApp';

@ccclass('ChildBagBoard')
export class ChildBagBoard extends Component {

    @property({type:Node,tooltip:"框板节点"})
    BoardNode:Node=null;

    @property({type:Node,tooltip:"格子父节点"})
    BoardBoxParentNode:Node=null;

    @property({type:Node,tooltip:"内容节点"})
    ContentNode:Node=null;

    @property({type:Prefab,tooltip:"物品框板预制体"})
    ItemBoxBoardPrefab:Prefab=null;
    @property({type:Prefab,tooltip:"武器框板预制体"})
    WeaponBoxBoardPrefab:Prefab=null;

    ItemBoxManager:ItemBoxManager=null;
    WeaponBoxManager:WeaponBoxManager=null;

    BagApp=null;


    Loading(BagApp){
        this.LoadComponent(BagApp);
    }

    LoadComponent(BagApp){
        this.BagApp=BagApp;
        this.ItemBoxManager=new ItemBoxManager(this.ItemBoxBoardPrefab,this.BoardBoxParentNode,this.ItemBoxClickCallBack);

        this.WeaponBoxManager=new WeaponBoxManager(this.WeaponBoxBoardPrefab,this.BoardBoxParentNode,this.WeaponBoxClickCallBack);
    }



    //箭头函数确保this不丢失
    ItemBoxClickCallBack=(ItemID:string)=>{
        // this.ItemPanelManager.ShowItemPanel(RoleID);
        this.BagApp.clickItemBox(ItemID);
    }

    WeaponBoxClickCallBack=(WeaponID:string)=>{
        // this.ItemPanelManager.ShowItemPanel(RoleID);
        this.BagApp.clickWeaponBox(WeaponID);
    }

    
    //管理显示视图
    createItemBoxBoard(ItemInfoList){
        this.destroyAllBoard();
        this.ItemBoxManager.CreateBoxBoard(ItemInfoList);
        this.resetContentLength();
    }
    createWeaponBoxBoard(WeaponInfoList){
        this.destroyAllBoard();
        this.WeaponBoxManager.CreateBoxBoard(WeaponInfoList);
        this.resetContentLength();
    }


    destroyAllBoard(){
        this.ItemBoxManager.DestroyBoxBoard();
        this.WeaponBoxManager.DestroyBoxBoard();
    }

    resetContentLength(){
        this.ContentNode.getComponent(UITransform).setContentSize(600,this.ItemBoxManager.ItemBoxTotalLength);
    }

}


