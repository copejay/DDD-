



import { PoolManager } from "../../../GlobalService";
import {Node,Prefab} from 'cc';
import { FightRoleView } from "../View/FightRoleView";


export class FightRoleFactory{

    private poolManager:PoolManager;
    private FightRoleViewPrefab:Prefab;


    constructor(FightRoleViewPrefab:Prefab){
        this.FightRoleViewPrefab=FightRoleViewPrefab;
        this.poolManager=PoolManager.instance;
    }

    get(parentNode:Node){
        let fightRoleViewNode=this.poolManager.get(this.FightRoleViewPrefab,parentNode);
        let fightRoleView=fightRoleViewNode.getComponent(FightRoleView);

        return fightRoleView;
    }

    recycle(fightRoleView:FightRoleView){
        this.poolManager.put(fightRoleView.node);
    }

}