import { _decorator, Component, Node,director, Director,find} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChoosePersist')
export class ChoosePersist extends Component {
    onLoad(){
        
    }

    start() {
        director.on(Director.EVENT_BEFORE_SCENE_LOADING, this.onBeforeSceneLoading, this);
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.onAfterSceneLoad, this);
        // this.touchCanvas();//首次进入场景开始挂载

    }

    //一开始，就需要初始化，放到canvas下面进行渲染显示
    touchCanvas(){
        // console.log("choosePersist: 搜索canvas并挂载");
        const newCanvas=find("Canvas");
        if(newCanvas){
            newCanvas.insertChild(this.node,newCanvas.children.length-1);
        }
    }

    onBeforeSceneLoading(){
        // console.log("choosePersist: 场景切换前,完成节点的剥离和设置常驻");
        this.node.parent=director.getScene();
        director.addPersistRootNode(this.node);
    }

    //都是在场景加载完之后，等到节点都被创建完成，才加入渲染流程，这里也不会被多次创建
    onAfterSceneLoad(){//场景加载完，但还未开始渲染时
      
            this.touchCanvas();//这里只需要它的常驻化功能，无需选择场景
    }

    update(deltaTime: number) {
        
    }
}


