

// export class HitEffectSyncer{


//     private BoardNode;

//     private HitEffectFactory;

//     private HitEffectList=[];
//     private HitEffectViewList=[];

//     // private RoleAt;

//     constructor(BoardNode,HitEffectFactory,RoleAt){
//         this.BoardNode=BoardNode;
//         this.HitEffectFactory=HitEffectFactory;
//         // this.RoleAt=RoleAt;
//     }


//     Sync(HitEffectList){
//         this.SyncHitEffect(HitEffectList);
//     }

//     //对齐受击特效
//     checkHitEffectViewNum(){
//         let TotalLength=this.HitEffectList.length;
//         let ViewLength=this.HitEffectViewList.length;
//         let Num=TotalLength-ViewLength;
//         if(Num==0){
//             return
//         }else if(Num<0){
//             this.deleteHitEffectView(-Num);
//         }else if(Num>0){
//             this.addHitEffectView(Num);
//         }
//     }

//     addHitEffectView(Num){
//         for(let i=0;i<Num;i++){
//             let hitEffectView=this.HitEffectFactory.get(this.BoardNode);
//             this.HitEffectViewList.push(hitEffectView);
//         } 
//     }
//     deleteHitEffectView(Num){
//         for(let i=0;i<Num;i++){
//             let view=this.HitEffectViewList.pop();
//             this.HitEffectFactory.recycle(view);
//         }  
//     }




//     //同步受击特效
//     SyncHitEffect(newHitEffectList){
//         // let newHitEffectList=[];
//         // this.FightRoleList.forEach((role)=>{

//         // this.RoleAt.RoleList.forEach((role)=>{
//         //     if(role.HitEffectList.length!=0){
//         //         newHitEffectList=newHitEffectList.concat(role.HitEffectList);
//         //     }
//         // })
//         this.HitEffectList=newHitEffectList;
       
//         this.checkHitEffectViewNum();

//         for(let i=0;i<this.HitEffectList.length;i++){
//             console.log(`FightSystem-App-ViewSyncer:受击特效开始同步,特效列表长度${this.HitEffectViewList.length}`);
//             let HitEffectView=this.HitEffectViewList[i];
//             let HitEffect=this.HitEffectList[i];
//             HitEffectView.setPosition(HitEffect.x,HitEffect.y);
//             HitEffectView.setEffect(HitEffect.EffectName,HitEffect.EffectType);
//             // HitEffectView.setText(HitEffect.text);
//         }
//     }

// }
