import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { Sprite, SpriteFrame } from 'cc';

@ccclass('HitEffectView')
export class HitEffectView extends Component {

    // @property(Sprite)
    // sprite:Sprite=null;

    @property([Node])
    SpriteNodeList:Node[]=[];

    EffectMap={"火球":0,"飞剑":1,"水球":2}

    // private frameMap = new Map<string, SpriteFrame>();

    // @property(SpriteFrame)
    // rightFireball:SpriteFrame=null;

    // @property(SpriteFrame)
    // leftFireball:SpriteFrame=null;
    // onLoad() {
    //     for (const f of this.frames) {
    //         this.frameMap.set(f.name, f);
    //     }
    // }

    closeAll(){
        for (const n of this.SpriteNodeList) {
            n.active=false;
        }
    }

    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }



    setEffect(effectName:string,effectType:"right"|"left"){
        let index=this.EffectMap[effectName];
        if(index!=undefined){
            this.SpriteNodeList[index].active=true;
        }else{
            index=0;
            this.SpriteNodeList[0].active=true;
        }
        if(effectType=="left"){
            this.SpriteNodeList[index].setScale(1,1);
        }else{
            this.SpriteNodeList[index].setScale(-1,1);
        }
    }

    // getFrame(name: string) {
    //     return this.frameMap.get(name);
    // }


    start() {
        this.closeAll();
    }

    update(deltaTime: number) {
        
    }
}


