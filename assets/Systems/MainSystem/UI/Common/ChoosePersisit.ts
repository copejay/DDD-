import { _decorator, Component, Node,director, Director,find} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChoosePersist')
export class ChoosePersist extends Component {
    onLoad(){
        // director.addPersistRootNode(this.node);//经过实验，这里加不加载无所谓
    }

    start() {
        // console.log(`choosePersist:切换后的父节点${this.node.parent.name}`);
        // console.log("切换父节点之后进行常驻节点的设置");
        console.log("choosePersist: start函数启动");
        // director.addPersistRootNode(this.node);//经过实验，这里不加载也没关系
        director.on(Director.EVENT_BEFORE_SCENE_LOADING, this.onBeforeSceneLoading, this);
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.onAfterSceneLoad, this);
        // this.touchCanvas();//首次进入场景开始挂载

    }

    //一开始，就需要初始化，放到canvas下面进行渲染显示
    touchCanvas(){
        console.log("choosePersist: 搜索canvas并挂载");
        const newCanvas=find("Canvas");
        // this.node.parent=newCanvas;
        // this.node.zIndex=9999;
        if(newCanvas){
            newCanvas.insertChild(this.node,newCanvas.children.length-1);
        }
    }

    //节点流程梳理，切换之前被设置为常驻节点，进入新节点的根节点下，这时候从根节点开始创建节点流程，由于常驻节点特性，跳过了创建。等到canvas开始渲染，这时候还没挂载进去，等到canvas创建完成，即将开始渲染的时候，这个节点被插入，也不会被再次创建。
    //在场景切换之前，挂载了这个脚本的节点，都会被设置为常驻节点，不会被加载两次
    onBeforeSceneLoading(){
        console.log("choosePersist: 场景切换前,完成节点的剥离和设置常驻");
        this.node.parent=director.getScene();//经过实验，在场景切换之前，必须把它剥离出来，不然会被删除
        console.log("choosePersist: 场景切换前,完成常驻节点的设置");
        director.addPersistRootNode(this.node);//经过实验，剥离出来之后，必须重新设置为常驻，不然也会被删除，？猜测可能是设置常驻之后，才会从原父节点下被删除
    }

    //都是在场景加载完之后，等到节点都被创建完成，才加入渲染流程，这里也不会被多次创建
    onAfterSceneLoad(){//场景加载完，但还未开始渲染时
        // console.log("choosePersist: 场景切换后");
        // const sceneName=director.getScene().name;
        // if(sceneName=="Main"){
        //     console.log("choosePersist: 场景切换后,确认为主节点，挂载到canvas上");
            this.touchCanvas();//这里只需要它的常驻化功能，无需选择场景
        // }else{
        //     console.log("choosePersist: 场景切换后,确认为非主节点，不挂载到canvas上");
        // }
    }

    update(deltaTime: number) {
        
    }
}


