

//处理角色面板的逻辑
export class RoleBoxList{


    private DataBaseService;
    private TrainEntryUI;

    constructor(DataBaseService,TrainEntryUI){
        this.DataBaseService=DataBaseService;
        this.TrainEntryUI=TrainEntryUI;
    }

    //同步训练角色
    reBuildBoard(){
        //初始化角色信息列表
        let RoleInfoList=this.getRoleInfoList();
        let UpList=this.getUpRoleIDList();
        this.TrainEntryUI.reBuildBoxBoard(RoleInfoList,UpList);
    }

    getUpRoleIDList(){
        let formation=this.DataBaseService.getFormation();
        let upList=formation.map((role)=>{
            return role.id;
        })
        return upList;
    }

    getRoleInfoList(){
        return this.DataBaseService.getAllRole();
    }

}