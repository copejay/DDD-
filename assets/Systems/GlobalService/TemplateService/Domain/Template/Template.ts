

import { StackItemTemplate } from "../src/config/StackItemTemplate";


export class Template{

    private StackItemTemplate=StackItemTemplate;



    checkOneExist(id:string){
        return this.StackItemTemplate.hasOwnProperty(id);
    }

    checkListExist(idList:string[]){
        for(let id of idList){
            if(!this.checkOneExist(id)){
                return false;
            }
        }
        return true;
    }

    getTemplate(id:string){
        if(this.checkOneExist(id)){
            return this.StackItemTemplate[id];
        }
        console.error(`TemplateService-Domain-Template: ${id} not exist`);
        return null;
    }

    // getListTemplate(idList:string[]){
    //     if(this.checkListExist(idList)){
    //         let list=[];
    //         for(let id of idList){
    //             list.push(this.StackItemTemplate[id]);
    //         }
    //         return list;
    //     }
    //     console.error(`TemplateService-Domain-Template: ${idList} not All exist`);
    //     return [];
    // }
}