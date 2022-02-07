import { useState } from 'react';
import signIn from '../js/signIn';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function AuthProvider({children}){
    const [auth, setAuth] = useState({
        id: "",
        role: "",
        token: ""
    });
    // const AuthContext = createContext(null);
    const navigate = useNavigate();
    
    async function handleSignIn(user){
        const userAuth = await signIn(JSON.stringify(user));
        setAuth({...userAuth});
        window.localStorage.setItem('auth', JSON.stringify(userAuth));
        navigate('/');
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
        setAuth({...localAuth});
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