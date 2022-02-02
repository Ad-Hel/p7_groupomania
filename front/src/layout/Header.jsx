import { Link } from 'react-router-dom';

function Header(){
    return(
        <nav>
            <Link to="/">Home</Link> | {" "}
            <Link to="/signup">Sign Up</Link> | {" "}
            <Link to="/signin">Sign In</Link> | {" "}
            <Link to="/picture"> + </Link> | {" "}
        </nav>
    );
}

export default Header