
import { UI } from "cc";
import { ItemPanelData } from "../../Domain/ItemPanelData";
import { WeaponPanelData } from "../../Domain/WeaponPanelData";


//处理角色弹窗的逻辑
export class BagPop{

    DataBaseService;

    ItemPopData;

    WeaponPopData;

    // ItemPanelUI;
    UIEntry;


    constructor(DataBaseService,UIEntry){
        this.DataBaseService=DataBaseService;
        // this.ItemPanelUI=ItemPanelUI;
        this.UIEntry=UIEntry;
    }

    //物品面板
    createItemPanelData(ItemID:string){
        let ItemInfo=this.getItemInfoByID(ItemID);
        if(ItemInfo){
            this.ItemPopData=new ItemPanelData(ItemInfo);
        }
    }

    createWeaponPanelData(WeaponID:string){
        let WeaponInfo=this.getWeaponInfoByID(WeaponID);
        if(WeaponInfo){
            this.WeaponPopData=new WeaponPanelData(WeaponInfo);
        }
    }

    closeItemPanel(){
        
    }

    SaveItemPanelData(){
        let ItemData=this.ItemPopData.export();
        this.DataBaseService.setItem(ItemData);
    }


    openItemPop(ItemID:string){
        this.createItemPanelData(ItemID);
        this.UIEntry.openItemPop(this.ItemPopData);
    }
    openWeaponPop(WeaponID:string){
        this.createWeaponPanelData(WeaponID);
        this.UIEntry.openWeaponPop(this.WeaponPopData);
    }


    getItemInfoByID(ItemID:string){
        return this.DataBaseService.getStackItem(ItemID);
    }

    getWeaponInfoByID(WeaponID:string){
        return this.DataBaseService.getWeapon(WeaponID);
    }

}