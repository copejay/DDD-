import { _decorator, Component, Node ,Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletView')
export class BulletView extends Component {
    
    _entity;

    bind(entity){
        this._entity=entity;
    }

    sync(x:number,y:number){
        this.node.setPosition(new Vec3(x,y));
    }

    get entity(){
        return this._entity;
    }
}


