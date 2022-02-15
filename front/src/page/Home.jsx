import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";

import Container from "../layout/Container";
import FrontPicture from "../components/FrontPicture";
import Button from "../components/Button";

function Home() {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false)

  const auth = useAuth().auth;
  const navigate = useNavigate();

  useEffect(() => {
      async function getAllPictures(pageNumber){
          const args = {
              token: auth.token,
              url: "picture/page/" + pageNumber,
          }
          const res = await apiRequest(args);
          if (res.status === 200){
              setPictures(res.data.rows);
              if ( (page * 9 ) > res.data.count ){
                  setIsLastPage(true);
              } 
          }else {
              navigate('/signin');
            }
      }
      getAllPictures(page);
      window.scrollTo(0,0);

  }, [page])

  function handlePagination(){
      setPage(page + 1);
  }
  
  return (
    <Container>
      <section>
            <h2>
                Bonjour {auth.firstName}.
            </h2>
            {pictures.map((picture)=>(
                <FrontPicture key={picture.id} picture={picture} auth={auth} />
            ))}
      </section>
      {!isLastPage && <Button type="button" classStyle="next" onclick={handlePagination}>Page suivante</Button>}
    </Container>
);
}

export default Home;
