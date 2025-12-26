


export class HitEffect{

    x:number;
    y:number;

    targetX:number;
    targetY:number;

    EffectType:"right"|"left";
    EffectName:string="命中特效";

    moveSpeed:number=100;

    playTime:number;

    // waitTime:number=0;

    disPlay:boolean=false;

    sx: number;
    sy: number;
    elapsed = 0;

    private _resolve:(()=>void) | null = null;
    finished:Promise<void>;


    constructor(startSite:{x:number,y:number},targetSite:{x:number,y:number},playTime:number,effectName:string,effectType:"right"|"left"){
        console.log(`HitEffect: 特效被创建！`);
        this.x=startSite.x;
        this.y=startSite.y;
        this.EffectName=effectName;
        this.EffectType=effectType;
        
        this.sx=startSite.x;
        this.sy=startSite.y;

        this.targetX=targetSite.x;
        this.targetY=targetSite.y;
        this.playTime=playTime;

        this.finished=new Promise(res=>{
            this._resolve=res;
        });
    }

    // move(dt:number){
    //     if(this.playTime<=this.waitTime){
    //         return;
    //     }
    //     this.x+=this.moveSpeed*dt;
    // }
    move(dt: number) {
        this.elapsed += dt;

        const t = Math.min(this.elapsed / this.playTime, 1);

        this.x = this.sx + (this.targetX - this.sx) * t;
        this.y = this.sy + (this.targetY - this.sy) * t;


        if (t >= 1) {
            this.onFinish();
        }
    }

    onFinish() {
        console.log(`HitEffect: 特效播放完成！`);
        this.x = this.targetX;
        this.y = this.targetY;
        this.disPlay = true;
        this._resolve?.();
    }

    // end(){
    //     this._resolve?.();
    // }

    update(dt:number){
        this.move(dt);
        // this.playTime-=dt;
        // if(this.playTime<=0){
        //     this.disPlay=true;
        //     this.end();
        // }
    }




}