type Props = {
    url: string;
    name: string;
}

export const ProfilePhoto  = (props: Props) => {
    let url:string =  '';
    if (props.url && props.url != ''){url = props.url}
    else {url = "/perfilEz.png"}
        
    return(
        <>
            <img src={url} alt={props.name} className="w-24 h-24 overflow-hidden rounded-md"/>
        </>
    );
}