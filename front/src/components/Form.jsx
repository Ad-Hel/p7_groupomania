import '../scss/component/form.scss';

function Form(props){
    return(
        <form className={`form ${props.classStyle}`} onSubmit={props.action}>
            {props.children}
        </form>
    )
}

export default Form