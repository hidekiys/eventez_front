export type TypeUser = {
    name: {
        firstName: string,
        lastName: string
    },
    id: string,
    email: string,
    events?:[string],
    url_avatar:string
}