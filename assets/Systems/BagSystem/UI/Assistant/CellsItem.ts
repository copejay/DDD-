
import { ItemBoxViewFactory } from '../../Infrastructure';

import { Prefab ,Node} from 'cc';


export class CellsItem{

    private ItemBoxFactory:ItemBoxViewFactory;
    private ParentNode:Node;

    private ItemBoxList=[];

    ItemBoxTotalLength:number=0;

    ClickCallBack:(ItemID:string)=>void=null;

    
    constructor(ItemBoxViewPrefab:Prefab,ParentNode:Node,ClickCallBack:(ItemID:string)=>void){
        this.ItemBoxFactory=new ItemBoxViewFactory(ItemBoxViewPrefab);
        this.ParentNode=ParentNode;
        this.ClickCallBack=ClickCallBack;
    }

    CreateBoxBoard(ItemInfoList){
        this.CreateItemBox(ItemInfoList.length);
        this.syncItemBoxList(ItemInfoList);
    }

    //内部依赖的意识是，直接使用类内部的属性
    //内部依赖：创建角色框板
    CreateItemBox(BoxNum:number){
        this.ItemBoxList=this.MakeItemBoxList(BoxNum);
        const ItemBoxSiteList=this.MakeBoxSiteList(BoxNum);
        for(let i=0;i<this.ItemBoxList.length;i++){
            let ItemBox=this.ItemBoxList[i];
            let BoxSite=ItemBoxSiteList[i];
            ItemBox.setPosition(BoxSite.x,BoxSite.y);
        }
    }

    //内部依赖：销毁物品框板
    DestroyBoxBoard(){
        this.RecycleItemBoxList(this.ItemBoxList);
        this.ItemBoxList=[];
    }

    //内部依赖：同步角色框列表
    syncItemBoxList(ItemInfoList){
        for(let i=0;i<this.ItemBoxList.length;i++){
            let ItemBox=this.ItemBoxList[i];
            let ItemInfo=ItemInfoList[i];
            ItemBox.syncName(ItemInfo.name);
            ItemBox.syncNum(ItemInfo.count);
            //对每一个格子设置回调，调用回调，唤起角色弹窗，传入点击角色id
            ItemBox.setBoxCallBack(ItemInfo.id,(ItemID)=>{
                this.ClickCallBack(ItemID);
            });
        }
    }


    //纯处理的意思不直接使用类内部的属性，而是根据参数进行处理
    //纯处理
    //创建角色视图列表
    MakeItemBoxList(BoxNum:number){
        let ItemBoxList=[];
        for(let i=0;i<BoxNum;i++){
            let ItemBox=this.ItemBoxFactory.getItemBoxView(this.ParentNode);
            ItemBoxList.push(ItemBox);
        }
        return ItemBoxList;
    }


    //纯处理：回收角色框列表
    RecycleItemBoxList(ItemBoxList){
        for(let i=0;i<ItemBoxList.length;i++){
            let ItemBox=ItemBoxList[i];
            this.ItemBoxFactory.recycle(ItemBox);
            // ItemBox.Recycle();
        }
    }

    //纯处理
    //创建角色格子的位置列表
    MakeBoxSiteList(BoxNum:number){
        let BoxSiteList=[];
        let level=0;//排列层级
        for(let i=0;i<BoxNum;i++){
            if(i%5==0){//每3个为一层
                level++;
            }
            let BoxSite={
                x:(i%5)*100,
                y:(level-1)*-100,
            }
            BoxSiteList.push(BoxSite);
            this.ItemBoxTotalLength=100*level+700;
        }
        return BoxSiteList;
    }
}