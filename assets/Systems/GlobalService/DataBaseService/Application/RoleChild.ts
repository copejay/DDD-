

import { SaveRole } from "./SaveRole";

import type { RoleRow } from "../..";

export class RoleChild{

    private SaveRole;
    private GameDB;

    constructor(GameDB){
        this.GameDB=GameDB;
        this.SaveRole=new SaveRole(this.GameDB);
    }

    getRole(RoleID:string){
        if(!this.SaveRole.checkExist(RoleID)){
            console.log("RoleChild:RoleID not exist");
            return {
                id: "null",
                name: "null",
                templateID: "null",
                level: 0,
                exp:0,
            };
        }else{
            let Role=this.SaveRole.getRole(RoleID);
            return Role;
        }
    }

    getAllRole(){
        let AllRole=this.SaveRole.getAllRole();
        if(AllRole.length==0){
            console.log("RoleChild:AllRole is empty");
            return [{
                id: "null",
                name: "null",
                templateID: "null",
                level: 0,
                exp:0,
            }];
        }
        return AllRole;
    }

    saveRole(Role:RoleRow){
        this.SaveRole.setRole(Role);
    }

}