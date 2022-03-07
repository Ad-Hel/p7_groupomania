import './button.scss';

function Button(props){
    const handle = props.onclick;
    const type = props.type;
    return (
        <button className={`button button--${props.type} button--${props.classStyle}`} type={type} onClick={handle}>{props.children}</button>
    )
}

export default Button