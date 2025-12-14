import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemPanelEntry')
export class ItemPanelEntry extends Component {


    @property(Node)
    ItemPanelNode;

    @property(Node)
    Name;

    @property(Node)
    Info;



    start() {
        this.ClosePanel();

    }

    ClosePanel(){
        this.ItemPanelNode.active=false;
    }

    update(deltaTime: number) {
        
    }
}


