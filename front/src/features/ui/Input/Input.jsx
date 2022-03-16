import './input.scss';

function Input(props){
    return(
        <div className='input__group'>
            {props.label !== 'none' && <label htmlFor={props.name}>{props.label ? props.label : props.name}</label>}
            <input 
                className={`input input--${props.type}`} 
                type={props.type} 
                id={props.name} 
                name={props.name} 
                {... (!(props.value === 'none') && {value: props.value}) } 
                {... (props.autocomplete && {autoComplete: "new-password"}) }
                onChange={props.onchange} 
                accept={props.accept}
                max={props.max} 
            />
            <p className='input__error'>{props.error && props.error}</p>
        </div>
    )
}

export default Input