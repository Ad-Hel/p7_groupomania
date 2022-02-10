import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import Button from "./Button";
import FrontPicture from "./FrontPicture";
import useAuth from "./useAuth";

function AllPictures(){
    const [pictures, setPictures] = useState([]);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false)
    const auth = useAuth().auth;
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
            }
        }
        getAllPictures(page);
        window.scrollTo(0,0);

    }, [page])

    function handlePagination(){
        setPage(page + 1);
    }

    return(
        <section>
            <h2>
                Bonjour {auth.firstName}.
            </h2>
            {pictures.map((picture)=>(
                <FrontPicture key={picture.id} picture={picture} auth={auth} />
            ))}
            {!isLastPage && <Button type="button" onclick={handlePagination}>Page suivante</Button>}
        </section>
    )
}

export default AllPictures