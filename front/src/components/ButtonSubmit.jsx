import '../scss/component/button-submit.scss'
function ButtonSubmit(props){
    return(
        <button className="button-submit" type="submit">{props.label}</button>
    )
}

export default ButtonSubmit