export type EventSummary = {
    numberOfGuests: number,
            publicOfEvent: [string],
            ownerId:string,
            date:string,
            types:[string],
            name:string,
            owner:string,
            initialTime:string,
            endTime:string,
            place:{
                placeName: string,
            street:string,
            neighborhood:string,
            state:string,
            city:string,
            cep:string,
            number:string,
            complement:string
    
        }
}