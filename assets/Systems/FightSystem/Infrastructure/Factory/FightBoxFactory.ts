
import { PoolManager } from "../../../GlobalService";
import {Node,Prefab} from 'cc';
import { FightBoxView } from "../View/FightBoxView";



export class FightBoxFactory{


    private poolManager:PoolManager;
    private FightBoxViewPrefab:Prefab;


    constructor(FightBoxViewPrefab:Prefab){
        this.FightBoxViewPrefab=FightBoxViewPrefab;
        this.poolManager=PoolManager.instance;
    }

    get(parentNode:Node){
        let fightRoleViewNode=this.poolManager.get(this.FightBoxViewPrefab,parentNode);
        let fightRoleView=fightRoleViewNode.getComponent(FightBoxView);

        return fightRoleView;
    }

    recycle(fightBoxView:FightBoxView){
        this.poolManager.put(fightBoxView.node);
    }
}