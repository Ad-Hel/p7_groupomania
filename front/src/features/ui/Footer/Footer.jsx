import { useState } from 'react';

import { Button } from 'features/ui';

import './footer.scss';

function Footer(){
    const [isVisible, setIsVisible] = useState(false);

    function handleVisible(){
        setIsVisible(!isVisible);
    }

    return(
        <footer className={`footer footer--${isVisible}`}>
            <div className={`footer__content footer__content--${isVisible}`} onClick={handleVisible}>
                <p className="footer__text">
                    <a className="footer__text footer__text--link" href="/" title="">Mentions légales</a>
                </p>
                <p className="footer__text">
                    Groupomania - 2022
                </p>
            </div>
            {!isVisible ? <Button type='button' classStyle='footer-toggle ' onclick={handleVisible}>
                <span class="visually-hidden">Accéder au footer</span>
                <svg aria-hidden="true" className="nav__icon" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/>
                </svg>
            </Button>
            :
            <Button type='button' classStyle='footer-toggle ' onclick={handleVisible}>
                <span class="visually-hidden">Fermer le footer</span>
                <svg aria-hidden="true" className="nav__icon" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
            </Button>}
        </footer>
    )
}

export default Footer