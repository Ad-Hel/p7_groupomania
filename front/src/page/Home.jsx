import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import AllPictures from "../components/AllPictures";
import isAuth from '../js/isAuth';

function Home() {
  if (!isAuth()){
    window.location.replace('http://localhost:3001/signin')
  }
  return (
    <div>
      <Header/>
        <Container>
          <AllPictures/>
        </Container>
      <Footer/>
    </div>
  );
}

export default Home;
