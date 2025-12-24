

// import { SaveWeapon } from "./SaveWeapon";
import { WeaponRow } from "../../..";

export class DataWeapon{

    // private SaveWeapon:SaveWeapon;
    private GameDB;

    constructor(GameDB){
        this.GameDB=GameDB;
        // this.SaveWeapon=new SaveWeapon(GameDB);
    }
    
    //武器数据接口
    getWeapon(WeaponID:string){
        //检查是否存在
        if(!this._getWeapon(WeaponID)){
            console.log("WeaponChild:武器不存在");
            let nullWeapon:WeaponRow={
                id:'null',
                archiveTime:1024,
                name:'二向箔',
                info:'变成二维吧~',

                level:0,
            };
            return nullWeapon;
        }
        return this._getWeapon(WeaponID);
    }

    getAllWeapon(){
        let AllWeapon=this._getAllWeapon();
        if(AllWeapon.length==0){
            console.log("WeaponChild:AllWeapon is empty");
            // return [{
            //     id:'null',
            //     archiveTime:1024.2,
            //     name:'二向箔',
            //     info:'变成二维吧~',

            //     level:0,
            // }];
            return [];
        }
        return this._getAllWeapon();
    }

    setWeapon(Weapon){
        this._setWeapon(Weapon);
    }


//内部调用
    _checkExist(WeaponID:string){
        return this.GameDB.weapons.exists(WeaponID);
    }

    _getAllWeapon(){
        let AllWeapon=this.GameDB.weapons.getAll();
        return AllWeapon;
    }

    _getWeapon(WeaponID:string){
        let Weapon:WeaponRow=this.GameDB.weapons.get(WeaponID);
        return Weapon;
    }

    _setWeapon(Weapon:WeaponRow){
            this.GameDB.weapons.set(Weapon.id,Weapon);
    }



}