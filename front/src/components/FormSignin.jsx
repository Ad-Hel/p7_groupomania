const { useState } = require("react");


function FormSignin(){
    const [signinInfo, setSigninInfo] = useState({
        email: "email@exemple.com",
        password: "password"
    });

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
            if (res.status === 201){
                const localAuth = {
                    id: auth.userId,
                    role: auth.userRole,
                    token: auth.token
                }
                window.localStorage.setItem('user', JSON.stringify(localAuth));
                window.location.replace('http://localhost:3001/')
            } else if (res.status === 401) {
                setSigninInfo({
                    ...signinInfo,
                    error: auth.error
                });
            }
            
        } catch(error){
            console.log(error);
        }
    }  

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
            <p>{signinInfo.error && signinInfo.error}</p>
        </form>
    )
}

export default FormSignin