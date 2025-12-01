

//每个系统内部做出了约束，系统外部也同样做出一层约束

export type ResourcesEventType={
    type:string;
    data:{
        name:string;
        count:number;
    };
}