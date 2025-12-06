
import { GameDBService } from "../../Infrastructure/Storage/GameDBService";

import { ItemChild } from "./ItemChild";
import { RoleChild } from "./RoleChild";

import { RoleRow } from "../..";

export class DataBaseService{

    private static _instance:DataBaseService;

    public static get instance(){
        if(!this._instance){
            this._instance=new DataBaseService();
        }
        return this._instance;
    }

    private GameDB;

    private ItemChild;
    private RoleChild;

    //初始化传入数据库引用
    constructor(){
        console.log("DataBaseService:初始化调用");
        GameDBService.instance.init();
        this.GameDB=GameDBService.instance.db;

        this.initChild();
    }

    //初始化数据服务的子类
    initChild(){
        this.ItemChild=new ItemChild(this.GameDB);
        this.RoleChild=new RoleChild(this.GameDB);
    }


    //基础资源数据接口
    addGold(GoldNum:number){
        console.log("DataBaseService:金币增加接口被调用");
        this.ItemChild.addGold(GoldNum);
    }
    addFood(FoodNum:number){
        this.ItemChild.addFood(FoodNum);
    }
    getGold(){
        const Gold=this.ItemChild.getGold();
        return Gold;
    }
    getFood(){
        const Food=this.ItemChild.getFood();
        return Food;
    }

    //人物数据接口
    getRole(RoleID:string){
        return this.RoleChild.getRole(RoleID);
    }
    getAllRole(){
        return this.RoleChild.getAllRole();
    }
    setRole(Role:RoleRow){
        this.RoleChild.saveRole(Role);
    }
}