export function WaitOrError({data}) {
    // console.log(data);
    return(
        <>
            <span>Wait please...</span>
            {data && <p>{data.msg}</p>}
        </>
        
    )
}
// export default WaitOrError