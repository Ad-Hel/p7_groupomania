import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'features/users';
import { Button } from 'features/ui';

import './nav.scss';

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
                <Link to="/" title="Accueil"><span className="visually-hidden">Accueil</span><svg aria-hidden="true" height="20" className="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"/></svg></Link>
                <Link to="/text" title="Messages"><span className="visually-hidden">Messages</span><svg aria-hidden="true" height="20" className="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M416 176C416 78.8 322.9 0 208 0S0 78.8 0 176c0 39.57 15.62 75.96 41.67 105.4c-16.39 32.76-39.23 57.32-39.59 57.68c-2.1 2.205-2.67 5.475-1.441 8.354C1.9 350.3 4.602 352 7.66 352c38.35 0 70.76-11.12 95.74-24.04C134.2 343.1 169.8 352 208 352C322.9 352 416 273.2 416 176zM599.6 443.7C624.8 413.9 640 376.6 640 336C640 238.8 554 160 448 160c-.3145 0-.6191 .041-.9336 .043C447.5 165.3 448 170.6 448 176c0 98.62-79.68 181.2-186.1 202.5C282.7 455.1 357.1 512 448 512c33.69 0 65.32-8.008 92.85-21.98C565.2 502 596.1 512 632.3 512c3.059 0 5.76-1.725 7.02-4.605c1.229-2.879 .6582-6.148-1.441-8.354C637.6 498.7 615.9 475.3 599.6 443.7z"/></svg></Link>
                <Link to="/new" title="Créer une image"><span className="visually-hidden">Créer une image</span><svg aria-hidden="true" className="nav__icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/></svg></Link>
                <div>
                <Button type="button" classStyle="none" onclick={toggleDropdown} title="Menu déroulant"><span className="visually-hidden">Menu déroulant</span><svg aria-hidden="true" className="nav__icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 112c-48.6 0-88 39.4-88 88C168 248.6 207.4 288 256 288s88-39.4 88-88C344 151.4 304.6 112 256 112zM256 240c-22.06 0-40-17.95-40-40C216 177.9 233.9 160 256 160s40 17.94 40 40C296 222.1 278.1 240 256 240zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-46.73 0-89.76-15.68-124.5-41.79C148.8 389 182.4 368 220.2 368h71.69c37.75 0 71.31 21.01 88.68 54.21C345.8 448.3 302.7 464 256 464zM416.2 388.5C389.2 346.3 343.2 320 291.8 320H220.2c-51.36 0-97.35 26.25-124.4 68.48C65.96 352.5 48 306.3 48 256c0-114.7 93.31-208 208-208s208 93.31 208 208C464 306.3 446 352.5 416.2 388.5z"/></svg></Button>
                {isOpen && 
                    <div className='nav__dropdown'>
                        <div className='nav__dropdown__content'>
                            <Link to={`/user/${auth.id}`}>Profil</Link>
                            {auth.role > 1 && 
                            <>
                                <Link to='/users'>Tous les utilisateurs</Link>
                                <Link to='/deleted-pictures'>Images supprimées</Link>
                                <Link to='/deleted-texts'>Messages supprimés</Link>
                            </>
                            }
                            <Button type="button" classStyle='none' onclick={signout}>Déconnexion</Button>
                        </div>
                        <div className='nav__dropdown__background' onClick={toggleDropdown}></div>
                    </div>
                }        
                </div>
        </nav>
    )
}

export default Navigation