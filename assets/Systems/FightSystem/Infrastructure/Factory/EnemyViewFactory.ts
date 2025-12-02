

// import {Prefab,Node} from 'cc'
// import {EnemyView} from '../View/EnemyView'
// import {PoolManager} from '../PoolManager'

// export class EnemyViewFactory{

//     _bindEntity;

//     constructor(
//         private enemyPrefab:Prefab,
//         private parentNode:Node
//     ){

//     }

//     get(){
//         const node=PoolManager.instance.get(this.enemyPrefab,this.parentNode);
//         node.angle=0;
//         node.setRotationFromEuler(0,0,0);
//         const view=node.getComponent(EnemyView)
//         return view;
//     }


//     recycle(view:EnemyView){
//         PoolManager.instance.put(view.node);
//     }
// }