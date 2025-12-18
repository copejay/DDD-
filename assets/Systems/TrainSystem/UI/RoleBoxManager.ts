
import { RoleBoxViewFactory } from '../Infrastructure';

import { Prefab ,Node} from 'cc';

export class RoleBoxManager{

    private BoxFactory:RoleBoxViewFactory;
    private ParentNode:Node;

    private BoxList;

    BoxTotalLength:number=0;

    //孙格子-通信回调
    ClickCallBack:(ShopItemID:string)=>void=null;

    //初始注入，拿到需要的组件
    constructor(Prefab:Prefab,ParentNode:Node,ClickCallBack:(ShopItemID:string)=>void){
        this.BoxFactory=new RoleBoxViewFactory(Prefab);
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
    syncBoxList(InfoList){
        for(let i=0;i<this.BoxList.length;i++){
            let Box=this.BoxList[i];
            let Info=InfoList[i];

            Box.syncName(Info.name);
            Box.syncLevel(Info.level);
            //对每一个格子设置回调，调用回调，唤起角色弹窗，传入点击角色id
            Box.setBoxInfo(Info.id,(ID)=>{
                this.ClickCallBack(ID);
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
    // MakeBoxSiteList(BoxNum:number){
    //     let BoxSiteList=[];
    //     let level=0;//排列层级
    //     for(let i=0;i<BoxNum;i++){
    //         if(i%3==0){//每3个为一层
    //             level++;
    //         }
    //         let BoxSite={
    //             x:(i%3)*250+70,
    //             y:(level-1)*-150,
    //         }
    //         BoxSiteList.push(BoxSite);
    //         this.BoxTotalLength=150*level+100;
    //     }
    //     return BoxSiteList;
    // }
    MakeBoxSiteList(BoxNum:number){
        let BoxSiteList=[];
        let level=0;//排列层级
        for(let i=0;i<BoxNum;i++){
            if(i%3==0){//每3个为一层
                level++;
            }
            let BoxSite={
                x:(i%3)*170,
                y:(level-1)*-150,
            }
            BoxSiteList.push(BoxSite);
            this.BoxTotalLength=150*level+700;
        }
        return BoxSiteList;
    }
}