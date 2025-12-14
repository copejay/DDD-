import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
const { ccclass, property } = _decorator;

import { TimeBoardView } from './View/TimeBoardView';

import { TimeApp } from '../Application/TimeApp';

@ccclass('TimeEntry')
export class TimeEntry extends Component {

    @property(Node)
    TimeBoard:Node=null;

    private TimeApp:TimeApp;

    private TimeBoardView:TimeBoardView=null;

    start() {
        this.TimeBoardView= this.TimeBoard.getComponent(TimeBoardView);

        this.TimeApp=TimeApp.instance;
        this.TimeApp.initTimeUI(this);
    }

    setTimeString(timeString:string){
        this.TimeBoardView.setTimeString(timeString);
    }

    update(deltaTime: number) {
        this.TimeApp.update(deltaTime);
    }
}


