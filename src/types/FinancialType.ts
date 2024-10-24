export type FinancialType = {
    users:{
        user:string,
        partner:string,
    },
    event:string,
    service:{
        service:string,
        description:string,
    },
    value:number,
    status:{
        user:string,
        partner:string
    },
    payment:{
        paymentMethod:string,
        charge:string,
        order:string,
    },
    created:Date

}