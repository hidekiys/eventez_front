import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";


const Welcome = () => {
    const { user } = useContext(UserContext);
    const [ name, setName ] = useState({name:'', lastName:''})
    useEffect(() => {
        if (user.name.lastName) {setName({name: user?.name.firstName, lastName:user?.name.lastName})} else { setName({...name, name:user?.name.firstName})}
    }, [user])

    return(
        <div className="text-2xl flex flex-row font-normal max-w52 mt-3">
            <h1 className="text-gray-500 pr-2 ml-10">Olá,</h1>
            <h1 className="text-principal-300 max-w-96">{name.name+' '+name.lastName}</h1>
        </div>
    );


}
export default Welcome;