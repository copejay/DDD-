
import { PoolManager } from "../../../GlobalService";
import { Node,Prefab } from "cc";

import { HintPopView } from "../View/HintPopView";

export class HintPopFactory{


    private PoolManager:PoolManager;
    private HintPopViewPrefab:Prefab;

    constructor(HintPopViewPrefab:Prefab){
        this.HintPopViewPrefab=HintPopViewPrefab;
        this.PoolManager=PoolManager.instance;
    }

    get(ParentNode:Node){
        let HintPopViewNode=this.PoolManager.get(this.HintPopViewPrefab,ParentNode);
        let myHintPopView=HintPopViewNode.getComponent(HintPopView);
        return myHintPopView;
    }

    recycle(HintPopView:HintPopView){
        this.PoolManager.put(HintPopView.node);
    }


}