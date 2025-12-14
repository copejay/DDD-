
import { FloatingText } from "./FloatingText";

export class FightRole{

    //不变量
    beginX:number;
    beginY:number;
    name:string="霹雳火";
    level:number=10;
    actionTime:number=0;
    skillCallOutTime:number=0.3;
    moveTime:number=0.5;

    maxHp:number=100;
    maxMp:number=100;
    baseSpeed:number=100;
    baseAtk:number=15;
    baseDef:number=10;

    skillName:string="雷霆半月斩";

    //变量

    startX:number=0;
    startY:number=0;
    moveElapsed:number=0;

    x:number;
    y:number;

    needMove:boolean=false;
    targetX:number;
    targetY:number;

    scaleMultiplier:number=1;

    Hp:number=100;
    Mp:number=100;
    Speed:number=100;
    Atk:number=15;
    Def:number=10;

    skillPlay:boolean=false;
    died:boolean=false;

    FloatingTextList:Array<FloatingText>=[];

    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
        //存储初始位置
        this.beginX=x;
        this.beginY=y;
    }

    attack(){

    }

    onHit(){

    }

    playDamageFloat(){

    }

    playSkillFloat(){
        let floatingText=new FloatingText(this.x,this.y,this.skillName);
        this.FloatingTextList.push(floatingText);
    }

    FloatingTextUpdate(dt:number){
        for(let i=0;i<this.FloatingTextList.length;i++){
            let floatingText=this.FloatingTextList[i];
            floatingText.update(dt);
            if(floatingText.disPlay==true){
                this.FloatingTextList.splice(i,1);
                i--;
            }
        }
    }

    attackMove(x:number,y:number){
        console.log("attackMove调用");
        this.moveTo(x,y);

        setTimeout(()=>{
            console.log(`FightROle:回调触发`);
            this.moveBack();
        },500);
    }

    moveTo(targetX:number,targetY:number){
        this.targetX=targetX;
        this.targetY=targetY;

        this.startX=this.x;
        this.startY=this.y;

        this.needMove=true;
    }

    moveBack(){
        this.moveTo(this.beginX,this.beginY);
    }

    move(dt: number) {
        if (!this.needMove) return;

        // 累积时间
        this.moveElapsed += dt;

        // 计算 t = 当前进度（0 → 1）
        let t = this.moveElapsed / this.moveTime;
        if (t >= 1) t = 1;

        // 线性插值匀速移动
        this.x = this.startX + (this.targetX - this.startX) * t;
        this.y = this.startY + (this.targetY - this.startY) * t;

        // 完成
        if (t >= 1) {
            this.moveElapsed=0;
            this.needMove = false;
        }
    }


    update(dt:number){
        this.FloatingTextUpdate(dt);
        if(this.needMove==true){
            this.move(dt);
        }
    }

}