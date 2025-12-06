

import { RoleTemplate } from '../Domain/RoleTemplate';

export class RoleChild{


    getRoleTemplate(templateID:string){
        const roleTemplate=RoleTemplate[templateID];
        if(!roleTemplate){
            console.error(`RoleTemplate ${templateID} not found`);
            return null;
        }else{
            return roleTemplate;
        }
    }

}