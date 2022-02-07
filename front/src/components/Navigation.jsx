import { Link } from 'react-router-dom';
import useAuth from './useAuth';


function Navigation(){
    const Auth = useAuth();
    function signout(){
        Auth.onSignOut()
    }
    return(
        <nav className='header__nav'>
            <Link to="/">🏠</Link>  {"   "}
            
            <Link to="/new"> ➕ </Link>  {"   "}
                <span>
                    <Link to="/signup">Sign Up</Link> | 
                    <Link to="/signin">Sign In</Link> | 
                </span>
                :
                <button onClick={signout}>Sign Out</button>
        </nav>
    )
}

export default Navigation