
import { ShopItemViewFactory } from '../../Infrastructure';

import { Prefab ,Node} from 'cc';

export class ShopBoxManager{

    private BoxFactory:ShopItemViewFactory;
    private ParentNode:Node;

    private BoxList;

    BoxTotalLength:number=0;

    //孙格子-通信回调
    ClickCallBack:(ShopItemID:string,Cell)=>void=null;

    //初始注入，拿到需要的组件
    constructor(BoxViewPrefab:Prefab,ParentNode:Node,ClickCallBack:(ShopItemID:string,Cell)=>void){
        this.BoxFactory=new ShopItemViewFactory(BoxViewPrefab);
        this.ParentNode=ParentNode;
        this.ClickCallBack=ClickCallBack;
    }

    //创建板子
    CreateBoxBoard(ShopItemInfoList){
        this.CreateShopBoxBoard(ShopItemInfoList.length);
        this.syncBoxList(ShopItemInfoList);
    }

    //创建视图板子
    CreateShopBoxBoard(BoxNum:number){
        this.BoxList=this.MakeBoxList(BoxNum);
        const BoxSiteList=this.MakeBoxSiteList(BoxNum);
        for(let i=0;i<this.BoxList.length;i++){
            let Box=this.BoxList[i];
            let BoxSite=BoxSiteList[i];
            Box.setPosition(BoxSite.x,BoxSite.y);
        }
    }
    //视图板子同步信息
    syncBoxList(ShopItemInfoList){
        for(let i=0;i<this.BoxList.length;i++){
            let Box=this.BoxList[i];
            let ShopItemInfo=ShopItemInfoList[i];

            Box.syncName(ShopItemInfo.id);
            Box.syncPrice(ShopItemInfo.price);
            //对每一个格子设置回调，调用回调，唤起角色弹窗，传入点击角色id
            Box.setBoxInfo(ShopItemInfo.id,(ShopItemID,Cell)=>{
                this.ClickCallBack(ShopItemID,Cell);
            });
        }
    }



    //销毁角色框板
    DestroyBoxBoard(){
        this.RecycleBoxList(this.BoxList);
        this.BoxList=[];
    }
    //创建视图列表
    MakeBoxList(BoxNum:number){
        let BoxList=[];
        for(let i=0;i<BoxNum;i++){
            let Box=this.BoxFactory.getView(this.ParentNode);
            BoxList.push(Box);
        }
        return BoxList;
    }
    //调用工厂进行回收
    RecycleBoxList(BoxList:[]){
        for(let i=0;i<BoxList.length;i++){
            let Box=BoxList[i];
            this.BoxFactory.recycle(Box);
        }
    }
    //创建位置列表
    MakeBoxSiteList(BoxNum:number){
        let BoxSiteList=[];
        let level=0;//排列层级
        for(let i=0;i<BoxNum;i++){
            if(i%2==0){//每2个为一层
                level++;
            }
            let BoxSite={
                x:(i%2)*260+90,
                y:(level-1)*-110,
            }
            BoxSiteList.push(BoxSite);
            this.BoxTotalLength=150*level+100;
        }
        return BoxSiteList;
    }
}