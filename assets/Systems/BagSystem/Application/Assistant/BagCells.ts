

//处理角色面板的逻辑
export class BagCells{


    private DataBaseService;
    //模板服务
    private TemplateService;

    private BagEntryUI;

    constructor(DataBaseService,TemplateService,BagEntryUI){
        this.DataBaseService=DataBaseService;
        this.TemplateService=TemplateService;
        this.BagEntryUI=BagEntryUI;
    }


    //同步物品
    syncBagItem(type){
        //初始化物品信息列表
        if(type=="Item"){
            let ItemInfoList=this.getItemInfoList();
            let newList=this.InfoListTransform(ItemInfoList);
            this.BagEntryUI.createItemBoxBoard(newList);
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

    InfoListTransform(InfoList){
        let newList=[];
        for(let info of InfoList){
            let newInfo={
                id:info.id,
                name:this.idTransformName(info.id),
                count:info.count,
            }
            newList.push(newInfo);
        }
        return newList;
    }

    idTransformName(id){
        return this.TemplateService.getStackItem(id).name;
    }

}