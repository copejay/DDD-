

import { SaveWeapon } from "./SaveWeapon";
import { WeaponRow } from "../..";

export class WeaponChild{

    private SaveWeapon:SaveWeapon;
    private GameDb;

    constructor(GameDB){
        this.GameDb=GameDB;
        this.SaveWeapon=new SaveWeapon(GameDB);
    }
    
    //武器数据接口
    getWeapon(WeaponID:string){
        //检查是否存在
        if(!this.SaveWeapon.getWeapon(WeaponID)){
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
        return this.SaveWeapon.getWeapon(WeaponID);
    }

    getAllWeapon(){
        let AllWeapon=this.SaveWeapon.getAllWeapon();
        if(AllWeapon.length==0){
            console.log("WeaponChild:AllWeapon is empty");
            return [{
                id:'null',
                archiveTime:1024.2,
                name:'二向箔',
                info:'变成二维吧~',

                level:0,
            }];
        }
        return this.SaveWeapon.getAllWeapon();
    }

    setWeapon(Weapon){
        this.SaveWeapon.setWeapon(Weapon);
    }



}