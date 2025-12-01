
import { GameDBService } from "../../Infrastructure/Storage/GameDBService";

//引入子服务
import { ResourcesService } from './service/Resources/ResourcesService';
// import { Game } from 'cc';



export class ResourceApp{
    //数据逻辑层
    // private ResourcesPool:ResourcesPool=null;

    //视图层
    // private GoldBoardView=null;
    private static _instance:ResourceApp;

    public static get instance(){
        if(!this._instance){
            this._instance=new ResourceApp();
        }
        return this._instance;
    }

    //子服务系统
    private ResourcesService=null;

    private GameDB;

    private UI;


    //构造时传入系统所需数据,组件
    private constructor(){

        GameDBService.instance.init();
        this.GameDB=GameDBService.instance.db;
        console.log("ResourceApp:1");

        // this.GoldBoardView=GoldBoardView;
        console.log("ResourceApp:2");

        this.initResourcesService();
        console.log("ResourceApp:3");
    }

    //初始化UI代表着这个视图层开始了
    //需要第一时间进行同步更新
    initUI(ui){
        this.UI=ui;
        this.UI.syncGoldUI(this.ResourcesService.getGold());
        this.UI.syncFoodUI(this.ResourcesService.getFood());
    }


    //初始化子类系统
    //组件组装好之后，传入子系统进行流程指挥
    initResourcesService(){
        this.ResourcesService=new ResourcesService(this.GameDB);
    }
    

    //接收用户输入并传入子系统
    //接收输入，利用Domain层，逻辑世界做出改变
    //读取逻辑世界，更新视图层
    //把逻辑世界的数据写入持久数据库
    click(eventName:string){
        if(eventName=="金币增加"){
            console.log("ResourcesApp:受到金币增加指令");
            this.ResourcesService.addGold(69);
            this.UI.syncGoldUI(this.ResourcesService.getGold());
        }else if(eventName=="食物增加"){
            console.log("ResourcesApp:受到食物增加指令");
            this.ResourcesService.addFood(99);
            this.UI.syncFoodUI(this.ResourcesService.getFood());
        }
    }

    //每帧调用子系统
    update(){
        this.ResourcesService.update();
    }
}