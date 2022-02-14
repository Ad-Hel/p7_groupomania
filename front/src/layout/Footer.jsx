import { useState } from 'react';
import '../scss/layout/footer.scss';
import Button from '../components/Button';
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
            <Button type='button' classStyle='footer-toggle ' onclick={handleVisible}><svg className="nav__icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">{/*<!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->*/}<path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/></svg></Button>
        </footer>
    )
}

export default Footer