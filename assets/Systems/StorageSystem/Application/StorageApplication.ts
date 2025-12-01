
// import { ResourceSaveService } from "./Service/Resources/ResourceSaveService";
// import { ResourceSearchService } from "./Service/Resources/ResourceSearchService";

// import { ResourcesEventType } from "../Domain";

// import { GameDB } from "../Infrastructure";


// export class StorageApplication{

//     private _GameDB=GameDB.loadFromStorage();

//     private ResourceSaveService:ResourceSaveService;
//     private ResourceSearchService:ResourceSearchService;

//     constructor(EventBus){
//         this.ResourceSaveService=new ResourceSaveService(this._GameDB);
//         this.ResourceSearchService=new ResourceSearchService(this._GameDB,EventBus);
//     }


//     //分析增删改的指令
//     ResourcesAnalysis(Data:ResourcesEventType){
//         if(Data.type=="search"){
//             this.ResourceSearch(Data);
//         }else{
//             this.ResourceSaveService.analysisData(Data);
//         }
//     }

//     ResourceSearch(Data:ResourcesEventType){
//         this.ResourceSearchService.searchGold(Data);
//     }

// }