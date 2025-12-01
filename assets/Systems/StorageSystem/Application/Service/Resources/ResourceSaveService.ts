
import { ResourcesEventType } from "../../../Domain";



export class ResourceSaveService{

    private GameDB;

    constructor(gameDb){
        this.GameDB=gameDb;
    }

    analysisData(Data:ResourcesEventType){
        console.log(`ResourceSaveService:类型:${Data.type},数据:${Data.data.name},数据值:${Data.data.count}`);
        if(Data.type==="add"){
            if(Data.data.name==="金币"){
                this.addGold(Data);
            }
        }
    }

    // searchData(Data:ResourcesEventType){
    //     if(Data.data.name==="金币"){
    //         return this.searchGold(Data);
    //     }
    // }

    addGold(Data){
        const result=this.GameDB.items.exists("Resource_Gold");
        if(!result){
            this.GameDB.items.set("Resource_Gold",{id:"Resource_Gold",name:"金币",count:Data.data.count});
        }else{
            const row=this.GameDB.items.get("Resource_Gold");
            const count=row.count;
            this.GameDB.items.set("Resource_Gold",{id:"Resource_Gold",name:"金币",count:count+Data.data.count});
        }
    }

    // searchGold(Data){
    //     const result=this.GameDB.items.exists("Resource_Gold");
    //     if(!result){
    //         return 0;
    //     }else{
    //         const row=this.GameDB.items.get("Resource_Gold");
    //         return row.count;
    //     }
    // }




}