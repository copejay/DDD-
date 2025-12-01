
import { ResourcesPoolType } from "./ResourcesPoolType";

export class ResourcesPool{

    gold:number=0;

    food:number=0;

    constructor(Data:ResourcesPoolType){
        const ResourcesData=Data;
        this.gold=ResourcesData.gold;
        this.food=ResourcesData.food;
    }

    public updateGold(GoldNum:number){
        this.gold=GoldNum;
    }

    public AddGold(gold:number){
        this.gold+=gold;
    }

    public getGold(){
        return this.gold;
    }


     public AddFood(food:number){
        this.food+=food;
    }

    public getFood(){
        return this.food;
    }
}