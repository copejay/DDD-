
import { HintPop } from "../Domain/HintPop";

import { HintPopFactory } from "../Infrastructure/Factory/HintPopFactory";

import { Node,Prefab } from "cc";

export class HintPopApp{

    //全局单例设置
    private static _instance:HintPopApp;

    public static get instance(){
        if(!this._instance){
            this._instance=new HintPopApp();
        }
        return this._instance;
    }
    //工厂
    private HintPopViewFactory:HintPopFactory;
    //列表管理
    private HintPopList:HintPop[]=[];
    private HintPopViewList=[];
    //弹窗父节点
    private HintPopParent:Node;

    constructor(){
    }

    initHintPopParent(HintPopParent:Node){
        this.HintPopParent=HintPopParent;
    }
    initPrefab(HintPrefab:Prefab){
        this.HintPopViewFactory=new HintPopFactory(HintPrefab);
    }

    createHintPop(HintLabel:string){
        let newHintPop=new HintPop(0,0,HintLabel);
        this.HintPopList.push(newHintPop);

        let newHintPopView=this.HintPopViewFactory.get(this.HintPopParent);
        this.HintPopViewList.push(newHintPopView);
    }



    update(dt){
        for(let i=0;i<this.HintPopList.length;i++){
            // console.log(`长度对比，Pop，View${this.HintPopList.length} ${this.HintPopViewList.length}`);
            let hintPop=this.HintPopList[i];
            hintPop.update(dt);
            //View同步
            let hintPopView=this.HintPopViewList[i];
            hintPopView.syncPosition(hintPop.x,hintPop.y);
            hintPopView.syncLabel(hintPop.HintLabel);
            //消失判定
            if(hintPop.DiaPlay){
                this.HintPopList.splice(i,1);
                //回收View
                this.HintPopViewFactory.recycle(hintPopView);
                this.HintPopViewList.splice(i,1);
                i--;
            }
            // console.log(`结尾长度对比，Pop，View${this.HintPopList.length} ${this.HintPopViewList.length}`);
        }

    }
}