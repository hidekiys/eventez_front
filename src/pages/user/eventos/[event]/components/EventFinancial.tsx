import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"






const EventFinancial = () => {

    const router = useRouter()
    return(
        <>
            <Link href={`/user/eventos/${router.query.event}/financeiro`} className="bg-white rounded-md  transition-all
                    h-20  mt-3 max-w-full p-6 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105">
            <p className="text-gray-600 text-lg">Financeiro</p>
            <p className="text-gray-600 text-sm md">Total fechado: R$ 6.000</p>
            <p className="text-gray-600 text-sm md">Gastos estimados: R$ 5.000</p>


        </Link>
        </>
    )
}

export default EventFinancial;