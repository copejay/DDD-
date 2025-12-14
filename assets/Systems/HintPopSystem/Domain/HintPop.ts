


export class HintPop{

    x:number;
    y:number;
    speed:number=200;

    HintLabel:string;

    HintTime:number=0.5;

    DiaPlay:boolean=false;

    constructor(x:number,y:number,HintLabel:string){
        this.x=x;
        this.y=y;
        this.HintLabel=HintLabel;
    }

    update(deltaTime: number){
        this.HintTime-=deltaTime;
        this.y+=this.speed*deltaTime;
        if(this.HintTime<=0){
            this.DiaPlay=true;
        }
    }

}