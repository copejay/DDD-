

export class CollisionDispatcher{

    static FightApp;

    static onHit(self,other){
        CollisionDispatcher.FightApp.onHit(self,other);
    }

}