
import { GameDBService } from "../../Infrastructure/Storage/GameDBService";

import { ItemChild } from "./ItemChild";
import { RoleChild } from "./RoleChild";
import { WeaponChild } from "./WeaponChild";
import { StackItemChild } from "./StackItemChild";
import { FormationRoleChild } from "./FormationRoleChild";

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

    private ItemChild;
    private RoleChild;
    private WeaponChild;
    private StackItemChild;
    private FormationRoleChild;

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
        this.WeaponChild=new WeaponChild(this.GameDB);
        this.StackItemChild=new StackItemChild(this.GameDB);
        this.FormationRoleChild=new FormationRoleChild(this.GameDB);
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

    //武器数据接口
    getWeapon(WeaponID:string){
        return this.WeaponChild.getWeapon(WeaponID);
    }
    getAllWeapon(){
        return this.WeaponChild.getAllWeapon();
    }
    setWeapon(Weapon:WeaponRow){
        this.WeaponChild.saveWeapon(Weapon);
    }

    //栈式物品数据接口
    getStackItem(StackItemID:string){
        return this.StackItemChild.getOne(StackItemID);
    }
    getAllStackItem(){
        return this.StackItemChild.getAll();
    }
    setStackItem(StackItem:StackItemRow){
        this.StackItemChild.set(StackItem.id,StackItem.count);
    }

    //战斗阵容数据接口
    getFormation(){
        return this.FormationRoleChild.getFormation();
    }

    setFormation(Formation:[]){
        this.FormationRoleChild.setFormation(Formation);
    }
}