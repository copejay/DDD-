
// export type RoleType={
//     id: string;      // 主键
//     name: string;
//     templateID:string;
//     level: number;
//     exp: number;
// }
import type { RoleRow } from "../..";


export class SaveRole{

    private GameDB;

    constructor(GameDB){
        this.GameDB=GameDB;
    }

    checkExist(RoleID:string){
        this.GameDB.roles.exists(RoleID);
    }

    getRole(RoleID:string){
        let Role:{
            id: "",
            name: "",
            templateID: "",
            level: 0,
            exp:0,
        }=this.GameDB.roles.get(RoleID);
        return Role;
    }

    getAllRole(){
        let AllRole=this.GameDB.roles.getAll();
        return AllRole;
    }

    setRole(Role:RoleRow){
        this.GameDB.roles.set(Role.id,Role);
    }

}