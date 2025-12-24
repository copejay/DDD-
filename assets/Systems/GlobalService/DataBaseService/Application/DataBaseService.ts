
import { GameDBService } from "../../Infrastructure/Storage/GameDBService";

import { DataStackItem } from "./Assistant/DataStackItem";
import {DataWeapon} from "./Assistant/DataWeapon";
import {DataRole} from "./Assistant/DataRole";
import {DataFormation} from "./Assistant/DataFormation";
import { DataCurrency } from "./Assistant/DataCurrency";


import { RoleRow } from "../..";
import { WeaponRow } from "../..";
import { StackItemRow } from "../..";



export class DataBaseService{

    private static _instance:DataBaseService;

    public static get instance(){
        if(!this._instance){
            this._instance=new DataBaseService();
        }
        return this._instance;
    }

    private GameDB;

    private DataStackItem;
    private DataWeapon;
    private DataRole;
    private DataFormation;
    private DataCurrency;

    //初始化传入数据库引用
    constructor(){
        console.log("DataBaseService:初始化调用");
        GameDBService.instance.init();
        this.GameDB=GameDBService.instance.db;

        this.initChild();
    }

    //初始化数据服务的子类
    initChild(){
        this.DataFormation=new DataFormation(this.GameDB);

        this.DataStackItem=new DataStackItem(this.GameDB);
        this.DataWeapon=new DataWeapon(this.GameDB);
        this.DataRole=new DataRole(this.GameDB);
        this.DataCurrency=new DataCurrency(this.GameDB);
    }


    //基础资源数据接口
    addGold(GoldNum:number){
        console.log("DataBaseService:金币增加接口被调用");
        this.DataCurrency.addGold(GoldNum);
    }
    addFood(FoodNum:number){
        this.DataCurrency.addFood(FoodNum);
    }
    getGold(){
        const Gold=this.DataCurrency.getGold();
        return Gold;
    }
    getFood(){
        const Food=this.DataCurrency.getFood();
        return Food;
    }

    //人物数据接口
    getRole(RoleID:string){
        return this.DataRole.getRole(RoleID);
    }
    getAllRole(){
        return this.DataRole.getAllRole();
    }
    setRole(Role:RoleRow){
        this.DataRole.setRole(Role);
    }

    //武器数据接口
    getWeapon(WeaponID:string){
        return this.DataWeapon.getWeapon(WeaponID);
    }
    getAllWeapon(){
        return this.DataWeapon.getAllWeapon();
    }
    setWeapon(Weapon:WeaponRow){
        this.DataWeapon.saveWeapon(Weapon);
    }

    //栈式物品数据接口
    addStackItem(StackItemID:string,Count:number){
        this.DataStackItem.add(StackItemID,Count);
    }
    reduceStackItem(StackItemID:string,count:number){
        this.DataStackItem.reduce(StackItemID,count);
    }

    getStackItem(StackItemID:string){
        return this.DataStackItem.getOne(StackItemID);
    }
    getAllStackItem(){
        return this.DataStackItem.getAll();
    }
    // setStackItem(StackItem:StackItemRow){
    //     this.DataStackItem.set(StackItem.id,StackItem.count);
    // }

    //战斗阵容数据接口
    getFormation(){
        return this.DataFormation.getFormation();
    }

    setFormation(Formation:[]){
        this.DataFormation.setFormation(Formation);
    }
}