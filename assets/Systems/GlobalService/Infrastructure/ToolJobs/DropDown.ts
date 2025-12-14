import { _decorator, Component, Node, Button, Label, EventMouse,AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Dropdown')
export class Dropdown extends Component {
  // 绑定触发按钮（在编辑器拖拽赋值）
  @property({type:Button,tooltip:"触发按钮"})
  triggerBtn: Button = null;

  // 绑定选项面板（在编辑器拖拽赋值）
  @property({type:Node,tooltip:"选项面板"})
  optionsPanel: Node = null;

  // 绑定触发按钮的文本标签（显示选中值）
  @property({type:Label,tooltip:"触发按钮的文本标签"})
  triggerLabel: Label = null;

  // 所有选项按钮（在编辑器拖拽赋值，或通过代码查找）
  @property({type:[Button],tooltip:"所有选项按钮"})
  optionBtns: Button[] = [];

  private AudioPlayer:AudioSource=null;//音频播放器

  private AudioClips=null;//存储多个音频的脚本

  onLoad() {
    this.AudioPlayer=this.node.getComponent(AudioSource);
    this.AudioClips=this.node.getComponent('musicClips');


    // 1. 给触发按钮绑定点击事件（显示/隐藏面板）
    this.triggerBtn.node.on(Button.EventType.CLICK, this.togglePanel, this);

    // 2. 给每个选项绑定点击事件（选中选项）
    this.optionBtns.forEach((btn, index) => {
      btn.node.on(Button.EventType.CLICK, () => {
        this.selectOption(index, btn.node.getComponentInChildren(Label).string);
        this.buttonClick(index);
      }, this);
    });

    // 3. 可选：点击面板外关闭（需要 Mask 组件）
    const mask = this.optionsPanel.getComponentInChildren('Mask');
    if (mask) {
      mask.node.on(Button.EventType.CLICK, (event: EventMouse) => {
        // 判断点击的是遮罩本身（不是选项）
        if (event.target === mask.node) {
          this.hidePanel();
        }
      }, this);
    }
  }

  // 切换面板显示/隐藏
  togglePanel() {
    console.log('Dropdown: 切换面板准备展开/收起！')
    this.optionsPanel.active = !this.optionsPanel.active;
    console.log(`Dropdown: 切换面板完成，当前状态：${this.optionsPanel.active}`)
  }

  // 隐藏面板
  hidePanel() {
    this.optionsPanel.active = false;
  }

  // 选中选项（index：选项索引，text：选项文本）
  selectOption(index: number, text: string) {
    // 更新触发按钮的显示文本
    this.triggerLabel.string = text;
    // 隐藏面板
    this.hidePanel();
    // 可选：抛出选中事件（供其他脚本监听）
    console.log('选中选项：', index, text);
    // this.node.emit('dropdown-select', index, text);
  }

  buttonClick(index:number){
    if(index==0){
        this.AudioPlayer.stop();
        console.log(`Dropdown: 停止播放音乐`)
    }else{
        this.AudioPlayer.stop();
        this.AudioPlayer.clip=this.AudioClips.getMusicClip(index-1);
        this.AudioPlayer.play();
        console.log(`Dropdown: 播放音乐${index-1}`)
    }
  }
}