type Props = {
    name:string;
    description:string;
}


export const Alert = (props: Props) => {
    return(
        <>
            <div className="flex flex-row bg-white mx-6 mt-3 h-16 rounded-xl">
                <p>{props.name}</p>
                <p className="ml-12">{props.description}</p>
            </div>
        </>
    );
}