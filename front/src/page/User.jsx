import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import OneUser from "../components/OneUser";


function User(){
    const id = new URLSearchParams(window.location.search).get('id');
    return(
        <div>
            <Header/>
            <Container>
                <OneUser id={id}/>
            </Container>
            <Footer/>
        </div>
    )
}

export default User