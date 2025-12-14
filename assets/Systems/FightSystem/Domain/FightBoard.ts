


export class FightBoard{

    fightBoxWidth:number=80;

    BoxSpace:number=10;


    BoxSiteList:{'right':any[],'left':any[]}={'right':[],'left':[]};
    // LeftBoxSiteList:any[]=[];

    constructor(){
        this.createRightBoxSiteList();
        this.createLeftBoxSiteList();
    }


    createRightBoxSiteList(){
        let BoxLength=this.fightBoxWidth;
        let Space=this.BoxSpace;

        let x,y=0;
        let level=-1;
        for (let i=0;i<9;i++){
            if(i%3==0){
                level+=1;
            }
            x=(i-level*3)*(BoxLength+Space)+80;
            y=level*-(BoxLength+Space);
            let site=[x,y];
            this.BoxSiteList.right.push(site)
        }
    }

    createLeftBoxSiteList(){
        this.BoxSiteList.right.forEach((site)=>{
            let x=-site[0];
            let y=site[1];
            this.BoxSiteList.left.push([x,y]);
        });
        // let BoxLength=this.fightBoxWidth;
        // let Space=this.BoxSpace;

        // let x,y=0;
        // let level=-1;
        // for (let i=0;i<9;i++){
        //     if(i%3==0){
        //         level+=1;
        //     }
        //     x=(i-level*3)*(BoxLength+Space)-800;
        //     y=level*-(BoxLength+Space);
        //     let site=[x,y];
        //     this.BoxSiteList.left.push(site)
        // }

    }

}