import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BudgetsType } from "@/types/BudgetType";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


type Props = {
    budget:BudgetsType
}


export const Budget = ({budget}:Props) => {

    const [step, setStep] = useState(0)
    const router = useRouter()
    const[qrCode, setQrCode] = useState("")
    const [text, setText] = useState("")
    const [dialogErrorText, setDialogErrorText] = useState("")
    const [dialogError, setDialogError] = useState(false)

    const [paymentMethod, setPaymentMethod] = useState<string>("")
    const [partnerName, setPartnerName] = useState<string>()
    useEffect(()=>{
        api.get('/partnerName', {headers:{partnerid:budget.users.partner}}).then((response)=>{
            setPartnerName(response.data)
        })
    }, [])

    const handleConfirmButton = () =>{
        api.put('/contractService',{
            eventId:router.query.event,
            partnerId:budget.users.partner,
            budgetId:budget._id,
            paymentMethod:paymentMethod
        }).then((response)=>{
            console.log(response.data)
            setText(response.data.qr_codes[0].text)
            setQrCode(response.data.qr_codes[0].links[0].href)
            console.log(response.data)
            setStep(2)
        }).catch((err)=>{
            console.log(err.data)
            if(err.status == 406){
                setDialogError(true)
                setDialogErrorText("insira o CPF corretamente!")
            }
        })
        
    }
    const onOptionChange = (e:any) => {
        setPaymentMethod(e.target.value)
      }

    return(
        <>
        <Dialog open={dialogError}>
            <DialogContent>
                <h1>{dialogErrorText}</h1>
                <DialogClose onClick={()=>setDialogError(false)}>
                    Ok
                </DialogClose>
            </DialogContent>
        </Dialog>
        <Dialog onOpenChange={()=>setStep(0)}>
            <DialogTrigger>
                    <div className={" pt-2 duration-300 w-full bg-white rounded-xl px-3 py-2 flex justify-between hover:bg-gray-100 hover:cursor-pointer"}>
                        <h1 className="w-[calc(21%)] overflow-hidden font-semibold">{partnerName}</h1>
                        {budget.status.user == "received" &&
                            <p className="font-bold text-green-300 text-sm">Recebido</p>
                        }
                        {budget.status.user == "requested" &&
                            <p className="font-bold text-yellow-300 text-sm">Solicitado</p>
                        }
                        {budget.status.user == "waiting" &&
                            <p className="font-bold text-gray-300 text-sm">Aguardando pagamento </p>
                        }
                    </div>
                </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {partnerName}
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                {budget.status.user == "received" && 
                step == 0 ?
                    <div className="flex flex-col gap-3">
                    <div className="flex flex-col w-full rounded-md bg-white p-2">
                        <h1 className="text-lg">Serviços solicitados</h1>
                        <p>
                            {budget.service.services.join(', ')}
                        </p>
                    </div>
                    <div>
                        <h1 className="text-lg">Descrição do serviço</h1>
                        <div className="bg-white rounded-md p-2 max-h-[50vh] overflow-auto">
                            <p>{budget.budgetDescription}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg">Total:</h1>
                        <div className="p-1 w-full ml-3 bg-white rounded-lg"><h1>R$ {budget.value}</h1></div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <DialogClose asChild>
                            <button className="px-6 py-1 rounded-lg border-gray-300 border">Cancelar</button>
                        </DialogClose>
                        <button onClick={()=>setStep(1)} className="px-6 py-1 rounded-lg bg-principal-200 text-white">Próximo</button>
                    </div>
                    
                </div> :
                step==1 &&
                <div>
                    <div className="h-[50vh] flex flex-col justify-around">
                        <div className="">
                            <label className="w-full bg-white p-2 rounded-lg flex gap-3 items-center">
                                <input type="radio" id="mastercard" name="payment-method"/>
                                <img src="/payments_icons/mastercard_icon.png" alt="" className="object-contain h-9 w-9"/>
                                <p className="text-lg">Mastercard **** 1987</p>
                            </label>
                        </div>
                        <div>
                            <label className="w-full bg-white p-2 rounded-t-lg border-b flex items-center gap-3">
                                <input type="radio" value={"boleto"} id="boleto" name="payment-method"         
                                checked={paymentMethod === "boleto"}
                                onChange={onOptionChange}/>
                                <img src="/payments_icons/boleto_icon.png" alt=""  className="object-contain h-4 w-9"/>
                                <div className="flex flex-col">
                                    <p className="text-lg">Boleto</p>
                                    <p className="text-sm text-gray-200">Aprovação em 1 a 2 dias úteis</p>
                                </div>
                            </label>
                            <label className="w-full bg-white p-2 rounded-b-lg flex gap-3">
                                <input type="radio" value={"pix"} id="pix" name="payment-method" 
                                checked={paymentMethod === "pix"}
                                onChange={onOptionChange}/>
                                <img src="/payments_icons/pix_icon.png" alt="" className="object-contain h-8 w-8"/>
                                <div className="flex flex-col">
                                    <p className="text-lg">Pix</p>
                                    <p className="text-sm text-gray-200">Aprovação Imediata</p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg">Total:</h1>
                        <div className="p-1 w-full ml-3 bg-white rounded-lg"><h1>R$ {budget.value}</h1></div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button onClick={()=>setStep(0)} className="px-6 py-1 rounded-lg border-gray-300 border">Voltar</button>
                        <Dialog>
                            <DialogTrigger className="px-6 py-1 rounded-lg bg-principal-200 text-white">
                                 Contratar
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Deseja contratar esse serviço?
                                    </DialogTitle>
                                    <DialogDescription>
                                        Ao confirmar estará aceitando os termos de contrato.
                                    </DialogDescription>
                                </DialogHeader>
                                <button className="w-full p-2 border rounded-lg">Termos de contrato</button>
                                <div className="flex gap-3 justify-end">
                                    <DialogClose asChild>
                                        <button className="px-6 py-1 rounded-lg border-gray-300 border">Cancelar</button>   
                                    </DialogClose>
                                        <button className="px-6 py-1 rounded-lg bg-principal-200 text-white"
                                        onClick={handleConfirmButton}
                                        >Confirmar</button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                    </div>
                </div>}
                {step==2 && paymentMethod == "pix" &&
                <div>
                    {text}
                    <img src={qrCode}/>
                </div>
                }
                {budget.status.user == "requested" && 
                <div>
                    <h1 className="text-lg">Serviços solicitados</h1>
                        <p>
                            {budget.service.services.join(', ')}
                        </p>


                </div>
                
                }
                

            </DialogContent>

        </Dialog>
        
        
        
        
        </>
    );
}