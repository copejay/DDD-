import { _decorator, Component, Node,ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HpBarView')
export class HpBarView extends Component {

    private bar:ProgressBar;

    onLoad(){
        this.bar=this.node.getComponent(ProgressBar);
    }

    sync(current:number,max:number){
        this.bar.progress=current/max;
    }

}


