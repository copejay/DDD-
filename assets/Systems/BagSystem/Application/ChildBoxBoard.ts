

//处理角色面板的逻辑
export class ChildBoxBoard{


    private DataBaseService;
    private BagEntryUI;

    constructor(DataBaseService,BagEntryUI){
        this.DataBaseService=DataBaseService;
        this.BagEntryUI=BagEntryUI;
    }

    //同步物品
    syncBagItem(){
        //初始化物品信息列表
        let ItemInfoList=this.getItemInfoList();
        this.BagEntryUI.createItemBoxBoard(ItemInfoList);
    }

    getItemInfoList(){
        return this.DataBaseService.getAllWeapon();
    }

}