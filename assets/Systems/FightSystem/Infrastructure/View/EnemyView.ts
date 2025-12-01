import { _decorator, Component, Node,Vec3,Collider2D } from 'cc';
const { ccclass, property } = _decorator;

import {HpBarView} from './HpBarView'
import { BulletView } from './BulletView';

import { CollisionDispatcher} from "../CollisionDispatcher"

@ccclass('EnemyView')
export class EnemyView extends Component {

    _entity;

    bind(entity){
        this._entity=entity;
    }

    sync(x:number,y:number){
        this.node.setPosition( new Vec3(x,y))
    }

    syncHp(current:number,max:number){
        const HpBar=this.node.getChildByName("HpBar");
        const hpBarView=HpBar.getComponent(HpBarView);
        hpBarView.sync(current,max);
    }

    onLoad(){
        const collider=this.getComponent(Collider2D);
        if(collider){
            collider.on('begin-contact',this._onCollisionEnter,this);
        }
        this.delayCollider();
    }

    delayCollider(){

        const collider=this.getComponent(Collider2D);
        collider.enabled=false;
        setTimeout(()=>{
            collider.enabled=true;
        },500);
    }

    private _onCollisionEnter(self:Collider2D,other:Collider2D){
        const otherView=other.getComponent(BulletView);
        const otherEntity=otherView?.entity;
        // console.log("EnemyView:碰到了东西");

        if(!this._entity || !otherEntity) return;

        CollisionDispatcher.onHit(this._entity,otherEntity);
    }
}


