import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import AllPictures from "../components/AllPictures";

function Home() {
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
