




export class GlobalApp{

    public static _instance:GlobalApp=null;

    public static get instance(){
        if(!this._instance){
            this._instance=new GlobalApp();
            return this._instance;
        }else{
            return this._instance;
        }
    }

    constructor(){

    }

    private UI=null;

    initChangeSceneUI(UI){
        this.UI=UI;
    }


    checkOutLoadOver(){
        if(this.UI==null){
            return false;
        }else{
            return true;
        }
    }

    changeScene(sceneName:string){
        if(this.checkOutLoadOver()){
            this.UI.changeScene(sceneName);
        }else{
            console.log("GlobalApp:changeScene:UI未初始化");
        }
    }


}