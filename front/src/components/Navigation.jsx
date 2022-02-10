import { Link } from 'react-router-dom';
import useAuth from './useAuth';
import Button from './Button';
import { useState } from 'react';
import '../scss/component/nav.scss';


function Navigation(){
    const Auth = useAuth();
    const auth = Auth.auth;
    const [isOpen, setIsOpen] = useState(false);
    function signout(){
        Auth.onSignOut()
    }
    function toggleDropdown(){
        setIsOpen(!isOpen)
    }
    return(
        <nav className='nav'>
            {
                Auth.auth.id !== '' ?
            <div>
                <Link to="/">🏠</Link>  {"   "}
                <Link to="/new"> ➕ </Link>  {"   "}
                <Button type="button" classStyle="none" onclick={toggleDropdown}>menu</Button>
                {isOpen && <div className='nav__dropdown'>
                    <Link to={`/user/${auth.id}`}>{auth.firstName}</Link>
                    <Button type="button" onclick={signout}>Sign Out</Button>
                    </div>}
                
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