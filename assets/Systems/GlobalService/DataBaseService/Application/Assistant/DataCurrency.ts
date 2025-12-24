



export class DataCurrency{

    GameDB;

    currencyList=["gold","food"];

    constructor(GameDB){
        this.GameDB=GameDB;
        this.checkCurrency();
    }

    checkCurrency(){
        for(let i=0;i<this.currencyList.length;i++){
            let id=this.currencyList[i];
            if(!this._checkExist(id)){
                this._setNewCurrency(id);
            }
        }
    }

    // updateGold(GoldNum:number){
    //     this.ResourcesPool.updateGold(GoldNum);
    // }

    addGold(gold:number){
        let oldNum=this._getGold();
        let newNum=oldNum+gold;
        this._setGold(newNum);
        // this.ResourcesPool.AddGold(gold);
        // this.SaveItem.addItem("Resource_Gold",gold);
    }

    addFood(food:number){
        let oldNum=this._getFood();
        let newNum=oldNum+food;
        this._setFood(newNum);
        // this.ResourcesPool.AddFood(food);
        // this.SaveItem.addItem("Resource_Food",food);

    }

    getGold(){
        return this._getGold();
    }

    getFood(){
        return this._getFood();
    }

//内部调用

    _setNewCurrency(id){
        this.GameDB.currency.set(id,{id:id,count:0});
    }

    _getGold(){
        return this.GameDB.currency.get('gold').count;
    }

    _getFood(){
        return this.GameDB.currency.get('food').count;
    }

    _checkExist(id){
        if(this.GameDB.currency.exists(id)){
            return true;
        }
        return false;
    }

    _setGold(num:number){
        this.GameDB.currency.set('gold',{id:'gold',count:num});
    }

    _setFood(num:number){
        this.GameDB.currency.set('food',{id:'food',count:num});
    }

}