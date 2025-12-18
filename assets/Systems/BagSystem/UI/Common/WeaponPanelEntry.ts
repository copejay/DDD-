import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
const { ccclass, property } = _decorator;

import { WeaponRow } from '../../../GlobalService';

@ccclass('WeaponPanelEntry')
export class WeaponPanelEntry extends Component {


    @property(Node)
    WeaponPanelNode:Node;

    @property(Node)
    WeaponNameNode:Node;

    @property(Node)
    WeaponArchiveTimeNode:Node;

    @property(Node)
    WeaponInfoNode:Node;

    @property(Node)
    CloseButton:Node;


    close(){
        this.WeaponPanelNode.active=false;
    }

    open(){
        this.WeaponPanelNode.active=true;
    }


    syncInfo(WeaponInfo:WeaponRow){
        this.WeaponNameNode.getComponent(Label).string=WeaponInfo.name;
        this.WeaponArchiveTimeNode.getComponent(Label).string=WeaponInfo.archiveTime.toString();
        this.WeaponInfoNode.getComponent(Label).string=WeaponInfo.info;
    }



    start() {
        this.CloseButton.on(Node.EventType.TOUCH_END,this.close,this);
        this.close();
    }

    update(deltaTime: number) {
        
    }
}


