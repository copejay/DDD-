
import {_decorator, Component,Label} from 'cc';

const {ccclass, property}= _decorator;

@ccclass('ScoreLabelView')
export class ScoreLabelView extends Component{

    @property(Label)
    public label: Label=null;

    sync(score: number){
        this.label.string="Score:"+score;
    }
}