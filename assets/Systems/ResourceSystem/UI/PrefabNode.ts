import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// import { GoldBoardView } from '../Infrastructure';

import { SimpleBoard } from './Common/SimpleBoard';
@ccclass('PrefabNode')
export class PrefabNode extends Component {


    @property(Node)
    GoldBoard:Node=null;

    @property(Node)
    FoodBoard:Node=null;



    getGoldBoardView(){
        return this.GoldBoard.getComponent(SimpleBoard);
    }

    getFoodBoardView(){
        return this.FoodBoard.getComponent(SimpleBoard);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


