import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Prefab} from 'cc';

import { FormationRoleViewFactory } from '../../Infrastructure';
import { FormationBoxViewFactory } from '../../Infrastructure';



@ccclass('FormationPop')
export class FormationPop extends Component {


    @property(Node)
    ActiveNode:Node;

    @property(Node)
    ContentParentNode:Node;

    @property(Prefab)
    FormationRolePrefab:Prefab;

    @property(Prefab)
    FormationBoxPrefab:Prefab;

    @property(Node)
    CloseButton:Node;

    FormationRoleViewFactory:FormationRoleViewFactory;
    FormationBoxViewFactory:FormationBoxViewFactory;

    FormationBaseCells;
    FormationRoleCells=[];

    EventBus;

    start(){
        this.close();
        this.initFactory();
        // this.createFormationBoard();
        this.syncBaseCellsInfo();

        this.CloseButton.on(Node.EventType.TOUCH_END,this.close,this);
    }

    close(){
        this.ActiveNode.active=false;
    }

    open(){
        this.ActiveNode.active=true;
    }

    clickCB(id){
        console.log(`FOrmationPop: clickCB${id}`);
        if(this.EventBus!=null){
            this.EventBus({type:"FormationPopClick",data:{id:id}});
        }
    }

    initEventBus(EventBus){
        this.EventBus=EventBus;
    }


    initFactory(){
        // this.FormationRoleViewFactory=new FormationRoleViewFactory(this.FormationRolePrefab);
        this.FormationBoxViewFactory=new FormationBoxViewFactory(this.FormationBoxPrefab);
        this.FormationRoleViewFactory=new FormationRoleViewFactory(this.FormationRolePrefab);
    }


    syncRoleCellsInfo(FormationInfo){
        let num=FormationInfo.length;
        this.recycleRoleCellView();
        this.FormationRoleCells=this.buildRoleCellsView(num);
        let siteList=this.buildSiteList();
        for (let i=0;i<num;i++){
            let fmOne=FormationInfo[i];
            let RoleCellView=this.FormationRoleCells[i];
            let fmID=fmOne.id;
            let fmSite={x:fmOne.site.x,y:fmOne.site.y};
            //棋盘右侧是右下为正，左侧以右侧y轴为镜像
            let newI=3+fmSite.x+(fmSite.y-1)*3;
            RoleCellView.setPosition(siteList[newI][0],siteList[newI][1]);
            RoleCellView.setName(fmID.toString());
            // RoleCellView.setPosition(siteList[i][0],siteList[i][1]);
        }
    }

    syncBaseCellsInfo(){
        this.FormationBaseCells=this.buildBaseCellsView();
        let siteList=this.buildSiteList();
        for (let i=0;i<9;i++){
            let BaseCellView=this.FormationBaseCells[i];
            BaseCellView.setPosition(siteList[i][0],siteList[i][1]);
            BaseCellView.initInfo(i.toString(),this.clickCB.bind(this));
        }
    }


    buildRoleCellsView(num:number){
        let RoleCellViewList=[];
        for (let i=0;i<num;i++){
            let RoleCellView=this.FormationRoleViewFactory.getView(this.ContentParentNode);
            RoleCellViewList.push(RoleCellView);
        }
        return RoleCellViewList;
    }

    recycleRoleCellView(){
        let CellViewList=this.FormationRoleCells;
        for (let i=0;i<CellViewList.length;i++){
            let CellView=CellViewList[i];
            this.FormationRoleViewFactory.recycle(CellView);
        }
        this.FormationRoleCells=[];
    }


    buildBaseCellsView(){
        let BaseCellViewList=[];
        for (let i=0;i<9;i++){
            let BaseCellView=this.FormationBoxViewFactory.getView(this.ContentParentNode);
            BaseCellViewList.push(BaseCellView);
        }
        return BaseCellViewList;
    }


    buildSiteList(){
        let BoxLength=70;
        let Space=10;
        let siteList=[];

        let x,y=0;
        let level=-1;
        for (let i=0;i<9;i++){
            if(i%3==0){
                level+=1;
            }
            x=(i-level*3)*(BoxLength+Space)-70;
            y=level*-(BoxLength+Space);
            let site=[x,y];
            // this.BoxSiteList.right.push(site)
            siteList.push(site);
        }
        return siteList;
    }

    createViewList(){

    }

    // clickCB(){

    // }


    update(deltaTime: number) {
        
    }
}


