


export class FloatingText{

    x:number;
    y:number;

    text:string="浮动提示";

    type:"damage"|"skill";

    moveSpeed:number=60;

    playTime:number=1;

    waitTime:number=0.2;

    disPlay:boolean=false;

    private _resolve:(()=>void) | null = null;
    finished:Promise<void>;

    constructor(x:number,y:number,text:string,type:"damage"|"skill"){
        this.x=x;
        this.y=y;
        this.text=text;
        this.type=type;

        if(type=="skill"){
            this.setSkillType();
            this.finished=new Promise(res=>{
                this._resolve=res;
            });
        }
    }

    setSkillType(){
        this.moveSpeed=130;
        this.playTime=0.4;
        this.waitTime=0.2;
        this.y+=20;
    }

    onFinish() {
        // console.log(`HitEffect: 特效播放完成！`);
        // this.x = this.targetX;
        // this.y = this.targetY;
        // this.disPlay = true;
        this._resolve?.();
    }

    move(dt:number){
        if(this.playTime<=this.waitTime){
            return;
        }
        this.y+=this.moveSpeed*dt;
    }

    update(dt:number){
        this.move(dt);
        this.playTime-=dt;
        if(this.playTime<=0){
            this.disPlay=true;
            this.onFinish();
        }
    }




}