import { Budget } from "./Budget"



type Props = {
        budgets: [{
        budgetItem: number,
        date: string,
        description: string,
        partnerId: string,
        services: [string],
        status: string,
        value: number,
    }] | undefined
}


export const Budgets = ({budgets}:Props) => {
    
    
    return(
        <>
        <div className="flex flex-col">
            <h1 className="text-2xl">Orçamentos</h1>
            <div className="flex justify-between px-3">
                <p>Nome</p><p>Status</p>
            </div>
            <div className="flex flex-col gap-1">
        {budgets &&
            budgets.map((key)=> (
                <Budget key={key.budgetItem} budget={key}/>
            ))

        }

            </div>
        </div>
        
        </>
    )
}