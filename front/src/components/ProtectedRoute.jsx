import { Navigate, Outlet } from 'react-router-dom'
import useAuth from './useAuth';

function ProtectedRoute(props){
    const Auth = useAuth();
    const { auth } = Auth;
    const role = parseInt(props.role);

    if (auth.id === "" && window.localStorage.hasOwnProperty('auth') ){
        const localAuth = JSON.parse(window.localStorage.getItem('auth'));
        Auth.onReload(localAuth);
        return null
    } else if( auth.id === ""){
        return <Navigate to="/signin" replace />;
    };

    if (role && role > auth.role){
        return <Navigate to='/signin' replace />;
    };
        

    return <Outlet />;
}

export default ProtectedRoute