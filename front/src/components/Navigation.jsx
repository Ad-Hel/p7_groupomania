import { Link } from 'react-router-dom';
import useAuth from './useAuth';


function Navigation(){
    const Auth = useAuth();
    function signout(){
        Auth.onSignOut()
    }
    return(
        <nav className='header__nav'>
            {
                Auth.auth.id !== '' ?
            <div>
                <Link to="/">🏠</Link>  {"   "}
                <Link to="/new"> ➕ </Link>  {"   "}
                <button onClick={signout}>Sign Out</button>
            </div>
            :
            <div>
                <Link to="/signup">Sign Up</Link> {"   "} 
                <Link to="/signin">Sign In</Link> {"   "}
            </div>
             }          
        </nav>
    )
}

export default Navigation