
import { FloatingText } from "./FloatingText";
import { HitEffect } from "./HitEffect";

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

    skillName:string="万剑决";

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
    HitEffectList:Array<HitEffect>=[];

    side:"left"|"right";
    classType;

    constructor(){
        // this.x=x;
        // this.y=y;
        // //存储初始位置
        // this.beginX=x;
        // this.beginY=y;
    }

    setSite(x:number,y:number){
        this.x=x;
        this.y=y;
        //存储初始位置
        this.beginX=x;
        this.beginY=y;
    }

    setSide(side:"left"|"right"){
        this.side=side;
    }

    setBaseInfo(name:string,level:number,classType:string){
        this.name=name;
        this.level=level;
        this.classType=classType;
    }

    setFightInfo(speed:number,atk:number,def:number,hp:number){
        this.Speed=speed;
        this.Atk=atk;
        this.Def=def;
        this.maxHp=hp;
        this.Hp=hp;
    }

    async Action(getDefenseList:(range:number)=>FightRole[]){
        await this.delay(500);
        let skillFloat=this.playSkillFloat();
        await skillFloat.finished;
        let defenseList=getDefenseList(1);
        await Promise.all(
            defenseList.map(defenseRole =>
                defenseRole.defense(this.attack())
            )
        );
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    attack(){
        return this.Atk;
    }

    async pushBack(){
        console.log(`FightRole: 后退函数执行`);
        let backLong=5;
        let sideMap={
            left:-1,
            right:1,
        }
        this.x+=backLong*sideMap[this.side];
        await this.delay(100);
        this.x=this.beginX;
    }

    async defense(atk:number){

        this.playHitEffect();
        await this.HitEffectList[this.HitEffectList.length-1].finished;

        await this.pushBack();

        let realAtk;
        if(atk<=this.Def){
            realAtk=1;
        }else{
            realAtk=atk-this.Def;
        }
        this.Hp-=realAtk;

        let displayAtk;
        if(realAtk>=10000){
            displayAtk = `${Math.floor(realAtk / 1000) / 10}w`;
        }else{
            displayAtk=realAtk;
        }
        console.log("FightRole");
        console.log(`${this.name}受到${realAtk}伤害，当前血量${this.Hp}`);
        this.playDamageFloat(`-${displayAtk}`);
        if(this.Hp<=0){
            this.died=true;
            console.log(`${this.name}死亡`);
        }
    }

    playHitEffect(){
        let sideMap={'right':-1,'left':1}
        let targetSite={
            x:this.x+20*sideMap[this.side],
            y:this.y+10,
        }
        // let sideMap={'right':-1,'left':1}
        let startSite={
            x:this.x+50*sideMap[this.side],
            y:this.y+10,
        }
        let hitEffect=new HitEffect(startSite,targetSite,0.3,"飞剑",this.side);
        this.HitEffectList.push(hitEffect);
    }
    // onHit(){

    // }

    playDamageFloat(string){
        let floatingText=new FloatingText(this.x,this.y,string,"damage");
        this.FloatingTextList.push(floatingText);
    }

    playSkillFloat(){
        let floatingText=new FloatingText(this.x,this.y,this.skillName,"skill");
        this.FloatingTextList.push(floatingText);
        return floatingText;
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

    HitEffectUpdate(dt:number){
        for(let i=this.HitEffectList.length-1;i>=0;i--){
            let hitEffect=this.HitEffectList[i];
            hitEffect.update(dt);
            if(hitEffect.disPlay==true){
                this.HitEffectList.splice(i,1);
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
        this.HitEffectUpdate(dt);
        this.FloatingTextUpdate(dt);
        if(this.needMove==true){
            this.move(dt);
        }
    }

}