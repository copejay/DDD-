import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
const { ccclass, property } = _decorator;

import { GachaResultPop } from './GachaResultPop';

import { GachaApplication } from '../../Application/GachaApplication';

@ccclass('GachaPop')
export class GachaPop extends Component {


    @property(Node)
    CloseButton:Node;

    @property(Node)
    GachaButton:Node;

    @property(Node)
    GachaResultNode:Node;

    // @property(Node)
    // ErrorPopNode:Node;

    private GachaApplication;

    private GachaResultJob:GachaResultPop=null;

    // private ErrorPopJob;


    start(){
        this.GachaApplication=GachaApplication.instance;

        this.GachaApplication.initGachaPopUI(this);

        this.GachaResultJob=this.GachaResultNode.getComponent(GachaResultPop);

        this.HidePop();
        this.CloseButton.on(Node.EventType.TOUCH_END,this.HidePop,this);

        this.GachaButton.on(Node.EventType.TOUCH_END,this.ClickGachaButton,this);
    }


    //显示抽奖结果弹窗
    showGachaResultPop(){
        this.GachaResultJob.ShowPop();
    }

    //这种简单弹窗，打算单独弄一个可复用的全系统级别弹窗
    //显示金币不足弹窗
    // showErrorPop(){
    //     this.ErrorPopJob.ShowPop();
    // }


    ClickGachaButton(){
        console.log("ClickGachaButton");
        this.GachaApplication.GachaOne();
        // this.showGachaResultPop();
    }


    //开启与关闭弹窗
    ShowPop(){
        this.node.active=true;
    }
    HidePop(){
        this.node.active=false;
    }


    update(deltaTime: number) {
        
    }
}


