


export class SaveItem{

    private GameDB;

    constructor(GameDB){
        this.GameDB=GameDB;
    }

    checkExist(ItemID:string){
        return this.GameDB.items.exists(ItemID);
    }

    getNum(ItemID:string){
        return this.GameDB.items.get(ItemID).count;
    }

    
    addItem(ItemID:string,count:number=1){
        if(this.checkExist(ItemID)){
            const oldNum=this.getNum(ItemID);
            this.setItem(ItemID,ItemID,oldNum+count);
        }else{
            this.setItem(ItemID,ItemID,count);
        }
    }

    setItem(_ItemID:string,_name:string,_count:number=1){
        this.GameDB.items.set(_ItemID,{
            id:_ItemID,
            name:_name,
            count:_count,
        })
    }



}