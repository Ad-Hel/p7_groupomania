import { Navigate } from 'react-router-dom'
import useAuth from './useAuth';

function RoleProtectedRoute({ children }){
    const { auth } = useAuth();

    if ( auth.role < 2 ){
        return <Navigate to="/" replace />;
    } 
    
    return children;
}

export default RoleProtectedRoute