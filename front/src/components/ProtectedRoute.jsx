import { Navigate } from 'react-router-dom'
import useAuth from './useAuth';

function ProtectedRoute({ children }){
    const Auth = useAuth();

    if (Auth.auth.id === "" && window.localStorage.hasOwnProperty('auth') ){
        const localAuth = JSON.parse(window.localStorage.getItem('auth'));
        Auth.onReload(localAuth);
        return null
    } else if( Auth.auth.id === ""){
        return <Navigate to="/signin" replace />;
    }
        

    return children;
}

export default ProtectedRoute