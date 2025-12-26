
import {FightRoleManager} from "./B_FightRoleManager";

import { FightBoardManager } from "./B_FightBoardManager";

// let fightInfo={
//     LeftFightInfo:[
//         {name:"暴龙神",speed:100,attack:600,defense:200,hp:5000,site:{x:-1,y:1}},
//         {name:"龙卷风",speed:100,attack:300,defense:100,hp:8000,site:{x:-1,y:2}},
//         {name:"霹雳火",speed:100,attack:900,defense:50,hp:5000,site:{x:-2,y:2}}],

//     RightFightInfo:[
//         {name:"猛虎王",speed:100,attack:500,defense:200,hp:15000,site:{x:1,y:3}},
//         {name:"哈吉米",speed:100,attack:1000,defense:100,hp:10000,site:{x:2,y:2}}]
//             }
interface FightFormation{
    LeftFightInfo:{}[];
    RightFightInfo:{}[];
}

export class FightManager{

//下属管理
    //人物管理
    LeftFightRoleManager:FightRoleManager;
    RightFightRoleManager:FightRoleManager;
    //棋盘管理
    FightBoardManager:FightBoardManager;

    //战斗结束
    FightOver:boolean=false;
    //战斗阵容
    FightFormation:FightFormation;
    //预备执行方法
    ReadingFunction:()=>void;
    //外部注入的回调函数
    newFightBeginCallBack:()=>void;
    oldFightOverCallBack:()=>void;

    //token进行最后一次的识别
    private renewToken = 0;
    //锁机制进行通知
    private roundLock:Promise<void> | null=null;
    private roundUnlock:(()=>void) | null=null;

    LoadComponent(){
        this.FightBoardManager=new FightBoardManager();
        this.LeftFightRoleManager=new FightRoleManager("left");
        this.RightFightRoleManager=new FightRoleManager("right");
    }

    constructor(beginCB:()=>void,overCB:()=>void){
        this.newFightBeginCallBack=beginCB;
        this.oldFightOverCallBack=overCB;
        this.LoadComponent();
    }

//对外接口
    exportRoleList(){
        return [...this.LeftFightRoleManager.getRoleList(),...this.RightFightRoleManager.getRoleList()];
    }
    exportBoardBoxList(){
        return this.FightBoardManager.BoardBoxList;
    }
    exportFloatingTextList(){
        
    }


    async NewFight(FightFormation){
        console.log(`A_FightManager: 战斗信息开始加载`);
        this.FightFormation=FightFormation;

        const token = ++this.renewToken;

        this.ReadingFunction=()=>this.updateInfoForBegin();

        if(this.roundLock){
            this.FightOver=true;
            console.log(`FightManager：有锁进行等待`);
            await this.roundLock;
        }

        if(token !== this.renewToken){
            return;
        }
        this.ReadingFunction();
    }

    //战斗开始前，更新战斗信息
    updateInfoForBegin(){
        console.log(`FightManager: 刷新战斗信息，开始新回合`);
        let FightInfo=this.FightFormation;

        let LeftFightInfo=FightInfo.LeftFightInfo;
        let RightFightInfo=FightInfo.RightFightInfo;
        this.LeftFightRoleManager.LoadFightInfoList(LeftFightInfo);
        this.RightFightRoleManager.LoadFightInfoList(RightFightInfo);

        // this.FightOver=false;
        this.FightBegin();
    }



// //对外接口
//     exportRoleList(){
//         return [...this.LeftFightRoleManager.getRoleList(),...this.RightFightRoleManager.getRoleList()];
//     }
//     exportBoardBoxList(){
//         return this.FightBoardManager.BoardBoxList;
//     }
//     exportFloatingTextList(){
        
//     }

    //新战斗开始
    async FightBegin(){
        if(this.newFightBeginCallBack){
            this.newFightBeginCallBack();
        }

        this.checkSpeed();
      
        this.roundLock = new Promise<void>(resolve => {
            this.roundUnlock = resolve;
        });
        this.FightOver=false;
        // this.RoundIsRuing=true;
        await this.NextRound();

        if(this.oldFightOverCallBack){
            this.oldFightOverCallBack();
        }

        this.roundUnlock?.();
        this.roundUnlock = null;
        this.roundLock = null;
    }

    //新回合开始
    async NextRound(){
        if(this.FightOver){
            // this.RoundIsRuing=false;
            return;
        }
        await this.FightRound();
        if(this.FightOver) {
            // this.RoundIsRuing=false;
            return;
        }
        await this.NextRound();
    }

    //每个回合做什么
    async FightRound(){
        await this.RightAction();
        this.LeftFightRoleManager.checkDied();
        this.LeftFightRoleManager.checkLose();
        this.checkFightOver();

        await this.LeftAction();
        this.RightFightRoleManager.checkDied();
        this.RightFightRoleManager.checkLose();
        this.checkFightOver();
    }

    checkFightOver(){
        if(this.LeftFightRoleManager.Lose||this.RightFightRoleManager.Lose){
            this.FightOver=true;
            console.log(`FightManager:战斗结束`);
        }
    }

    //检查双方速度，决定出手顺序
    checkSpeed(){

    }


//调用两侧的行动函数
    async RightAction(){
        // console.log("A_FightManager");
        // console.log(`RightAction`);
        await this.RightFightRoleManager.Action((range)=>{
            return this.getLeftDefenseList(range);
        });
    }
    async LeftAction(){
        await this.LeftFightRoleManager.Action((range)=>{
            return this.getRightDefenseList(range);
        });
    }

//左右双方的防御列表获取
    //获取右方防御列表
    getRightDefenseList(range){
        return this.RightFightRoleManager.getDefenseList();
    }
    //获取左方防御列表
    getLeftDefenseList(range){
        return this.LeftFightRoleManager.getDefenseList();
    }


}