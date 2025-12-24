

// import { SaveRole } from "./SaveRole";

import type { RoleRow } from "../../..";

export class DataRole{

    // private SaveRole;
    private GameDB;

    constructor(GameDB){
        this.GameDB=GameDB;
        // this.SaveRole=new SaveRole(this.GameDB);
    }

    getRole(RoleID:string){
        if(this._checkExist(RoleID)===false){
            console.log("RoleChild:RoleID not exist");
            return {
                id: "null",
                name: "null",
                templateID: "null",
                level: 0,
                exp:0,
            };
        }else{
            let Role=this._getRole(RoleID);
            return Role;
        }
    }

    setRole(RoleRow:RoleRow){
        this._setRole(RoleRow);
    }

    getAllRole(){
        let AllRole=this._getAllRole();
        // if(AllRole.length==0){
        //     console.log("RoleChild:AllRole is empty");
        //     return [{
        //         id: "null",
        //         name: "null",
        //         templateID: "null",
        //         level: 0,
        //         exp:0,
        //     }];
        // }
        if(AllRole.length==0){
            return [];
        }
        return AllRole;
    }

    saveRole(Role:RoleRow){
        this._setRole(Role);
    }



//内部调用
    _checkExist(RoleID:string){
        return this.GameDB.roles.exists(RoleID);
    }

    _getRole(RoleID:string){
        let Role:{
            id: "",
            name: "",
            templateID: "",
            level: 0,
            exp:0,
        }=this.GameDB.roles.get(RoleID);
        return Role;
    }

    _getAllRole(){
        let AllRole=this.GameDB.roles.getAll();
        return AllRole;
    }

    _setRole(Role:RoleRow){
        this.GameDB.roles.set(Role.id,Role);
    }

}