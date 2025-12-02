
import { RoleBoxViewFactory } from '../Infrastructure';

import { Prefab ,Node} from 'cc';

export class RoleBoxManager{

    private RoleBoxFactory:RoleBoxViewFactory;
    private ParentNode:Node;

    private RoleBoxList;

    RoleBoxTotalLength:number=0;

    ClickCallBack:(RoleID:string)=>void=null;

    
    constructor(RoleBoxViewPrefab:Prefab,ParentNode:Node,ClickCallBack:(RoleID:string)=>void){
        this.RoleBoxFactory=new RoleBoxViewFactory(RoleBoxViewPrefab);
        this.ParentNode=ParentNode;
        this.ClickCallBack=ClickCallBack;
    }



    //创建角色框板
    CreateRoleBoxBoard(BoxNum:number){
        this.RoleBoxList=this.MakeRoleBoxList(BoxNum);
        const RoleBoxSiteList=this.MakeBoxSiteList(BoxNum);
        for(let i=0;i<this.RoleBoxList.length;i++){
            let RoleBox=this.RoleBoxList[i];
            let BoxSite=RoleBoxSiteList[i];
            RoleBox.setPosition(BoxSite.x,BoxSite.y);
            // console.log(`RoleBoxManager:创建第${i}个哈吉米`);
            RoleBox.setBoxInfo(`RoleBox${i}`,(RoleID:string)=>{
                console.log(`RoleBoxManager:点击了编号${RoleID}哈吉米`);
                this.ClickCallBack(RoleID);
            });
        }
    }


    //创建角色视图列表
    MakeRoleBoxList(BoxNum:number){
        let RoleBoxList=[];
        for(let i=0;i<BoxNum;i++){
            let RoleBox=this.RoleBoxFactory.getRoleBoxView(this.ParentNode);
            RoleBoxList.push(RoleBox);
        }
        return RoleBoxList;
    }


    RecycleRoleBoxList(RoleBoxList:[]){
        for(let i=0;i<RoleBoxList.length;i++){
            let RoleBox=this.RoleBoxList[i];
            this.RoleBoxFactory.recycle(RoleBox);
            // RoleBox.Recycle();
        }
    }


    //创建角色格子的位置列表
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
            this.RoleBoxTotalLength=150*level+300;
        }
        return BoxSiteList;
    }
}