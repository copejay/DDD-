import { _decorator, Component, Node } from 'cc';

import {Prefab,UITransform} from 'cc';
const { ccclass, property } = _decorator;

import { CellsItem } from './CellsItem';
import { CellsWeapon } from './CellsWeapon';

@ccclass('BagCellsManager')
export class BagCellsManager extends Component {

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

    // ItemBoxManager:ItemBoxManager=null;
    CellsItem:CellsItem=null;
    CellsWeapon:CellsWeapon=null;
    // WeaponBoxManager:WeaponBoxManager=null;

    BagApp=null;


    Loading(BagApp){
        this.LoadComponent(BagApp);
    }

    LoadComponent(BagApp){
        this.BagApp=BagApp;
        this.CellsItem=new CellsItem(this.ItemBoxBoardPrefab,this.BoardBoxParentNode,this.ItemBoxClickCallBack);

        this.CellsWeapon=new CellsWeapon(this.WeaponBoxBoardPrefab,this.BoardBoxParentNode,this.WeaponBoxClickCallBack);
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
    reBuildItemCells(ItemInfoList){
        this.destroyAllCells();
        this.CellsItem.CreateBoxBoard(ItemInfoList);
        this.resetContentLength();
    }
    reBuildWeaponCells(WeaponInfoList){
        this.destroyAllCells();
        this.CellsWeapon.CreateBoxBoard(WeaponInfoList);
        this.resetContentLength();
    }


    destroyAllCells(){
        this.CellsItem.DestroyBoxBoard();
        this.CellsWeapon.DestroyBoxBoard();
    }

    resetContentLength(){
        this.ContentNode.getComponent(UITransform).setContentSize(600,this.CellsItem.ItemBoxTotalLength);
    }

}


