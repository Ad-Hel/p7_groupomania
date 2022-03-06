
import useAuth from "../components/useAuth";

import Container from "../layout/Container";
import FrontPicture from "../components/FrontPicture";
import Archive from "../components/Archive";

function Home() {
  const { auth } = useAuth();
 
  return (
    <Container>
        <h1 className="container__title">
            Bonjour {auth.firstName}.
        </h1>
        <Archive path='picture/page/'>
            <FrontPicture/>    
        </Archive>
    </Container>
);
}

export default Home;
