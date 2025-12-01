import { _decorator, Component, Node ,Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlaneView')
export class PlaneView extends Component {
    
    
    sync(x:number,y:number){
        this.node.setPosition(new Vec3(x, y));
    }

    ShootSite(){
        const shoutNode=this.node.getChildByName("ShoutNode");
        const x=shoutNode.position.x;
        const y=shoutNode.position.y;
        // console.log("PlaneView:射击站点",x,y);
        return {"x":x,"y":y}
    }

}


