import { Game } from "cc";




export class Time{

    GameYear:number=0;

    GameMonth:number=0;

    GameDay:number=0;

    private RealSecond:number=0;

    needReset:boolean=false;


    initTimeData(GameYear:number,GameMonth:number,GameDay:number){
        this.GameYear=GameYear;
        this.GameMonth=GameMonth;
        this.GameDay=GameDay;
    }

    export(){
        return {
            GameYear:this.GameYear,
            GameMonth:this.GameMonth,
            GameDay:this.GameDay,
        }
    }

    AddGameMonth(month:number){
        this.GameMonth+=month;
    }

    AddGameYear(year:number){
        this.GameYear+=year;
    }

    AddGameDay(day:number){
        this.GameDay+=day;
    }


    update(dt:number){
        this.RealSecond+=dt;
        if(this.RealSecond>=2){
            console.log(`Domain-Time:超过两秒`);
            this.RealSecond-=2;
            this.AddGameDay(1);
            this.needReset=true;
        }
        if(this.GameDay>=30){
            this.GameDay-=30;
            this.AddGameMonth(1);
        }
        if(this.GameMonth>=12){
            this.GameMonth-=12;
            this.AddGameYear(1);
        }
    }
}