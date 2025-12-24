
// import { RoleChild } from "./RoleChild";
import { Template } from "../Domain/Template/Template";

export class TemplateService{

    private static _instance:TemplateService;

    public static get instance(){
        if(!this._instance){
            this._instance=new TemplateService();
        }
        return this._instance;
    }

    template:Template;
   
    constructor(){
        this.template=new Template();
    }

    // getAllStackItem(){

    // }

    getStackItem(id:string){
        return this.template.getTemplate(id);
    }

    checkStackItem(id:string){
        return this.template.checkOneExist(id);
    }

    checkListStackItem(idList:string[]){
        return this.template.checkListExist(idList);
    }

}