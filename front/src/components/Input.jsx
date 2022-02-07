function Input(props){
    return(
        <input className={`input input--${props.type}`} type={props.type} name={props.name} value={props.value} onChange={props.onchange}/>
    )
}

export default Input