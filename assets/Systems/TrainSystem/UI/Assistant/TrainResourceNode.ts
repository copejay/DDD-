import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Prefab} from 'cc';

@ccclass('TrainResourceNode')
export class TrainResourceNode extends Component {

    @property({type:Node,tooltip:"角色box父节点"})
    RoleBoxBoardParentNode:Node=null;

    @property({type:Prefab,tooltip:"角色box预制体"})
    RoleBoxBoardPrefab:Prefab=null;

    //这个节点需要用来调节大小，才能适应内容的滑动要求
    @property({type:Node,tooltip:"内容节点"})
    ContentNode:Node=null;
    
    getBoxParentNode(){
        return this.RoleBoxBoardParentNode;
    }

    getBoxPrefab(){
        return this.RoleBoxBoardPrefab;
    }

    getContentNode(){
        return this.ContentNode;
    }


    start() {

    }

    update(deltaTime: number) {
        
    }
}
