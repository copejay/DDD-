
import {Node} from "cc"
import { SoldierView } from "../View/SoldierView";

export class SoldierViewFactory{

    constructor(
        private SoldierNode:Node,
    ){

    }

    get(){
        const view = this.SoldierNode.getComponent(SoldierView);
        return view;
    }
}