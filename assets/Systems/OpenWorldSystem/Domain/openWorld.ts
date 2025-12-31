
import { mapData } from "./worldConfig/worldMap";

import { worldMessage } from "./worldMessage";

type Dir = "up" | "down" | "left" | "right";

const DIR_OFFSET:Record<Dir,{x:number;y:number}>={
    up:{x:0,y:-1},
    down:{x:0,y:1},
    left:{x:-1,y:0},
    right:{x:1,y:0},
};

const REVERSE:Record<Dir,Dir>={
    up:"down",
    down:"up",
    left:"right",
    right:"left",
};

const MoveTo={
    "1,0":"right",
    "-1,0":"left",
    "0,1":"up",
    "0,-1":"down",
}


export class openWorld{

    yangzhouCenter={x:11,y:17};

    moveStep={x:0,y:0};

    finalMap;

    // init=false;

    worldMessage=new worldMessage();

    constructor(){
        this.finalMap=this.buildFinalMap(mapData);
    }

    getWorldMsg(){
        return this.worldMessage.message;
    }

    onceBuildMap(){
        let Moved=true;
        let rangeMap=this.getRangeRoad({x:this.moveStep.x+this.yangzhouCenter.x,y:this.moveStep.y+this.yangzhouCenter.y});
        // this.init=true;

        return {rangeMap,Moved};
    }

    moveTo(clickSite:{x:number,y:number}){
        //前端的显示，是以上方作为正y轴
        //而按照excel生成地图，是以下方作为正y轴
        //这是这里生成地图位置的依据
        //点击下方，传来负数，就得转换成整数，才能正确得到excel地图的位置
        let moveDir=MoveTo[`${clickSite.x},${clickSite.y}`];
        this.worldMessage.move(moveDir);
    
        let MapStep=DIR_OFFSET[moveDir];
        let Moved=false;

        let mySite={x:this.moveStep.x+this.yangzhouCenter.x,y:this.moveStep.y+this.yangzhouCenter.y};

 
        this.moveStep.x+=MapStep.x;
        this.moveStep.y+=MapStep.y;

        let targetSite={x:this.moveStep.x+this.yangzhouCenter.x,y:this.moveStep.y+this.yangzhouCenter.y};

        let targetCell=this.finalMap.get(`${targetSite.x},${targetSite.y}`);
        let myCell=this.finalMap.get(`${mySite.x},${mySite.y}`);
        this.worldMessage.targetTo(targetCell);

        if(targetCell){
            if(myCell.exits.has(moveDir)){
                Moved=true;
            }else{
                this.moveStep.x-=MapStep.x;
                this.moveStep.y-=MapStep.y;  
            }
        }else{
            this.moveStep.x-=MapStep.x;
            this.moveStep.y-=MapStep.y;  
        }
        this.worldMessage.moved(Moved);

        // console.log(`${this.worldMessage.message}`)

        let rangeMap=this.getRangeRoad({x:this.moveStep.x+this.yangzhouCenter.x,y:this.moveStep.y+this.yangzhouCenter.y});

        return {rangeMap,Moved};
    }

    checkSiteExist(site:{x:number,y:number}){
        return mapData.has(`${site.x},${site.y}`);
    }


    //前端以上方作为正y轴
    //y比中心点大，就计算得到负数，在下方显示
    //比中心点小，就得到正数，在上方显示
    getRangeRoad(site:{x:number,y:number}){
        // let newMap:Map<string,{name:string,links:any[]}>=new Map();
        let newMap:Map<string,{name:string,exits:Set<Dir>}>=new Map();
        for (const [key, name] of this.finalMap) {
            const [xStr, yStr] = key.split(",");
            const x = Number(xStr);
            const y = Number(yStr);

            // let linkName=this.linkName(name);
            if(x<=site.x+2 && x>=site.x-2 && y<=site.y+2 && y>=site.y-2){
                newMap.set(`${x-site.x},${site.y-y}`,name);
            }
            // console.log(x, y, name);
        }
        return newMap;
    }

    parse(raw:string):{name:string;hasDir:boolean;dirs:Dir[]}{
        const map:Record<string,Dir>={"^":"up","v":"down",">":"right","<":"left"};
        let i=0,dirs:Dir[]=[];
        while(map[raw[i]]) dirs.push(map[raw[i++]]);
        return {name:raw.slice(i),hasDir:dirs.length>0,dirs};
    }


    buildFinalMap(mapData:Map<string,string>){
        const final=new Map<string,{name:string;exits:Set<Dir>;hasDir:boolean}>();

        for(const [k,raw] of mapData){
            const p=this.parse(raw);
            final.set(k,{name:p.name,exits: new Set(),hasDir:p.hasDir});
        }

        //规则1
        for(const [k,raw] of mapData){
            const {dirs}=this.parse(raw);
            const [x,y]= k.split(",").map(Number);
            for(const d of dirs){
                const nk=`${x+DIR_OFFSET[d].x},${y+DIR_OFFSET[d].y}`;
                if(!final.has(nk)) continue;
                final.get(k)!.exits.add(d);
                final.get(nk)!.exits.add(REVERSE[d]);
            }
        }

        // 规则2
        for (const [k,cell] of final){
            if(cell.hasDir) continue;
            const [x,y]=k.split(",").map(Number);
            (Object.keys(DIR_OFFSET) as Dir[]).forEach(d=>{
                const nk=`${x+DIR_OFFSET[d].x},${y+DIR_OFFSET[d].y}`;
                const nb=final.get(nk);
                if(nb && !nb.hasDir){
                    cell.exits.add(d);
                    nb.exits.add(REVERSE[d]);
                }
            })
        }
        return final;
    }


}