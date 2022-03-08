import { Link } from 'react-router-dom';
import { Navigation } from 'features/ui';

import './header.scss';

function Header(){
    return(
        <header className='header'>
            <Link to="/" aria-label="accueil"><img className='header__logo' src="/assets/logos/icon-left-font.png" alt=""/></Link>
            <Navigation />
        </header>
    );
}

export default Header