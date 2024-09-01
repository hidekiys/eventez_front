export type EventsType = {
    name: string,
    types: string[],
    publicOfEvent: string[],
    place: {
        placeName: string,
        cep: string,
        street: string,
        neighborhood: string,
        state: string,
        city: string,
        number: string,
        complement:string
    },
    date?: string,
    hour: string,
    endTime: string,
    numberOfGuests: number,
    parcialValue: number,
    services: [string],
    description:string

}