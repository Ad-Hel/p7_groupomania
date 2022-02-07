import '../scss/component/form.scss';

function Form(props){
    return(
        <form className='form' onSubmit={props.action}>
            {props.children}
        </form>
    )
}

export default Form