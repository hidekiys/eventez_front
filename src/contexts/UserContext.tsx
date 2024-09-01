import { TypeUser } from "@/types/TypeUser";
import { api } from "@/utils/api";
import { parseCookies } from "nookies";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type UserCtxType = {
    user: TypeUser,
    setUser: Dispatch<SetStateAction<TypeUser>>
}

const defaultState = {
    user:{
        name: {
            firstName: '',
            lastName:'',
        },
        id: '',
        email: '',
        events: [''],
        url_avatar:''
    },
    setUser: (user:TypeUser) => {}
} as UserCtxType


export const UserContext = createContext(defaultState);


type UserProviderProps = {
    children: ReactNode
}

export default function UserProvider({children} : UserProviderProps){
    const [user, setUser] = useState<TypeUser>({
        name: {
            firstName: '',
            lastName:'',
        },
        id: '',
        email: '',
        events:[''],
        url_avatar:''
    });


    useEffect(() => {
        const { 'eventez.token': token } = parseCookies()
        
        if(token) {
            api.get('/getUser').then(response => { setUser({
                name: {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                },
                id: response.data.id,
                email: response.data.email,
                events: response.data.events,
                url_avatar: response.data.url_avatar
            
            })
            console.log(response.data)
        })
        }
    }, [api])

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>

    )
}