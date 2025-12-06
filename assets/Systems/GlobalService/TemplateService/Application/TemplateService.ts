
import { RoleChild } from "./RoleChild";


export class TemplateService{


    private RoleChild;

    constructor(){
        this.RoleChild=new RoleChild();
    }

    getRoleTemplate(templateID:string){

        const roleTemplate=this.RoleChild.getRoleTemplate(templateID);
        return roleTemplate;
    }

}