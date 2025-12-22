import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Prefab} from 'cc';

import { FormationRoleViewFactory } from '../../Infrastructure/Factory/FormationRoleViewFactory';
import { FormationBoxViewFactory } from '../../Infrastructure/Factory/FormationBoxViewFactory';




@ccclass('FormationBoard')
export class FormationBoard extends Component {


    @property(Node)
    FormationParentNode:Node;

    @property(Node)
    FormationContentNode:Node;

    @property(Prefab)
    FormationRolePrefab:Prefab;

    @property(Prefab)
    FormationBoxPrefab:Prefab;

    FormationRoleViewFactory:FormationRoleViewFactory;
    FormationBoxViewFactory:FormationBoxViewFactory;

    FormationBoxList;

    start(){
        this.initFactory();
        this.createFormationBoard();
    }


    initFactory(){
        // this.FormationRoleViewFactory=new FormationRoleViewFactory(this.FormationRolePrefab);
        this.FormationBoxViewFactory=new FormationBoxViewFactory(this.FormationBoxPrefab);
    }


    createFormationBoard(){
        this.FormationBoxList=this.createBoxViewList();
        let siteList=this.createSiteList();
        for (let i=0;i<9;i++){
            let BoxView=this.FormationBoxList[i];
            BoxView.setPosition(siteList[i][0],siteList[i][1]);
        }
    }


    createBoxViewList(){
        let BoxViewList=[];
        for (let i=0;i<9;i++){
            let BoxView=this.FormationBoxViewFactory.getView(this.FormationContentNode);
            BoxViewList.push(BoxView);
        }
        return BoxViewList;
    }


    createSiteList(){
        let BoxLength=60;
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

    clickCB(){

    }


    update(deltaTime: number) {
        
    }
}


