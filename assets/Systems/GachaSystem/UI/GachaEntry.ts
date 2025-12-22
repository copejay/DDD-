import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// import { GachaPopManager } from './GachaPopManager';
import {GachaBoard} from './Assistant/GachaBoard';
import { GachaResultPop } from './Assistant/GachaResultPop';

import { GachaApplication } from '../Application/GachaApplication';

@ccclass('GachaEntry')
export class GachaEntry extends Component {


    @property(Node)
    GachaPopNode:Node;
    @property(Node)
    GachaResultPopNode:Node;

    // @property(Node)
    // CloseButton:Node;

    //自己的入口
    @property(Node)
    GachaEntryButton:Node;


    // private GachaPopManager:GachaPopManager=null;
    private GachaApp:GachaApplication=null;

    private GachaPop:GachaBoard=null;
    private GachaResultPop:GachaResultPop=null;



    LoadComponent(){
        this.GachaPop=this.GachaPopNode.getComponent(GachaBoard);
        this.GachaResultPop=this.GachaResultPopNode.getComponent(GachaResultPop);
        this.GachaPop.initClickGachaButtonCallBack(this.ClickGachaButton.bind(this));

        this.GachaApp=GachaApplication.instance;
        this.GachaApp.initEntryUI(this);
        // this.GacfhaAppf.initGachaPopUI(this.GachaPop);
    }

    Listen(){
        this.GachaEntryButton.on(Node.EventType.TOUCH_END,this.ClickGachaEntryButton,this);
    }

    start() {
        this.Listen();
        this.LoadComponent();
    }

    
    //和App进行通信
    ClickGachaEntryButton(){
        // this.GachaPopManager.ShowGachaPop();
        this.GachaApp.ClickGachaEntryButton();
    }
    ClickGachaButton(){
        this.GachaApp.ClickGachaButton()
    }


    //提供调用方法
    openGachaPop(){
        this.GachaPop.ShowPop();
    }

    openGachaResultPop(){
        this.GachaResultPop.ShowPop();
    }

    update(deltaTime: number) {
        
    }
}


