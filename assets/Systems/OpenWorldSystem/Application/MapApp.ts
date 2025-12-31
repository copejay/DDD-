
import { openWorld } from "../Domain/openWorld";

export class MapApp{

    private static _instance:MapApp;

    public static get instance(){
        if(!this._instance){
            this._instance=new MapApp();
        }
        return this._instance;
    }

    openWorld:openWorld;

    MapEntry;


    constructor(){
        this.openWorld=new openWorld();
    }

    initMapEntry(MapEntry){
        this.MapEntry=MapEntry;
    }

    NpcClick(){
        this.MapEntry.openNpcPop();
    }

    MoveCellInit(){
        let rangeMap;
        rangeMap=this.openWorld.onceBuildMap();
        this.MapEntry.buildMoveCells(rangeMap.rangeMap);
    }


    MoveCellClick(clickSite:{x:number,y:number}){
        let rangeMap;
        // if(this.openWorld.init==false){
        //     rangeMap=this.openWorld.onceBuildMap();
        // }else{
            rangeMap=this.openWorld.moveTo(clickSite);
        // }
        if(rangeMap.Moved==true){
            this.MapEntry.buildMoveCells(rangeMap.rangeMap);
        }else{
            console.log("MapApp:此路不通！");
        }
        this.MapEntry.addMessage(this.openWorld.getWorldMsg());

        this.MapEntry.buildNpc();
        // this.MapEntry.buildMoveCells(rangeMap);
    }
}