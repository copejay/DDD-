

//处理角色面板的逻辑
export class App_ChildBoxBoard{


    private DataBaseService;
    private BagEntryUI;

    constructor(DataBaseService,BagEntryUI){
        this.DataBaseService=DataBaseService;
        this.BagEntryUI=BagEntryUI;
    }


    //同步物品
    syncBagItem(type){
        //初始化物品信息列表
        if(type=="Item"){
            let ItemInfoList=this.getItemInfoList();
            this.BagEntryUI.createItemBoxBoard(ItemInfoList);
        }else if(type=="Weapon"){
            let WeaponInfoList=this.getWeaponInfoList();
            this.BagEntryUI.createWeaponBoxBoard(WeaponInfoList);
        }
    }

    getWeaponInfoList(){
        return this.DataBaseService.getAllWeapon();
    }

    getItemInfoList(){
        return this.DataBaseService.getAllStackItem();
    }

}