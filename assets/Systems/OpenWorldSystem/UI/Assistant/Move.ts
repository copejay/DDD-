

import { RoadCellFactory } from "../../Infrastructure/Factory/RoadCellFactory";



export class Move{


    map={"0,0":"中央大街","0,-1":"南大街","0,1":"北大街",
        "1,0":"东大街",
        "-1,0":"西大街",}

    LRoadList=[];
    MRoadList=[];
    SRoadList=[];

    RoadDotList=[];

    MoveBoardNode;
    CellRoadNode;

    RoadCellFactory:RoadCellFactory;
    RoadDotFactory;

    // siteMap=new Map<string,string>;

    MapApp;


    constructor(RoadCellFactory,RoadDotFactory,MoveBoardNode,CellRoadNode){
        this.RoadCellFactory=RoadCellFactory;
        this.RoadDotFactory=RoadDotFactory;
        this.MoveBoardNode=MoveBoardNode;
        this.CellRoadNode=CellRoadNode;

    }

    init(App){
        this.MapApp=App;
        // this.buildMoveCellsView("n");
        // this.MapApp.MoveCellClick({x:0,y:0});
        this.MapApp.MoveCellInit();
    }

    recycleMoveCells(){
        this.RoadDotList.forEach((item)=>{
            this.RoadDotFactory.recycleView(item);
        });
        this.LRoadList.forEach((item)=>{
            this.RoadCellFactory.recycleLView(item);
        });
        this.MRoadList.forEach((item)=>{
            this.RoadCellFactory.recycleMView(item);
        });
        this.SRoadList.forEach((item)=>{
            this.RoadCellFactory.recycleSView(item);
        });
    }

    buildDot(x,y){

    }

    buildRoadDot(x,y,exit){
        // const typeMap={"right":{x:1,y:0},"left":{x:-1,y:0},"up":{x:0,y:1},"down":{x:0,y:-1}}
        let xPos=x*100;
        let yPos=y*60;
        let offset={x:0,y:0};
        if(exit=="right"){
            offset.x=60;
        }
        if(exit=="left"){
            offset.x=-60;
        }
        if(exit=="up"){
            offset.y=35;
        }
        if(exit=="down"){
            offset.y=-35;
        }

        let dotView=this.RoadDotFactory.getView(this.CellRoadNode);
        this.RoadDotList.push(dotView);
        // let offset=typeMap[type];
        dotView.syncPosition(xPos+offset.x,yPos+offset.y);
        // dotView.buildSite(x,y);
        // dotView.buildName(type);
    }


    buildMoveCellsView(mapListInfo){
        this.recycleMoveCells();
      
        for(const [key,value] of mapListInfo){
            // let mapInfo=mapListInfo[i];
            let site=this.analyzeMapSite(key);

        
            let x=site.x;
            let y=site.y;
    
            let Name=value.name;
            // let links=value.links;
            let exits=value.exits;
            // for(let link of links){
            // this.buildRoadDot(x,y,exits);
            exits.forEach((exit)=>{
                this.buildRoadDot(x,y,exit);
            });
            // }

            let Px=x*100;
            let Py=y*60;
            let View;
            if(x==0 && y==0){
                View=this.getView("L",this.MoveBoardNode);
                this.LRoadList.push(View);
            }else if((x==1 && y==0) ||
                    ( x==-1 && y==0) ||
                    ( x==0 && y==1 )||
                    ( x==0 && y==-1)){
                View=this.getView("M",this.MoveBoardNode);
                this.MRoadList.push(View);
            }else{
                View=this.getView("S",this.MoveBoardNode);
                this.SRoadList.push(View);
            }
            View.SyncPosition(Px,Py);
            View.buildSite(x,y);
            View.buildName(Name);
            // this.LRoadList.push(View);
        }
    }


    getView(type:"S"|"M"|"L",ParentNode){
        let View;
        if(type=="L"){
            View=this.RoadCellFactory.getLView(ParentNode);
        }else if(type=="M"){
            View=this.RoadCellFactory.getMView(ParentNode);
        }else if(type=="S"){
            View=this.RoadCellFactory.getSView(ParentNode);
        }
        View.initCB(this.clickCB.bind(this));
        return View;
    }


    analyzeMapSite(Site:string){
        const [xStr, yStr] = Site.split(",");

        const x = Number(xStr);
        const y = Number(yStr);
        // let cell;
        // let site:{x:number,y:number};
        return {x,y};
    }


    figureCellsSite(){


    }


    clickCB(x:number,y:number){
        // console.log("点击了"+x+","+y);
        this.MapApp.MoveCellClick({x,y});
    }


}