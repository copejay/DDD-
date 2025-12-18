

export class ItemPanelData{

    id:string='null';
    count:number=0;

    ItemInfo;

    constructor(ItemInfo){
        this.ItemInfo=ItemInfo;
        this.id=ItemInfo.id;
        this.count=ItemInfo.count;
    }

}