

import {Node} from "cc";
import { GachaPop } from "./Common/GachaPop";

export class GachaPopManager{


    private GachaPopJob=null;


    constructor(GachaPopNode:Node){
        this.GachaPopJob=GachaPopNode.getComponent(GachaPop);
    }

    //显示抽卡弹窗
    ShowGachaPop(){
        this.GachaPopJob.ShowPop();
    }

}