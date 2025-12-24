


import { DataBaseService } from "../../GlobalService";

import { ResourceApp } from "../../ResourceSystem/Application/ResourceApp";

import { HintPopApp } from "../../HintPopSystem/Application/HintPopApp";

import {GachaPool} from "../Domain/GachaPool";

export class GachaApplication{

    private static _instance:GachaApplication;

    public static get instance(){
        if(!this._instance){
            this._instance=new GachaApplication();
        }
        return this._instance;
    }

    private DataBaseService;
    private ResourceApp;

    private GachaPool;

    // private GachaPopUI;
    private GachaEntryUI;

    private constructor(){
        this.GachaPool=new GachaPool();

        this.DataBaseService=DataBaseService.instance;
        this.ResourceApp=ResourceApp.instance;
    }

    // initGachaPopUI(ui){
    //     this.GachaPopUI=ui;
    // }
    initEntryUI(EntryUI){
        this.GachaEntryUI=EntryUI;
    }


    //提供调用方法
    ClickGachaEntryButton(){
        this.GachaEntryUI.openGachaPop();
    }
    ClickGachaButton(){
        this.GachaOne();
    }


    GachaOne(){
        // console.log("GachaApp： 抽奖一次！");
        const Gold=this.DataBaseService.getGold();
        if(Gold<500){
            // this.GachaPopUI.showErrorPop();
            console.log("金币不足");
            HintPopApp.instance.createHintPop("【金币不足】");
            return;
        }else{
            this.DataBaseService.addGold(-50);

            // const gift=this.GachaPool.Gacha();
            const giftList=this.GachaPool.Gacha_Ten();
            // this.DataBaseService.addStackItem(gift.id,gift.count);
             for(let i=0;i<giftList.length;i++){
                const gift=giftList[i];
                this.DataBaseService.addStackItem(gift.id,gift.count);
             }

            this.ResourceApp.syncUI();
            // this.GachaPopUI.showGachaResultPop();
            this.GachaEntryUI.openGachaResultPop();
        }
    }


}