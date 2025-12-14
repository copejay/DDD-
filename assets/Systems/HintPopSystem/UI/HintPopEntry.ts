import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Prefab } from 'cc';


import { HintPopApp } from '../Application/HintPopApp';

@ccclass('HintPopEntry')
export class HintPopEntry extends Component {

    @property({type:Prefab,tooltip:"提示弹窗预制体"})
    HintPopPrefab:Prefab;

    @property({type:Node,tooltip:"提示弹窗父节点"})
    HintPopParentNode:Node;

    HintPopApp:HintPopApp;


    start() {
        this.HintPopApp=HintPopApp.instance;
        this.HintPopApp.initHintPopParent(this.HintPopParentNode);
        this.HintPopApp.initPrefab(this.HintPopPrefab);

    }

    update(deltaTime: number) {
        this.HintPopApp.update(deltaTime);
    }
}


