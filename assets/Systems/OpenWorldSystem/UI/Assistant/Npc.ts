

type event={
    callFrom:string,
    type:string,
    data:any
}

export class Npc{


    NpcFactory;

    baseNpcList=[{name:"张三",id:1},{name:"李四",id:2},{name:"王五",id:3},{name:"赵六",id:4},{name:"孙七",id:5}];

    NpcList=[];

    NpcViewList=[];

    NpcNode;

    EventBus;

    constructor(NpcFactory,NpcNode){
        this.NpcFactory=NpcFactory;
        this.NpcNode=NpcNode;
    }

    init(eventBus){
        this.EventBus=eventBus;
    }

    clickCB(id:number){
        console.log(`Npc:${id}`);
        this.EventBus({callFrom:"Npc",type:"NpcClick",data:id});
    }


    buildEnemyNpc(){
        let NpcList=this.baseNpcList;
        for(let i=0;i<NpcList.length;i++){
            let Npc=NpcList[i];
            let NpcView=this.NpcFactory.getView(this.NpcNode);
            let NpcSite=this.getNpcSite(i);

            NpcView.syncPosition(NpcSite[0],NpcSite[1]);
            NpcView.setName(Npc.name);
            console.log(`UI-Npc:${Npc.name}(${Npc.id})`);
            NpcView.setID(Npc.id);
            NpcView.setClickCB(this.clickCB.bind(this));

            this.NpcViewList.push(NpcView);
        }
    }

    recycleNpcView(){
        for(let i=0;i<this.NpcViewList.length;i++){
            let NpcView=this.NpcViewList[i];
            this.NpcFactory.recycleView(NpcView);
        }
    }


    // getNpcSite(SiteNum){
    //     let xPos=(SiteNum%3)*100;
    //     let yPos=Math.floor(SiteNum/3)*60;
    //     return [xPos,yPos];
    // }
    getNpcSite(siteNum: number): [number, number] {
        const COL = 3;
        const CELL_W = 80;
        const CELL_H = 40;

        const SpaceW=40;
        const SpaceH=20;

        const BaseX=15;
        const BaseY=0;

        const col = siteNum % COL;
        const row = Math.floor(siteNum / COL);

        return [col * (CELL_W+SpaceW)+BaseX, -row * (CELL_H+SpaceH)+BaseY];
    }

}