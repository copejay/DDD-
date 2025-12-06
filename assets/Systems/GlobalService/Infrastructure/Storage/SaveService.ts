

import {sys} from "cc"

export class SaveService{

    static save(key:string,data:any){
        try{
            const json=JSON.stringify(data);
            sys.localStorage.setItem(key,json);
        }catch(e){
            console.error("SaveService.save error:",e);
        }
    }

    static load<T>(key:string):T | null{
        try{
            const raw=sys.localStorage.getItem(key);
            if(!raw) return null;
            return JSON.parse(raw) as T;
        }catch(e){
            console.error("SaveService.load error:",e);
            return null;
        }
    }

    static remove(key: string){
        sys.localStorage.removeItem(key);
    }

    static clearAll(){
        sys.localStorage.clear();
    }
}