
import { PoolManager } from "../../../GlobalService";

import {Node,Prefab} from 'cc';

import { FloatingTextView } from "../View/FloatingTextView";

export class FloatingTextFactory{

    private poolManager:PoolManager;
    private FloatingTextPrefab:Prefab;

    constructor(FloatingTextPrefab:Prefab){
        this.FloatingTextPrefab=FloatingTextPrefab;
        this.poolManager=PoolManager.instance;
    }

    get(parentNode:Node){
        let floatingTextNode=this.poolManager.get(this.FloatingTextPrefab,parentNode);
        let floatingTextView=floatingTextNode.getComponent(FloatingTextView);

        return floatingTextView;
    }
    

    recycle(floatingTextView:FloatingTextView){
        this.poolManager.put(floatingTextView.node);
    }

}