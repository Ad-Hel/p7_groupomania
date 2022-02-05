import '../scss/layout/footer.scss'
function Footer(){
    return(
        <footer className='footer'>
            <div className="footer__content">
            <p className="footer__text">
                <a className="footer__text footer__text--link" href="/" title="">Mentions légales</a>
            </p>
            <p className="footer__text">
                Groupomania - 2022
            </p>
            </div>
        </footer>
    )
}

export default Footer