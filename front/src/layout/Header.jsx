import { Link } from 'react-router-dom';
import isAuth from '../js/isAuth';

function Header(){

    function signout(){
        window.localStorage.clear()
        window.location.replace('http://localhost:3001/signin')
    }

    return(
        <nav>
            <Link to="/">Home</Link> | {" "}
            { !isAuth() ?
                <span>
                    <Link to="/signup">Sign Up</Link> | 
                    <Link to="/signin">Sign In</Link> | 
                </span>
                :
                <button onClick={signout}>Sign Out</button>
            }
            <Link to="/picture"> + </Link> | {" "}
            
        </nav>
    );
}

export default Header