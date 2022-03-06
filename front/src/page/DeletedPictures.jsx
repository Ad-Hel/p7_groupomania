import { useEffect, useState } from "react";


import Container from "../layout/Container";
import FrontPicture from "../components/FrontPicture";
import Archive from "../components/Archive";

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
