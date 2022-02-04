import signIn from "../js/signIn";

const { useState } = require("react");


function FormSignin(){
    const [signinInfo, setSigninInfo] = useState({
        email: "email@exemple.com",
        password: "password"
    });

    function signin(form){
        form.preventDefault();
        console.log(signinInfo);
        signIn(JSON.stringify(signinInfo));
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
        <form onSubmit={signin}>
            <input onChange={updateSigninInfo} type="email" name="email" className="input input--email" value={signinInfo.email} />
            <input onChange={updateSigninInfo} type="password" name="password" className="input input--password" value={signinInfo.password} />
            <button type="submit">Se connecter</button>
            <p>{signinInfo.error && signinInfo.error}</p>
        </form>
    )
}

export default FormSignin