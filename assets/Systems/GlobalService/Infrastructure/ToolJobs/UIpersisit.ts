import { _decorator, Component, Node,director, Director,find, CCInteger} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIpersist')
export class UIpersist extends Component {

    @property({type:CCInteger,tooltip:"显示优先级，填1或9"})
    PersistLevel:number;

    // private PersistNum:number=1;

    onLoad(){
        // director.addPersistRootNode(this.node);//经过实验，这里加不加载无所谓
    }

    start() {
  
        console.log("choosePersist: start函数启动");
    
        director.on(Director.EVENT_BEFORE_SCENE_LOADING, this.onBeforeSceneLoading, this);
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.onAfterSceneLoad, this);
        this.touchCanvas();//首次进入场景开始挂载

    }

    //一开始，就需要初始化，放到canvas下面进行渲染显示
    touchCanvas(){
        console.log("choosePersist: 搜索canvas并挂载");
        const newCanvas=find("Canvas");
      
        if(newCanvas){
            if(this.PersistLevel===9){
                newCanvas.insertChild(this.node,newCanvas.children.length);
            }else if(this.PersistLevel===1){
                newCanvas.insertChild(this.node,2);
            }else{
            newCanvas.insertChild(this.node,2);
            }
            //newCanvas.children.length
        }
    }


    onBeforeSceneLoading(){
        console.log("choosePersist: 场景切换前,完成节点的剥离和设置常驻");
        this.node.parent=director.getScene();//经过实验，在场景切换之前，必须把它剥离出来，不然会被删除
        console.log("choosePersist: 场景切换前,完成常驻节点的设置");
        director.addPersistRootNode(this.node);
    }

    //都是在场景加载完之后，等到节点都被创建完成，才加入渲染流程，这里也不会被多次创建
    onAfterSceneLoad(){//场景加载完，但还未开始渲染时

        this.touchCanvas();//这里只需要它的常驻化功能，无需选择场景
    }

    update(deltaTime: number) {
        
    }
}


