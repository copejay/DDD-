import { _decorator, Component, Node } from 'cc';
import { director,Director,CCString ,Enum} from 'cc';
const { ccclass, property } = _decorator;

enum ActiveType {
    Show,
    Hide,
}

@ccclass('ActiveControl')
export class ActiveControl extends Component {

    @property({ type: Enum(ActiveType), tooltip: "选择 Show / Hide" })
    ActiveType: ActiveType = ActiveType.Show;

    @property({type:CCString,tooltip:"选择显示场景"})
    ActiveScene:string;

    // onLoad() {
    //     director.on(
    //         Director.EVENT_AFTER_SCENE_LAUNCH,
    //         this.onAfterSceneLoad,
    //         this
    //     );

    //     // ✅ 补首场景
    //     this.checkActive();
    // }

    start() {
        // if(this.ActiveType=="Hide"){
        //     this.node.active=false;
        // }
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.onAfterSceneLoad, this);
        this.checkActive();
    }

    onAfterSceneLoad(){
        this.checkActive();
    }

    private checkActive(){
        let current=director.getScene()?.name;
        console.log(`ActiveControl:当前场景=${current},目标=${this.ActiveScene}`);
        //这里打个补丁，处理引擎加载的首场景为空的情况
        //默认首次加载的场景叫做“Main"
        if(current==""){
            console.log("ActiveControl:首次空场景加载");
            current="Main";
        }

        if(this.ActiveType==ActiveType.Show){
            this.node.active=(current===this.ActiveScene);
        }else if(this.ActiveType==ActiveType.Hide){
            this.node.active=(current!==this.ActiveScene);
        }
    }



    update(deltaTime: number) {
        
    }
}


