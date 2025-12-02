


export class RoleBoxManager{

    private RoleBoxFactory;

    
    constructor(RoleBoxFactory){
        this.RoleBoxFactory=RoleBoxFactory;

    }


    MakeRoleBoxList(BoxNum:number){
        let RoleBoxList=[];
        for(let i=0;i<BoxNum;i++){
            let RoleBox=this.RoleBoxFactory.CreateRoleBox();
            RoleBoxList.push(RoleBox);
        }
        return RoleBoxList;
    }


    RecycleRoleBoxList(RoleBoxList:[]){
        for(let i=0;i<RoleBoxList.length;i++){
            let RoleBox=RoleBoxList[i];
            // RoleBox.Recycle();
        }
    }


    MakeBoxSiteList(BoxNum:number){
        let BoxSiteList=[];
        let level=0;//排列层级
        for(let i=0;i<BoxNum;i++){
            if(i%3==0){//每3个为一层
                level++;
            }
            let BoxSite={
                x:(i%3)*150,
                y:(level-1)*150,
            }
            BoxSiteList.push(BoxSite);
        }
        return BoxSiteList;
    }
}