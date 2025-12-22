import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { ItemPopEntry } from './Assistant/ItemPopEntry';
import { WeaponPopEntry } from './Assistant/WeaponPopEntry';

@ccclass('ChildBagPop')
export class ChildBagPop extends Component {

    @property({type:Node,tooltip:"物品弹窗"})
    ItemPopNode:Node=null;

    @property({type:Node,tooltip:"武器弹窗"})
    WeaponPopNode:Node=null;

    ItemPopEntry:ItemPopEntry;
    WeaponPopEntry:WeaponPopEntry;

    BagApp;

    Loading(BagApp){
        this.ItemPopEntry=this.ItemPopNode.getComponent(ItemPopEntry);
        this.WeaponPopEntry=this.WeaponPopNode.getComponent(WeaponPopEntry);
        this.BagApp=BagApp;
    }

    openItemPop(StackItem){
        this.ItemPopEntry.open();
        this.ItemPopEntry.syncInfo(StackItem);

    }

    openWeaponPop(Weapon){
        this.WeaponPopEntry.open();
        this.WeaponPopEntry.syncInfo(Weapon);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


