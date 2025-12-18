
import { ItemPanelData } from "../Domain/ItemPanelData";


//处理角色弹窗的逻辑
export class ChildItemPanel{

    DataBaseService;

    ItemPanelData;

    ItemPanelUI;


    constructor(DataBaseService,ItemPanelUI){
        this.DataBaseService=DataBaseService;
        this.ItemPanelUI=ItemPanelUI;
    }

    //物品面板
    createItemPanelData(ItemID:string){
        let ItemInfo=this.getItemInfoByID(ItemID);
        if(ItemInfo){
            this.ItemPanelData=new ItemPanelData(ItemInfo);
        }
    }

    closeItemPanel(){
        
    }

    SaveItemPanelData(){
        let ItemData=this.ItemPanelData.export();
        this.DataBaseService.setItem(ItemData);
    }

    openItemPanel(ItemID:string){
        this.createItemPanelData(ItemID);

        this.ItemPanelUI.open();
        this.ItemPanelUI.syncInfo(this.ItemPanelData);
    }


    getItemInfoByID(ItemID:string){
        return this.DataBaseService.getStackItem(ItemID);
    }

}