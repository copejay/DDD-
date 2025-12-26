import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label,ProgressBar} from 'cc';

// interface RoleType:"修真者"|"骑士";

@ccclass('FightRoleView')
export class FightRoleView extends Component {


    @property(Node)
    NameNode:Node;

    @property(Node)
    LevelNode:Node;

    @property(Node)
    TitleNode:Node;

    @property(Node)
    HpBarNode:Node;

    @property(Node)
    MpBarNode:Node;

    @property([Node])
    RoleImgNodeList:Node[]=[];

    ImgMap={"修真者":0,"骑士":1};

    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    syncHpBar(hp:number,maxHp:number){
        let HpBar=this.HpBarNode.getComponent(ProgressBar);
        HpBar.progress=hp/maxHp;
    }

    setName(name:string){
        this.NameNode.getComponent(Label).string=name;
    }

    setLevel(level:number){
        this.LevelNode.getComponent(Label).string="等级: "+level.toString();
    }

    setTitle(title:string){
        this.TitleNode.getComponent(Label).string=title;
    }

    syncVisual(type,side){
        this.closeAllImg();
        let imgIndex=this.ImgMap[type];
        if(imgIndex==undefined){
            imgIndex=0;
        }
        if(side=="right"){
            this.RoleImgNodeList[imgIndex].setScale(1,1);
        }else{
            this.RoleImgNodeList[imgIndex].setScale(-1,1);
        }
        this.RoleImgNodeList[imgIndex].active=true;
    }

    closeAllImg(){
        for (const n of this.RoleImgNodeList) {
            n.active=false;
        }
    }

    start() {
        // this.closeAllImg();
    }

    update(deltaTime: number) {
        
    }
}


