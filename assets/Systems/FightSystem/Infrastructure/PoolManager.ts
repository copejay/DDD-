// import { _decorator, Component, Node, Vec3 ,NodePool,Prefab,instantiate} from 'cc'
// const { ccclass, property } = _decorator


// type PoolMap={[key: string]:NodePool};

// @ccclass('PoolManager')
// export class PoolManager{
// // 
//     private static _instance:PoolManager;

//     public static get instance(){
//         if(!this._instance){
//             this._instance=new PoolManager();
//         }
//         return this._instance;
//     }

//     private _poolMap:PoolMap={};

//     get(prefab:Prefab,parent?:Node):Node{
//         if(!prefab){
//             console.error("Prefab is null!");
//             return null;
//         }
//         const key=prefab.name;
//         let pool=this._poolMap[key];

//         if(!pool){
//             pool=new NodePool();
//             this._poolMap[key]=pool;
//         }

//         let node:Node=null;

//         if(pool.size()>0){
//             node=pool.get();
//         }else{
//             node=instantiate(prefab);
//         }

//         if(parent){
//             node.parent=parent;
//         }

//         node.active=true;

//         return node;

//     }


//     put(node:Node){
//         if(!node) return;

//         const key=node.name;

//         let pool=this._poolMap[key];
//         if(!pool){
//             pool=new NodePool();
//             this._poolMap[key]=pool;
//         }

//         node.removeFromParent();
//         node.active=false;

//         pool.put(node);

//     }

//     clearAll(){
//         for(let key in this._poolMap){
//             this._poolMap[key].clear();
//         }
//         this._poolMap={};
//     }

// }