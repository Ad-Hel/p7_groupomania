import { Navigate, Outlet } from 'react-router-dom'
import useAuth from './useAuth';

function ProtectedRoute(props){
    const Auth = useAuth();
    const { auth } = Auth;
    const role = parseInt(props.role);

    if (auth === null && window.localStorage.hasOwnProperty('auth') ){
        Auth.onReload();
        return null
    } else if( auth === null){
        return <Navigate to="/signin" replace />;
    };

    if (role && role > auth.role){
        return <Navigate to='/signin' replace />;
    };
        

    return <Outlet />;
}

export default ProtectedRoute