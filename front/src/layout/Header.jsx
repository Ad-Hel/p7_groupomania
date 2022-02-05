import { Link } from 'react-router-dom';
import isAuth from '../js/isAuth';
import '../scss/layout/header.scss';

function Header(){

    function signout(){
        window.localStorage.clear()
        window.location.replace('http://localhost:3001/signin')
    }

    return(
        <header className='header'>
            <img className='header__logo' src="http://localhost:3001/assets/logos/icon-left-font.png" alt=""/>
            <nav className='header__nav'>
            <Link to="/">🏠</Link>  {"   "}
            
            <Link to="/new"> ➕ </Link>  {"   "}
            { !isAuth() ?
                <span>
                    <Link to="/signup">Sign Up</Link> | 
                    <Link to="/signin">Sign In</Link> | 
                </span>
                :
                <button onClick={signout}>Sign Out</button>
            }
            </nav>
        </header>
    );
}

export default Header