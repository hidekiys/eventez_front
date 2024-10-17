export type ServicePageType = {
    id:string,
    name:string,
    types:string[],
    avatar:string,
    local:{
        cep:string,
        street:string,
        neighborhood:string,
        state:string,
        city:string,
        complement:string,
        number:number
    },
    images?:string[]
}