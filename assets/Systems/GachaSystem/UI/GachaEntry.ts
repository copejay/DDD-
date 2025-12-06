import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { GachaPopManager } from './GachaPopManager';

@ccclass('GachaEntry')
export class GachaEntry extends Component {


    @property(Node)
    GachaPopNode:Node;

    @property(Node)
    GachaResultPopNode:Node;

    // @property(Node)
    // CloseButton:Node;

    @property(Node)
    GachaEntryButton:Node;


    private GachaPopManager:GachaPopManager=null;


    start() {
        this.GachaEntryButton.on(Node.EventType.TOUCH_END,this.ClickGachaEntryButton,this);
        //初始化子管理器
        this.GachaPopManager=new GachaPopManager(this.GachaPopNode);

    }

    
    //点击抽卡入口
    ClickGachaEntryButton(){
        this.GachaPopManager.ShowGachaPop();
    }

    update(deltaTime: number) {
        
    }
}


