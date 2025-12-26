




export class DataFormation{

    GameDB;

    constructor(GameDB){
        this.GameDB=GameDB;
    }

    getFormation(){
        let newFormation=this.GameDB.formations.get("FightFormation");
        // if(newFormation==null){
        //     newFormation={id:"FightFormation",FormationRole:[{id:"0",site:{x:-2,y:2}}]};
        // }
        if(newFormation==null){
            newFormation={id:"FightFormation",FormationRole:[]};
        }
        return newFormation.FormationRole;
    }

    setFormation(Formation:[]){
        if(Formation.length>5){
            console.error(`DataBaseService-DataFormation:角色列阵最多只能有5个角色`);
            return;
        }
        this.GameDB.formations.set("FightFormation",{id:"FightFormation",FormationRole:Formation});

    }

}