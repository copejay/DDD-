

import { ResourcesPool } from "../Domain/ResourcesPool";

import {SaveItem} from "./SaveItem"

//负责存储物品的子类
export class ItemChild{

    private ResourcesPool:ResourcesPool=null;//资源数据体

    // private GoldBoardView=null;

    // private FoodBoardView=null;

    private SaveItem:SaveItem=null;

    private SaveMap={
        gold:"Resource_Gold",
        food:"Resource_Food"
    }


    constructor(GameDB){
        this.SaveItem=new SaveItem(GameDB);
        this.init();
        // this.ResourcesPool=ResourcesPool;
        // this.GoldBoardView=GoldBoardView;
    }
    //Gold使用Resource_Gold作为id


    //初始拿到数据，进行逻辑世界初始化
    init(){
        let GoldNum=0;
        let FoodNum=0;
        if(!this.SaveItem.checkExist("Resource_Gold")){
            this.SaveItem.setItem("Resource_Gold","金币",GoldNum);
        }else{
            GoldNum=this.SaveItem.getNum("Resource_Gold");
        }
        if(!this.SaveItem.checkExist("Resource_Food")){
            this.SaveItem.setItem("Resource_Food","食物",FoodNum);
        }else{
            FoodNum=this.SaveItem.getNum("Resource_Food");
        }
        this.ResourcesPool=new ResourcesPool({gold:GoldNum,food:FoodNum});
    }


    updateGold(GoldNum:number){
        this.ResourcesPool.updateGold(GoldNum);
    }

    addGold(gold:number){
        this.ResourcesPool.AddGold(gold);
        this.SaveItem.addItem("Resource_Gold",gold);
    }

    addFood(food:number){
        this.ResourcesPool.AddFood(food);
        this.SaveItem.addItem("Resource_Food",food);
    }

    getGold(){
        return this.ResourcesPool.gold;
    }

    getFood(){
        return this.ResourcesPool.food;
    }

    // deleteGold(gold:number){
    //     // this.ResourcesPool.AddGold(-gold);
    // }

    update(){
        // console.log(`ResourcesService:金币_${this.ResourcesPool.gold}`);
        // this.GoldBoardView.setString(this.ResourcesPool.gold);
    }


  
}