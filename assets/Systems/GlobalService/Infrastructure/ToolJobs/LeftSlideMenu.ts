import { _decorator, Component, Node, Button, Label, Vec3, tween, EventMouse ,UITransform} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LeftSlideMenu')
export class LeftSlideMenu extends Component {

  @property({ type: Button, tooltip: "触发按钮" })
  triggerBtn: Button = null;

  @property({ type: Node, tooltip: "左侧滑出面板根节点" })
  panelRoot: Node = null;

  @property({ type: Node, tooltip: "遮罩节点" })
  mask: Node = null;

//   @property({ type: Label, tooltip: "按钮显示文本" })
//   triggerLabel: Label = null;

  // @property({ type: [Button], tooltip: "选项按钮" })
  // optionBtns: Button[] = [];

  /** 面板是否展开 */
  private isOpen = true;

  /** 面板隐藏位置（左侧屏幕外） */
  private hidePos: Vec3 = null;

  /** 面板显示位置 */
  private showPos: Vec3 = null;

  onLoad() {
    // 记录初始位置
    this.showPos = this.panelRoot.position.clone();
    this.hidePos = new Vec3(
      this.showPos.x + this.panelRoot.getComponent(UITransform).width,
      this.showPos.y,
      this.showPos.z
    );

    // 初始隐藏
    //初始不隐藏
    this.panelRoot.setPosition(this.showPos);
    this.mask.active = false;

    // 触发按钮
    this.triggerBtn.node.on(Button.EventType.CLICK, this.togglePanel, this);

    // 遮罩点击关闭
    // this.mask.on(Node.EventType.MOUSE_DOWN, this.hidePanel, this);

    // 选项点击
    // this.optionBtns.forEach((btn, index) => {
    //   btn.node.on(Button.EventType.CLICK, () => {
    //     const text = btn.node.getComponentInChildren(Label).string;
    //     this.selectOption(index, text);
    //   });
    // });
  }

  /** 展开 / 收起 */
  togglePanel() {
    this.isOpen ? this.hidePanel() : this.showPanel();
  }

  /** 显示面板 */
  showPanel() {
    this.isOpen = true;
    this.mask.active = true;

    tween(this.panelRoot)
      .to(0.25, { position: this.showPos }, { easing: 'quadOut' })
      .start();
  }

  /** 隐藏面板 */
  hidePanel() {
    this.isOpen = false;

    tween(this.panelRoot)
      .to(0.25, { position: this.hidePos }, { easing: 'quadIn' })
      .call(() => {
        this.mask.active = false;
      })
      .start();
  }

  /** 选中选项 */
  // selectOption(index: number, text: string) {
  //   // this.triggerLabel.string = text;
  //   this.hidePanel();

  //   console.log(`LeftSlideMenu: 选中 ${index} - ${text}`);

  //   // 可选：抛出事件
  //   // this.node.emit('slide-select', index, text);
  // }
}
