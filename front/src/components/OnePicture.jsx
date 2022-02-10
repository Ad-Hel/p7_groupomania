import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import LikeButton from "./LikeButton";
import '../scss/component/picture.scss';
import Picture from "./Picture";
import useAuth from "./useAuth";

function OnePicture(props){
    const [picture, setPicture] = useState(null);
    const id = props.id;
    const auth = useAuth().auth;
    useEffect( () => {
        async function getOnePicture(id) {
            const args = {
                token: auth.token,
                url: "picture/" + id,
            }
            const res = await apiRequest(args);
            setPicture(res.data);
            props.setUserId(res.data.UserId);
        }
        getOnePicture(id)
    }, [])


    return picture ? (
        <Picture picture={picture} auth={auth}/>
    ) : ( <p>chargement...</p>)
}

export default OnePicture