export function WaitOrError({data}) {
    return(
        <>
            <span>Wait please...</span>
            { data && <p>{ data.msg }</p> }
        </>
        
    )
}
