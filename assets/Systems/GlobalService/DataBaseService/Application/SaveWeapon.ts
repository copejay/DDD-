
import { WeaponRow } from "../..";

export class SaveWeapon{


    private GameDB;

    constructor(GameDB){
        this.GameDB=GameDB;
    }

    checkExist(WeaponID:string){
        return this.GameDB.weapons.exists(WeaponID);
    }

    getAllWeapon(){
        let AllWeapon=this.GameDB.weapons.getAll();
        return AllWeapon;
    }

    getWeapon(WeaponID:string){
        let Weapon:WeaponRow=this.GameDB.weapons.get(WeaponID);
        return Weapon;
    }

    setWeapon(Weapon:WeaponRow){
            this.GameDB.weapons.set(Weapon.id,Weapon);
    }
    
}