


export class FloatingText{

    x:number;
    y:number;

    text:string="浮动提示";

    moveSpeed:number=100;

    playTime:number=1;

    disPlay:boolean=false;

    constructor(x:number,y:number,text:string){
        this.x=x;
        this.y=y;
        this.text=text;
    }

    move(dt:number){
        this.y+=this.moveSpeed*dt;
    }

    update(dt:number){
        this.move(dt);
        this.playTime-=dt;
        if(this.playTime<=0){
            this.disPlay=true;
        }
    }




}