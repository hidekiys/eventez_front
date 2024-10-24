



export const Associate = () =>{



    return (
        <>
            <div className="w-full h-[calc(100vh-2.5rem)] bg-orange-50 flex justify-center">
                <form className="h-fit w-[30%] bg-white rounded-xl shadow-lg mt-16
                flex flex-col items-center p-5 gap-3
                ">
                    <h1 className="font-light text-xl">Contato para associação</h1>
                    <label className="w-[80%] font-light">
                        Nome
                        <input type="text" 
                        className="w-full border py-1 px-2 rounded-lg outline-principal-300"
                        />
                    </label>
                    <label className="w-[80%] font-light">
                        Nome da empresa
                        <input type="text" 
                        className="w-full border py-1 px-2 rounded-lg outline-principal-300"
                        />
                    </label>
                    <label className="w-[80%] font-light">
                        Tipo da empresa
                        <input type="text" 
                        className="w-full border py-1 px-2 rounded-lg outline-principal-300"
                        />
                    </label>
                    <label className="w-[80%] font-light">
                        Telefone
                        <input type="text" 
                        className="w-full border py-1 px-2 rounded-lg outline-principal-300"
                        />
                    </label>
                    <label className="w-[80%] font-light">
                        E-mail
                        <input type="text" 
                        className="w-full border py-1 px-2 rounded-lg outline-principal-300"
                        />
                    </label>
                    <label className="w-[80%] font-light">
                        CNPJ
                        <input type="text" 
                        className="w-full border py-1 px-2 rounded-lg outline-principal-300"
                        />
                    </label>
                    <input type="submit" value='Enviar'
                        className="border py-1 px-2 rounded-lg outline-principal-300 bg-principal-300
                        text-white w-[80%] hover:bg-principal-400 hover:cursor-pointer transition-all
                        mt-3
                        "
                        />
                    
                </form>
            </div>
        </>
    )
}