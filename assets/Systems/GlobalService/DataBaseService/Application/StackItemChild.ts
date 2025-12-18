

export class StackItemChild{

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
                id: "stackItem",
                count: 0,
            };
        }
    }

    getAll(){
        let AllStackItem=this.GameDB.stackItems.getAll();
        if(AllStackItem.length==0){
            const nullStackItem=[{
                id: "stackItem",
                count: 0,
            }]
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

    set(StackItemId,count:number){
        this.GameDB.stackItems.set(StackItemId,{
            id: StackItemId,
            count: count,
        });

    }

    // checkExist(RoleID:string){
    //     return this.GameDB.roles.exists(RoleID);
    // }

    // getRole(RoleID:string){
    //     let Role:{
    //         id: "",
    //         name: "",
    //         templateID: "",
    //         level: 0,
    //         exp:0,
    //     }=this.GameDB.roles.get(RoleID);
    //     return Role;
    // }

    // getAllRole(){
    //     let AllRole=this.GameDB.roles.getAll();
    //     return AllRole;
    // }

    // setRole(Role:RoleRow){
    //     this.GameDB.roles.set(Role.id,Role);
    // }


}