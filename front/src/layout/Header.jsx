import Navigation from '../components/Navigation';
import '../scss/layout/header.scss';

function Header(){
    return(
        <header className='header'>
            <img className='header__logo' src="http://localhost:3000/assets/logos/icon-left-font.png" alt=""/>
            <Navigation />
        </header>
    );
}

export default Header