import { useAuth } from "features/users";

import { Archive, Container} from "features/ui";
import { FrontPicture } from "features/pictures";

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
