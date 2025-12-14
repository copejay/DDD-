
import {Time} from '../Domain/Time';


export class TimeApp{

    private static _instance:TimeApp;

    public static get instance(){
        if(!this._instance){
            this._instance=new TimeApp();
        }
        return this._instance;
    }
    
    private TimeUI;

    private TimeUILoadOver:boolean=false;

    private Time:Time=new Time();

    initTimeUI(timeUI){
        this.TimeUI=timeUI;
        this.initTimeData();
        this.TimeUILoadOver=true;
    }

    initTimeData(){
        this.Time.initTimeData(1024,11,1);
    }

    updateTime(dt:number){
        this.Time.update(dt);
        if(this.Time.needReset==true){
            this.Time.needReset=false;
            this.TimeUI.setTimeString(this.Time.export().GameYear+"年"+this.Time.export().GameMonth+"月"+this.Time.export().GameDay+"日");
        }
    }


    update(dt){
        if(this.TimeUILoadOver==true){
            this.updateTime(dt);
        }
        // this.Time.update(dt);
        // if(this.Time.needReset==true){
        //     this.Time.needReset=false;
        //     this.TimeUI.setTimeString(this.Time.export().GameYear+"年"+this.Time.export().GameMonth+"月"+this.Time.export().GameDay+"日");
        // }
    }

}