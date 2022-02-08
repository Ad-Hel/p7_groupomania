// import signIn from "../js/signIn";
import ButtonSubmit from "./ButtonSubmit";
import Form from "./Form";
import Input from "./Input";
import useAuth from "./useAuth";

const { useState } = require("react");


function FormSignin(){
    const [signinInfo, setSigninInfo] = useState({
        email: "email@exemple.com",
        password: "password"
    });
    const [error, setError] = useState('')
    const Auth = useAuth();

    async function signin(form){
        form.preventDefault();
        const res = await Auth.onSignIn(signinInfo);
        if (res){
            setError(res);
        } 
    }

    function updateSigninInfo(event){
        const name = event.target.name;
        const value = event.target.value;
        setSigninInfo({
            ...signinInfo,
            [name]: value
        })
    }

    return(
        <Form action={signin}>
            <Input type="email" name="email" value={signinInfo.email} onchange={updateSigninInfo}/>
            <Input type="password" name="password" value={signinInfo.password} onchange={updateSigninInfo}/>
            <ButtonSubmit label="Se connecter"/>
            <p>{error && error}</p>
        </Form>
    )
}

export default FormSignin