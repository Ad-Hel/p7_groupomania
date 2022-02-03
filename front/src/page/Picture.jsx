import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import OnePicture from "../components/OnePicture";


function Picture(){
    const id = new URLSearchParams(window.location.search).get('id');
    return(
        <div>
            <Header/>
            <Container>
                <OnePicture id={id}/>
            </Container>
            <Footer/>
        </div>

    )
}

export default Picture