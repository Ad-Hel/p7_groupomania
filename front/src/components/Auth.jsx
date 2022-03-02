import { useState } from 'react';
import apiRequest from '../js/apiRequest';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';


function AuthProvider({children}){
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();
    
    /**
     * 
     * This function use an object composed of an email and a password to make an API call. If successful, an user ressource is returned with a token to maintains the session.
     * 
     * @name handleSignIn
     * @function
     * @param {object & {email: string, password: string}} user 
     * @returns {object & {firstName: string, lastName: string, email: string, role: integer, createdAt: string, deletedAt: string, token: string}}
     */
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
            return res.data
        }
    }

    /**
     * 
     * This function delete the local storage, set the auth state to null and redirect to sign in page.
     * 
     * @name handleSignOut
     * @function
     */
    function handleSignOut(){
        setAuth(null);
        window.localStorage.clear();
        navigate('/signin');
    }

    /**
     * 
     * This function get the local storage 'auth' if it existes.
     * Then it's parsed, the timestamp is checked.
     * If not outdated the content is used to set auth state, else it redirects to sign in page.
     * 
     * @name handleLocalSignIn
     * @function
     */
    function handleLocalSignIn(){
        const localAuth = JSON.parse(window.localStorage.getItem('auth'));
        if ((Date.now() -  localAuth.time) > 43200000){
            window.localStorage.clear();
            navigate('/signin');
        } else {
            setAuth({...localAuth});
        }
    }

    /**
     * 
     * This constant groups in one object authentification data and three functions to handle sign in, sign out and local sign in.
     * It is used as context to manage the user's authentification status.
     * 
     * @name Auth.value
     * @constant
     */
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