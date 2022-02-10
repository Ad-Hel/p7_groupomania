import '../scss/component/input.scss';
function Input(props){
    return(
        <div className='input__group'>
            <label htmlFor={props.name}>{props.label ? props.label : props.name}</label>
            <input className={`input input--${props.type}`} type={props.type} id={props.name} name={props.name} value={props.value} onChange={props.onchange}/>
        </div>
    )
}

export default Input