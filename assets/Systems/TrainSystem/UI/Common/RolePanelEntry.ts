import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

import { wrapText} from '../../Infrastructure';

import { TrainApplication } from '../../Application/TrainApplication';

// import { RoleRow } from '../../../GlobalService';

@ccclass('RolePanelEntry')
export class RolePanelEntry extends Component {

    // @property(Node)
    // Info:Node;
    @property(Node)
    RolePanelNode:Node;

    @property(Node)
    CloseButton:Node;

    @property(Node)
    NameLabel:Node;

    @property(Node)
    LevelLabel:Node;

    @property(Node)
    ExpLabel:Node;

    @property(Node)
    InfoLabel:Node;

    showRolePanel(){
        this.RolePanelNode.active=true;
    }

    syncRoleInfo(RoleName:string,RoleLevel:number,RoleExp:number){
            let wrapT=wrapText(`姓名:${RoleName},等级:${RoleLevel},经验:${RoleExp}`,10);
            // this.InfoLabel.getComponent(Label).string=wrapT;
            this.setName(RoleName);
            this.setLevel(RoleLevel);
            this.setExp(RoleExp);
    }

    //单独设置组件
    setName(RoleName:string){
        this.NameLabel.getComponent(Label).string=RoleName;
    }
    setLevel(RoleLevel:number){
        this.LevelLabel.getComponent(Label).string=`等级: ${RoleLevel}`;
    }
    setExp(RoleExp:number){
        this.ExpLabel.getComponent(Label).string=`经验: ${RoleExp}`;
    }
    setInfo(RoleInfo:string){
        this.InfoLabel.getComponent(Label).string=RoleInfo;
    }
    
    ClosePanel(){
        this.RolePanelNode.active=false;
    }

    addListener(){
        this.CloseButton.on(Node.EventType.TOUCH_END,this.clickCloseButton,this);
    }

    clickCloseButton(){
        this.ClosePanel();
    }

    start() {
        //开始是隐藏的
        this.ClosePanel();
        this.addListener();
    }

    update(deltaTime: number) {
        
    }
}


