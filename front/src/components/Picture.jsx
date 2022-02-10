import '../scss/component/picture.scss';
import LikeButton from './LikeButton';
import { Link } from 'react-router-dom';

function Picture(props){
    const picture = props.picture;
    const auth = props.auth;
    return(
        <article className="picture">
            <img className="picture__image" src={picture.imageUrl} alt="" />
            <div className="picture__content">
                <header className="picture__header">
                    <h1 className="picture__title">{picture.title}</h1>
                </header>
                <footer className="picture__footer">
                    <Link to={`/user/${picture.UserId}`} replace>{picture.User.firstName} {picture.User.lastName}</Link>
                    <LikeButton auth={auth} picture={picture}/>
                </footer>
            </div>            
        </article>
    )
}

export default Picture