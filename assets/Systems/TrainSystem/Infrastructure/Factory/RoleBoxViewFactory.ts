import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
const { ccclass, property } = _decorator;

import { PoolManager } from '../../../Infrastructure';
import { RoleBoxView } from "../View/RoleBoxView"

@ccclass('RoleBoxViewFactory')
export class RoleBoxViewFactory extends Component {


    @property(Prefab)
    RoleBoxViewPrefab:Prefab;

    PoolManager:PoolManager;

    start() {
        this.PoolManager=PoolManager.instance;
    }

    getRoleBoxView(ParentNode:Node){
        let RoleBoxViewNode=this.PoolManager.get(this.RoleBoxViewPrefab,ParentNode);
        let myRoleBoxView=RoleBoxViewNode.getComponent(RoleBoxView);
        return myRoleBoxView;
    }

    update(deltaTime: number) {
        
    }
}


