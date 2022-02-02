const { useState } = require("react");

async function sendSigninInfo(data){
    const initHead = new Headers({
        "Content-Type": "application/json"
    });
    const init = {
        method: 'POST',
        mode: 'cors',
        headers: initHead,
        body: data
    }
    try{
        const res = await fetch('http://localhost:3000/api/auth/signin', init);
        const auth = await res.json();
        /**
         * Test to store the token in a web worker
         */
        // if (!!window.SharedWorker) {
        //     const authWorker = new SharedWorker('../authWorker.js');
        //     authWorker.port.postMessage({userRole: token.userRole, userId: token.userId, token: token.token});
        // }
        const localAuth = {
            id: auth.userId,
            role: auth.userRole,
            token: auth.token
        }
        window.localStorage.setItem('user', JSON.stringify(localAuth));
    } catch(error){
        console.log(error);
    }
}

function FormSignin(){
    const [signinInfo, setSigninInfo] = useState({
        email: "email@exemple.com",
        password: "password"
    });

    function signin(form){
        form.preventDefault();
        console.log(signinInfo);
        sendSigninInfo(JSON.stringify(signinInfo));
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
        </form>
    )
}

export default FormSignin