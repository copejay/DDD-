

//这里把增删改，和查询，分开
//因为增删改不需要返回，而查询还需要对数据进行返回

//一般是由其它系统自己操作，再进行完增删改操作之后，再额外发起一次查询
export class ResourceSearchService{

    private GameDB;
    private EventBus;

    constructor(gameDb,EventBus){
        this.GameDB=gameDb;
        this.EventBus=EventBus;
    }

    searchGold(Data){
        const result=this.GameDB.items.exists("Resource_Gold");
        let searchResult=0;
        if(!result){
            searchResult=0;
        }else{
            const row=this.GameDB.items.get("Resource_Gold");
            searchResult=row.count;
        }
        this.EventBus.emit("ResourcesSearchServiceEvent",{type:"SearchResult",data:{name:"Gold",count:searchResult}});
    }

}