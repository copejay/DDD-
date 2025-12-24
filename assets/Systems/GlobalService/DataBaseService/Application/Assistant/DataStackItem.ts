

export class DataStackItem{

    GameDB;

    constructor(GameDB){
        this.GameDB=GameDB;
    }

    checkExist(StackItemID:string){
        return this.GameDB.stackItems.exists(StackItemID);
    }

    getOne(StackItemID:string){
        if(this.checkExist(StackItemID)==true){
            let StackItem=this.GameDB.stackItems.get(StackItemID);
            return StackItem;
        }else{
            return {
                id: "stackItemID",
                count: 0,
            };
        }
    }

    getAll(){
        let AllStackItem=this.GameDB.stackItems.getAll();
        if(AllStackItem.length==0){
            const nullStackItem=[]
            return nullStackItem;
        }
        return AllStackItem;
    }

    getNum(StackItem){
        if(this.checkExist(StackItem)==true){
            let StackItemNum=this.GameDB.stackItems.get(StackItem).count;
            return StackItemNum;
        }else{
            return 0;
        }
    }

    add(StackItemId,count:number){
        if(this.checkExist(StackItemId)==true){
            let StackItemNum=this.GameDB.stackItems.get(StackItemId).count;
            StackItemNum+=count;
            this.set(StackItemId,StackItemNum);
        }else{
            this.set(StackItemId,count);
        }
    }

    reduce(StackItemId,count:number){
        if(this.checkExist(StackItemId)==true){
            let oldNum=this.getNum(StackItemId);
            if(oldNum>=count){
                this.add(StackItemId,-count);
            }else{
                return false;
            }
            this.checkDelete(StackItemId);
        }
    }

    checkDelete(StackItemId){
        if(this.checkExist(StackItemId)==true){
            let oldNum=this.getNum(StackItemId);
            if(oldNum<=0){
                this.GameDB.stackItems.delete(StackItemId);
            }
        }
    }

    set(StackItemId,count:number){
        this.GameDB.stackItems.set(StackItemId,{
            id: StackItemId,
            count: count,
        });

    }


}