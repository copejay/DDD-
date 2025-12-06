


import { DataBaseService } from "../../GlobalService";

import { ResourceApp } from "../../ResourceSystem/Application/ResourceApp";

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

    private GachaPopUI;

    private constructor(){
        this.DataBaseService=DataBaseService.instance;
        this.ResourceApp=ResourceApp.instance;
    }

    initGachaPopUI(ui){
        this.GachaPopUI=ui;
    }

    GachaOne(){
        const Gold=this.DataBaseService.getGold();
        if(Gold<500){
            // this.GachaPopUI.showErrorPop();
            console.log("金币不足");
            return;
        }else{
            this.DataBaseService.addGold(-500);
            this.ResourceApp.syncUI();
            this.GachaPopUI.showGachaResultPop();
        }
    }


}