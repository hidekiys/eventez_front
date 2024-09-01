import Link from "next/link";

type Props = {
    image?:string,
    name:string,
    date: string,
    id:string
}

export const EventCard = (props: Props) => {
    return(
        <>
        <Link href={`/user/eventos/${props.id}`}>
            <div className="h-56 w-44 flex rounded-2xl transition-all hover:scale-105 bg-white">
                <div className="p-3 flex flex-col h-full">
                    <div className="h-5/6 overflow-hidden rounded-lg">
                        <img className="h-auto w-auto" src={props.image ?? "/imgevent.jpg"} alt={props.name} />
                    </div>
                    <div className="flex flex-col text-center mt-1">
                        <p>{props.name}</p>
                        <p>{`${props.date.slice(8, 10)}/${props.date.slice(5,7)}/${props.date.slice(0,4)}`}</p>
                    </div>
                </div>
            </div>
        </Link>
        
        </>
    );
}