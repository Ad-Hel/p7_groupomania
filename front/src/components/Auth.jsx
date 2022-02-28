import { useState } from 'react';
import apiRequest from '../js/apiRequest';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function AuthProvider({children}){
    const [auth, setAuth] = useState({
        id: "",
        role: "",
        token: ""
    });
    const navigate = useNavigate();
    
    async function handleSignIn(user){
        const args = {
            head: {
                "Content-Type": "application/json"
            },
            init: {
                method: 'POST',
                body: JSON.stringify(user)
            },
            url: "user/signin"
        }
        const res = await apiRequest(args);
        if (res.status === 201){
            const data = res.data;
            const auth = {
                ...data,
                token: "Bearer "+ data.token,
                time: Date.now()
            }
            setAuth(auth);
            window.localStorage.setItem('auth', JSON.stringify(auth));
            navigate('/');
        } else if (res.status === 401){
            console.log("Auth: " + res.data)
            return res.data
        }
    }

    function handleSignOut(){
        setAuth({
            id: '',
            role: '',
            token: ''
        });
        window.localStorage.clear();
    }

    function handleLocalSignIn(localAuth){
        if ((Date.now() -  localAuth.time) > 43200000){
            window.localStorage.clear();
            navigate('/signin');
        } else {
            setAuth({...localAuth});
        }
    }

    const value={
        auth,
        onSignIn: handleSignIn,
        onSignOut: handleSignOut,
        onReload: handleLocalSignIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider