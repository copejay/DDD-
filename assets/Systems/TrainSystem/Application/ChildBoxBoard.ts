

//处理角色面板的逻辑
export class ChildBoxBoard{


    private DataBaseService;
    private TrainEntryUI;

    constructor(DataBaseService,TrainEntryUI){
        this.DataBaseService=DataBaseService;
        this.TrainEntryUI=TrainEntryUI;
    }

    //同步训练角色
    syncTrainRole(){
        //初始化角色信息列表
        let RoleInfoList=this.getRoleInfoList();
        this.TrainEntryUI.createRoleBoxBoard(RoleInfoList);
    }

    getRoleInfoList(){
        return this.DataBaseService.getAllRole();
    }

}