
import { Prefab, Node } from "cc";
import { PoolManager} from "../PoolManager";
import {BulletView} from "../View/BulletView"


export class BulletViewFactory{

    constructor(
        private bulletPrefab:Prefab,
        private parent:Node,
    ){

    }

    get(){
        // 创建 View 节点
        const node = PoolManager.instance.get(this.bulletPrefab, this.parent);
        const view = node.getComponent(BulletView);
        return view;
    }

     recycle(viewNode: BulletView) {
        PoolManager.instance.put(viewNode.node);
    }


}