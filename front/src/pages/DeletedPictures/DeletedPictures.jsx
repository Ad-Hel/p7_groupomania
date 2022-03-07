import { FrontPicture } from 'features/pictures';
import { Archive, Container } from 'features/ui'

function DeletedPictures() {
  
  return (
    <Container>
      <Archive path='picture/page/'>
            <FrontPicture/>    
        </Archive>
    </Container>
);
}

export default DeletedPictures;
