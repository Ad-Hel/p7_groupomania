import Button from "./Button";
import ModActions from "./ModActions";
import Reactions from "./Reactions";
import useAuth from "./useAuth";

function Text(props){
    const text = props.text;
    const { auth } = useAuth();

    return(
        <section className="text">
            <header className="text__header">
                <h2 className="text__author">
                    {text.User.firstName} {text.User.lastName}
                </h2>
            </header>
            <p className="text__content">
                {text.content}
            </p>
            <footer className="text__footer">   
                {props.handle && <Button type='button' onclick={props.handle} classStyle="show-responses"> {!props.show ? <>show</> : <>hide</> }</Button>}
                {auth.role > text.User.role && <ModActions list={props.list} setList={props.setList} id={text.id} path='text'/>}
                <Reactions auth={auth} target={text} path='text'/>
            </footer>
        </section>
    )
}

export default Text;