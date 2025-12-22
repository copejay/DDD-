import { _decorator, Component, Node ,director} from 'cc';
const { ccclass, property } = _decorator;
import { UIOpacity } from 'cc';

import { GlobalApp } from '../Application/GlobalApp';
import { tween } from 'cc';

@ccclass('GlobalEntry')
export class GlobalEntry extends Component {


    @property(Node)
    GlobalCanvas:Node=null;

    @property(Node)
    BlackMask:Node=null;

    @property(Node)
    GlobalUI:Node=null;

    private maskOpacity: UIOpacity;

    private GlobalApp;

    fadeIn(duration = 0.3, onFinish?: Function) {
        tween(this.maskOpacity)
            .to(duration, { opacity: 255 })
            .call(() => {
                onFinish && onFinish();
            })
            .start();
    }

    fadeOut(duration = 0.3) {
        tween(this.maskOpacity)
            .to(duration, { opacity: 0 })
            .start();
    }

    changeScene(sceneName: string) {
        this.openCanvas();
        // ① 黑幕淡入
        this.fadeIn(0.15, () => {
            // ② 切场景
            director.loadScene(sceneName, () => {
                // ③ 新场景加载完 → 淡出
                this.fadeOut(0.15);
            });

        });
    }

    openCanvas(){
        console.log("GlobalEntry:打开黑幕");
        this.GlobalCanvas.active=true;
    }

    closeCanvas(){
        console.log("GlobalEntry:关闭黑幕");
        this.GlobalCanvas.active=false;
    }

    onLoad() {
        this.maskOpacity = this.BlackMask.getComponent(UIOpacity)!;
        // 初始完全透明
        this.maskOpacity.opacity = 0;
        // 确保节点启用
        this.BlackMask.active = true;
    }

    start() {
        this.GlobalApp=GlobalApp.instance;
        this.GlobalApp.initChangeSceneUI(this);
        this.closeCanvas();
    }

    update(deltaTime: number) {
        
    }
}


